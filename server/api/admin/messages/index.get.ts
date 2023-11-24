import prisma from "~/lib/prisma";
import { type MessageWithRelations } from "~/lib/prisma";

// TODO: These routes should be returning a view model so Dates aren't autoserialized
export default defineEventHandler(async (event): Promise<MessageWithRelations[]> => {
  const messages = await prisma.message.findMany<{include: { reply: true }; orderBy: { createdAt: 'desc' }}>({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      reply: true,
    }
  });
  return messages.filter(it => !it.deleted );
});
