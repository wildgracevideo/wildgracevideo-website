import prisma from "~/lib/prisma";
import { type MessageWithRelations } from "~/lib/prisma";

export default defineEventHandler(async (event): Promise<MessageWithRelations[]> => {
  return await prisma.message.findMany<{include: { replies: true }; orderBy: { createdAt: 'desc' }}>({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      replies: true,
    }
  });
});