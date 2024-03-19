import { desc } from 'drizzle-orm';
import { messages, MessageWithReply } from '~/drizzle/schema';
import { db } from '~/lib/db';

export default defineEventHandler(
    async (_event): Promise<MessageWithReply[]> => {
        const selectedMessages = await db.query.messages.findMany({
            with: { messageReply: true },
            orderBy: desc(messages.createdAt),
        });

        return selectedMessages
            .filter((it) => !!it && !it.deleted)
            .map((it) => it as MessageWithReply);
    }
);
