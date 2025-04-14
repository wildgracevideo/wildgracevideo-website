import { eq, InferSelectModel, sql } from 'drizzle-orm';
import { messages } from '~~/shared/drizzle/schema';
import { db } from '~~/shared/lib/db';

export default defineEventHandler(
    async (event): Promise<InferSelectModel<typeof messages>> => {
        const idString = event.context.params?.id;
        if (!idString) {
            console.error('Message ID is missing.');
            throw createError({
                statusMessage: 'Message ID is required.',
                statusCode: 400,
            });
        }
        const id = parseInt(idString);
        if (isNaN(id)) {
            console.error('Messsage ID must be a number.');
            throw createError({
                statusMessage: 'Message ID must be a number.',
                statusCode: 400,
            });
        }
        let updatedMessage;
        try {
            updatedMessage = await db
                .update(messages)
                .set({
                    deleted: true,
                    updatedAt: sql`CURRENT_TIMESTAMP`,
                })
                .where(eq(messages.id, id))
                .returning();
            if (!updatedMessage) {
                console.error(`Message with id, ${id}, was not found.`);
                throw createError({
                    statusMessage: 'Message Not Found',
                    statusCode: 404,
                });
            }
        } catch (error: unknown) {
            console.error(error);
            throw createError({
                statusMessage: 'Internal Server Error',
                statusCode: 500,
            });
        }
        return updatedMessage[0];
    }
);
