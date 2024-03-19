import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { messageReplies, sendGridMessagesMap } from '~/drizzle/schema';
import { db } from '~/lib/db';
import { sendDiscoveryCall } from '~/lib/send-template-email';

export default defineEventHandler(
    async (event): Promise<InferSelectModel<typeof messageReplies>> => {
        const messageReplyRequest =
            await readBody<InferInsertModel<typeof messageReplies>>(event);

        let messageId: string;
        try {
            messageId = await sendDiscoveryCall(messageReplyRequest.toEmail, {
                firstName: messageReplyRequest.name,
            });
        } catch (e) {
            throw createError({
                status: 500,
                statusMessage: 'Internal server error',
            });
        }
        console.log('Sent discovery call email');
        const messageReply = {
            name: messageReplyRequest.name,
            toEmail: messageReplyRequest.toEmail,
            messageId: messageReplyRequest.messageId,
            sendGridMessageId: messageId,
        };
        const messageMap: InferInsertModel<typeof sendGridMessagesMap> = {
            id: messageId,
            type: 'MESSAGE_REPLY',
        };
        const insertedMessageReply = await db.transaction(async (tx) => {
            const reply = await tx
                .insert(messageReplies)
                .values(messageReply)
                .returning();
            await tx.insert(sendGridMessagesMap).values(messageMap);
            return reply;
        });
        return insertedMessageReply[0];
    }
);
