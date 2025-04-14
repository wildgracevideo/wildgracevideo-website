import { EventWebhook } from '@sendgrid/eventwebhook';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { eq, InferSelectModel, sql } from 'drizzle-orm';
import { JSONObject } from '~~/shared/types/main';
import {
    messageReplies,
    MessageStatus,
    purchaseAudits,
    sendGridMessagesMap,
} from '~~/shared/drizzle/schema';
import { db } from '~~/shared/lib/db';
import * as schema from '~~/shared/drizzle/schema';

const eventWebhookValidator = new EventWebhook();

const runtimeConfig = useRuntimeConfig();
const publicKey = eventWebhookValidator.convertPublicKeyToECDSA(
    runtimeConfig.sendgridWebhookSigningKey
);

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
        messageStatus: MessageStatusAndId
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

    async update(updateRequest: MessageStatusAndId): Promise<void> {
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

class MessageReplyTable extends MessageStatusTable<
    InferSelectModel<typeof messageReplies>
> {
    private dbClient: LibSQLDatabase<typeof schema>;

    constructor(dbClient: LibSQLDatabase<typeof schema>) {
        super('messageReply');
        this.dbClient = dbClient;
    }

    protected async getInternal(
        sendGridMessageId: string
    ): Promise<InferSelectModel<typeof messageReplies> | null> {
        const results = await this.dbClient
            .select()
            .from(messageReplies)
            .where(eq(messageReplies.sendGridMessageId, sendGridMessageId));
        if (results) {
            return results[0];
        }
        return null;
    }

    protected async updateInternal(
        updateRequest: MessageStatusAndId
    ): Promise<void> {
        await this.dbClient
            .update(messageReplies)
            .set({
                sendGridMessageStatus: updateRequest.sendGridMessageStatus,
                updatedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(messageReplies.id, updateRequest.id));
    }
}

class PurchaseAuditTable extends MessageStatusTable<
    InferSelectModel<typeof purchaseAudits>
> {
    private dbClient: LibSQLDatabase<typeof schema>;

    constructor(dbClient: LibSQLDatabase<typeof schema>) {
        super('purchaseAudit');
        this.dbClient = dbClient;
    }

    protected async getInternal(
        sendGridMessageId: string
    ): Promise<InferSelectModel<typeof purchaseAudits> | null> {
        const results = await this.dbClient
            .select()
            .from(purchaseAudits)
            .where(eq(purchaseAudits.sendGridMessageId, sendGridMessageId));
        if (results) {
            return results[0];
        }
        return null;
    }

    protected async updateInternal(
        updateRequest: MessageStatusAndId
    ): Promise<void> {
        await this.dbClient
            .update(purchaseAudits)
            .set({
                sendGridMessageStatus: updateRequest.sendGridMessageStatus,
                updatedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(messageReplies.id, updateRequest.id));
    }
}

class MessageStatusTableFactory {
    private dbClient: LibSQLDatabase<typeof schema>;

    constructor(dbClient: LibSQLDatabase<typeof schema>) {
        this.dbClient = dbClient;
    }

    async getTable(
        sendGridMessageId: string
    ): Promise<MessageStatusTable<MessageStatusAndId>> {
        let sendGridMessageMap;
        try {
            const results = await this.dbClient
                .select()
                .from(sendGridMessagesMap)
                .where(eq(sendGridMessagesMap.id, sendGridMessageId));
            if (!results) {
                console.error(
                    `No mapping found for sendGridMessageId, ${sendGridMessageId}.`
                );
                throw createError({
                    status: 500,
                    statusMessage: 'Internal Server Error',
                });
            } else {
                sendGridMessageMap = results[0];
            }
        } catch (e) {
            console.error(
                `Failed to fetch mapping for sendGridMessageId, ${sendGridMessageId}`,
                e
            );
            throw createError({
                status: 500,
                statusMessage: 'Internal Server Error',
            });
        }
        console.log(`Message type, ${sendGridMessageMap.type}.`);
        switch (sendGridMessageMap.type) {
            case 'PURCHASE':
                return new PurchaseAuditTable(this.dbClient);
            case 'MESSAGE_REPLY':
                return new MessageReplyTable(this.dbClient);
            default:
                throw createError({
                    status: 500,
                    statusMessage: 'Internal Server Error',
                });
        }
    }
}

export default defineEventHandler(async (event): Promise<void> => {
    console.log('webhook received...');
    const webhookBody: JSONObject[] = await readBody(event);
    const signature = event.node.req.headers[
        'x-twilio-email-event-webhook-signature'
    ] as string;
    const timestamp = event.node.req.headers[
        'x-twilio-email-event-webhook-timestamp'
    ] as string;

    console.log(webhookBody);

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

const factory = new MessageStatusTableFactory(db);

async function handleEvent(webhookEvent: JSONObject) {
    if (typeof webhookEvent.sg_message_id !== 'string') {
        throw new Error('Webhook body sg_message_id must be of type string');
    }
    const sendGridMessageId = (webhookEvent.sg_message_id as string).split(
        '.'
    )[0];
    const newStatus = getStatusFrom(webhookEvent);
    if (!newStatus) {
        // Don't continue to process an unknown event type
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
): MessageStatusAndId | undefined {
    if (
        newStatus &&
        getStatusPriority(newStatus) > getStatusPriority(existingStatus)
    ) {
        return {
            id: recordId,
            sendGridMessageStatus: newStatus,
        };
    }
    return undefined;
}

function getStatusFrom(webhookEvent: JSONObject): MessageStatus | undefined {
    switch (webhookEvent.event) {
        case 'processed':
            return 'PROCESSED';
        case 'deferred':
            return 'DEFERRED';
        case 'delivered':
            return 'DELIVERED';
        case 'open':
            return 'OPENED';
        case 'click':
            return 'CLICKED';
        case 'bounce':
            return 'BOUNCED';
        case 'dropped':
            return 'DROPPED';
        default:
            console.error(
                'Event of type ' + webhookEvent.event + ' cannot be handled.'
            );
    }
}

function getStatusPriority(status: MessageStatus): number {
    switch (status) {
        case 'PENDING':
            return 0;
        case 'PROCESSED':
            return 1;
        case 'DEFERRED':
            return 2;
        case 'BOUNCED':
            return 3;
        case 'DELIVERED':
            return 4;
        case 'OPENED':
            return 5;
        case 'CLICKED':
            return 6;
        default:
            throw new Error(`Unknown MessageStatus ${status}`);
    }
}
