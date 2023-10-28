import prisma from "~/lib/prisma";
import { Message } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default defineEventHandler(async (event): Promise<Message> => {
  const message = await readBody<Message>(event);
  delete message.replies;
  try {
    await prisma.message.update({
      where: {
        id: message.id,
      },
      data: message
    });
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw createError({ statusMessage: 'Message Not Found', statusCode: 404 });
    } else {
      console.error(error);
      throw createError({ statusMessage: 'Internal Server Error', statusCode: 500 });
    }
  }
  return message;
});
