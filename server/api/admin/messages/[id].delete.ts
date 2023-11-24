import prisma from "~/lib/prisma";
import { type Message } from "@prisma/client";

export default defineEventHandler(async (event): Promise<Message> => {
  const idString = event.context.params?.id;
  if (!idString) {
    console.error("Message ID is missing.")
    throw createError({ statusMessage: 'Message ID is required.', statusCode: 400 });
  }
  const id = parseInt(idString);
  if (isNaN(id)) {
    console.error("Messsage ID must be a number.")
    throw createError({ statusMessage: 'Message ID must be a number.', statusCode: 400 });
  }
  let updatedMessage;
  try {
    updatedMessage = await prisma.message.update({
      where: {
        id: id,
      },
      data: {
        deleted: true
      }
    });
  } catch (error: any) {
    // TODO: Can't import this in Netlify (import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";)
    if (error && error.name === "PrismaClientKnownRequestError") {
      console.error(`Message with id, ${id}, was not found.`);
      throw createError({ statusMessage: 'Message Not Found', statusCode: 404 });
    } else {
      console.error(error);
      throw createError({ statusMessage: 'Internal Server Error', statusCode: 500 });
    }
  }
  return updatedMessage;
});