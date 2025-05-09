import { desc, eq } from 'drizzle-orm';
import { messages, MessageWithReply } from '~~/shared/drizzle/schema';
import { db } from '~~/shared/lib/db';

export default defineEventHandler(
    async (_event): Promise<MessageWithReply[]> => {
        const selectedMessages = await db.query.messages.findMany({
            with: { messageReply: true },
            orderBy: desc(messages.createdAt),
            where: eq(messages.deleted, false),
        });

        return selectedMessages.map((it) => it as MessageWithReply);
    }
);
