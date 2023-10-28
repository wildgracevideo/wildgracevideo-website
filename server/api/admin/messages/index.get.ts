import prisma from "~/lib/prisma";
import { type Message } from "@prisma/client";

export default defineEventHandler(async (event): Promise<Message[]> => {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      replies: true,
    }
  });
});