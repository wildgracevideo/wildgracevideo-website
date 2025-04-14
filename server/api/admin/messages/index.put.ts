import { eq, InferSelectModel, sql } from 'drizzle-orm';
import { messages } from '~~/shared/drizzle/schema';
import { db } from '~~/shared/lib/db';

export default defineEventHandler(
    async (event): Promise<InferSelectModel<typeof messages>> => {
        const message =
            await readBody<InferSelectModel<typeof messages>>(event);
        try {
            const results = await db
                .update(messages)
                .set({ ...message, updatedAt: sql`CURRENT_TIMESTAMP` })
                .where(eq(messages.id, message.id))
                .returning();
            if (!results) {
                console.error(`Message with id, ${message.id}, was not found.`);
                throw createError({
                    statusMessage: 'Message Not Found',
                    statusCode: 404,
                });
            }
            return results[0];
        } catch (error: unknown) {
            console.error(error);
            throw createError({
                statusMessage: 'Internal Server Error',
                statusCode: 500,
            });
        }
    }
);
