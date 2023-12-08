import { EventWebhook } from '@sendgrid/eventwebhook';
import {
    MessageReply,
    MessageStatus,
    PrismaClient,
    PurchaseAudit,
    SendGridMessageType,
} from '@prisma/client';
import prisma from '~/lib/prisma';
import { JSONObject } from '~/types/main';

const eventWebhookValidator = new EventWebhook();

const runtimeConfig = useRuntimeConfig();
const publicKey = eventWebhookValidator.convertPublicKeyToECDSA(
    runtimeConfig.sendgridWebhookSigningKey
);

interface MessageStatusUpdate {
    where: {
        id: string;
    };
    data: {
        sendGridMessageStatus: MessageStatus;
    };
}

interface MessageStatusAndId {
    id: string;
    sendGridMessageStatus: MessageStatus;
}

abstract class MessageStatusTable<T extends MessageStatusAndId> {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    protected abstract getInternal(
        sendGridMessageId: string
    ): Promise<T | null>;

    protected abstract updateInternal(
        updateReqeust: MessageStatusUpdate
    ): Promise<void>;

    async get(sendGridMessageId: string): Promise<MessageStatusAndId> {
        try {
            const record = await this.getInternal(sendGridMessageId);
            if (!record) {
                console.error(
                    `Failed to find ${this.tableName} with sendGridMessageId, ${sendGridMessageId}`
                );
                throw createError({
                    statusMessage: 'Internal Server Error',
                    statusCode: 500,
                });
            }
            return {
                id: record.id,
                sendGridMessageStatus: record.sendGridMessageStatus,
            };
        } catch (e) {
            console.error(
                `Failed to find existing ${this.tableName} for messageId ${sendGridMessageId}.`,
                e
            );
            throw createError({
                statusMessage: 'Internal Server Error',
                statusCode: 500,
            });
        }
    }

    async update(updateRequest: MessageStatusUpdate): Promise<void> {
        try {
            await this.updateInternal(updateRequest);
        } catch (e) {
            console.error(
                `Failed to update ${this.tableName} message status field.`,
                e
            );
            throw e;
        }
    }
}

class MessageReplyTable extends MessageStatusTable<MessageReply> {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        super('messageReply');
        this.prismaClient = prismaClient;
    }

    protected async getInternal(
        sendGridMessageId: string
    ): Promise<MessageReply | null> {
        return await this.prismaClient.messageReply.findFirst({
            where: { sendGridMessageId },
        });
    }

    protected async updateInternal(
        updateReqeust: MessageStatusUpdate
    ): Promise<void> {
        await this.prismaClient.messageReply.update(updateReqeust);
    }
}

class PurchaseAuditTable extends MessageStatusTable<PurchaseAudit> {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        super('purchaseAudit');
        this.prismaClient = prismaClient;
    }

    protected async getInternal(
        sendGridMessageId: string
    ): Promise<PurchaseAudit | null> {
        return await this.prismaClient.purchaseAudit.findFirst({
            where: { sendGridMessageId },
        });
    }

    protected async updateInternal(
        updateReqeust: MessageStatusUpdate
    ): Promise<void> {
        await this.prismaClient.purchaseAudit.update(updateReqeust);
    }
}

class MessageStatusTableFactory {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async getTable(
        sendGridMessageId: string
    ): Promise<MessageStatusTable<MessageStatusAndId>> {
        let sendGridMessageMap;
        try {
            sendGridMessageMap =
                await this.prismaClient.sendGridMessageMap.findFirst({
                    where: { id: sendGridMessageId },
                });
        } catch (e) {
            console.error(
                `Failed to fetch mapping for sendGridMessageId, ${sendGridMessageId}`,
                e
            );
        }
        if (!sendGridMessageMap) {
            console.error(
                `No mapping found for sendGridMessageId, ${sendGridMessageId}.`
            );
            throw createError({
                status: 500,
                statusMessage: 'Internal Server Error',
            });
        }
        switch (sendGridMessageMap.type) {
            case SendGridMessageType.PURCHASE:
                return new PurchaseAuditTable(this.prismaClient);
            case SendGridMessageType.MESSAGE_REPLY:
                return new MessageReplyTable(this.prismaClient);
        }
    }
}

export default defineEventHandler(async (event): Promise<void> => {
    const webhookBody: JSONObject[] = await readBody(event);
    const signature = event.node.req.headers[
        'x-twilio-email-event-webhook-signature'
    ] as string;
    const timestamp = event.node.req.headers[
        'x-twilio-email-event-webhook-timestamp'
    ] as string;

    if (!signature) {
        console.error(
            'Signature is required in the x-twilio-email-event-webhook-signature header'
        );
        throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    } else if (!timestamp) {
        console.error(
            'Signature is required in the x-twilio-email-event-webhook-signature header'
        );
        throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    }

    const payload =
        JSON.stringify(webhookBody).split('},{').join('},\r\n{') + '\r\n';
    const validSignature = eventWebhookValidator.verifySignature(
        publicKey,
        payload,
        signature,
        timestamp
    );
    if (!validSignature) {
        console.error('Signature is not valid');
        throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
    }

    for (const webhookEvent of webhookBody) {
        await handleEvent(webhookEvent);
    }
});

const factory = new MessageStatusTableFactory(prisma);

async function handleEvent(webhookEvent: JSONObject) {
    if (typeof webhookEvent.sg_message_id !== 'string') {
        throw new Error('Webhook body sg_message_id must be of type string');
    }
    const sendGridMessageId = (webhookEvent.sg_message_id as string).split(
        '.'
    )[0];
    const newStatus = getStatusFrom(webhookEvent);
    if (!newStatus) {
        // Don't contine to process an unknown event type
        return;
    }

    const table = await factory.getTable(sendGridMessageId);
    const messageStatusAndId = await table.get(sendGridMessageId);
    const messageStatusUpdate = getUpdateData(
        messageStatusAndId.sendGridMessageStatus,
        newStatus,
        messageStatusAndId.id
    );
    if (messageStatusUpdate) {
        await table.update(messageStatusUpdate);
    } else {
        console.info(`Not updating status, for sendGridMessageId, ${sendGridMessageId}. 
                 existingStatus: ${messageStatusAndId.sendGridMessageStatus}, newStatus: ${newStatus}`);
    }
}

function getUpdateData(
    existingStatus: MessageStatus,
    newStatus: MessageStatus | undefined,
    recordId: string
): MessageStatusUpdate | undefined {
    if (
        newStatus &&
        getStatusPriority(newStatus) > getStatusPriority(existingStatus)
    ) {
        return {
            where: {
                id: recordId,
            },
            data: {
                sendGridMessageStatus: newStatus,
            },
        };
    }
    return undefined;
}

function getStatusFrom(webhookEvent: JSONObject): MessageStatus | undefined {
    switch (webhookEvent.event) {
        case 'processed':
            return MessageStatus.PROCESSED;
        case 'deferred':
            return MessageStatus.DEFERRED;
        case 'delivered':
            return MessageStatus.DELIVERED;
        case 'open':
            return MessageStatus.OPENED;
        case 'click':
            return MessageStatus.CLICKED;
        case 'bounce':
            return MessageStatus.BOUNCED;
        case 'dropped':
            return MessageStatus.DROPPED;
        default:
            console.error(
                'Event of type ' + webhookEvent.event + ' cannot be handled.'
            );
    }
}

function getStatusPriority(status: MessageStatus): number {
    switch (status) {
        case MessageStatus.PENDING:
            return 0;
        case MessageStatus.PROCESSED:
            return 1;
        case MessageStatus.DEFERRED:
            return 2;
        case MessageStatus.BOUNCED:
            return 3;
        case MessageStatus.DELIVERED:
            return 4;
        case MessageStatus.OPENED:
            return 5;
        case MessageStatus.CLICKED:
            return 6;
        default:
            throw new Error(`Unknown MessageStatus ${status}`);
    }
}
