import { type Message } from '@prisma/client';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event): Promise<Message> => {
    const message = await readBody<Message>(event);
    let updatedMessage;
    try {
        updatedMessage = await prisma.message.update({
            where: {
                id: message.id,
            },
            data: message,
        });
    } catch (error: unknown) {
        // @ts-expect-error TODO: Can't import this in Netlify (import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
        if (error?.name === 'PrismaClientKnownRequestError') {
            console.error(`Message with id, ${message.id}, was not found.`);
            throw createError({
                statusMessage: 'Message Not Found',
                statusCode: 404,
            });
        } else {
            console.error(error);
            throw createError({
                statusMessage: 'Internal Server Error',
                statusCode: 500,
            });
        }
    }
    return updatedMessage;
});
