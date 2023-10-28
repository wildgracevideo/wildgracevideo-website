import prisma from "~/lib/prisma";
import { type Message } from "@prisma/client";

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
    // TODO: Can't import this in Netlify (import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";)
    if (error && error.name === "PrismaClientKnownRequestError") {
      throw createError({ statusMessage: 'Message Not Found', statusCode: 404 });
    } else {
      console.error(error);
      throw createError({ statusMessage: 'Internal Server Error', statusCode: 500 });
    }
  }
  return message;
});
