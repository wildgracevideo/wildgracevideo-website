import prisma from '~/lib/prisma';
import { type MessageWithRelations } from '~/lib/prisma';

export default defineEventHandler(
    async (_event): Promise<MessageWithRelations[]> => {
        const messages =
            (await prisma.message.findMany<{
                include: { reply: true };
                orderBy: { createdAt: 'desc' };
            }>({
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    reply: true,
                },
            })) || [];
        return messages.filter((it) => !it.deleted);
    }
);
