import { MessageReply, SendGridMessageType  } from "@prisma/client";
import prisma from "~/lib/prisma";
import { sendDiscoveryCall } from "~/lib/send-template-email";
import { MessageReplyRequest } from "~/types/messages";

export default defineEventHandler(async (event): Promise<MessageReply> => {
    const messageReplyRequest = await readBody<MessageReplyRequest>(event);

    let messageId: string;
    try {
        messageId = await sendDiscoveryCall(messageReplyRequest.toEmail, { firstName: messageReplyRequest.name });
    } catch (e) {
        throw createError({ status: 500, statusMessage: 'Internal server error'});
    }
    console.log('Sent discovery call email');
    const [messageReply, _] = await prisma.$transaction([
        prisma.messageReply.create({
            data: {
                name: messageReplyRequest.name,
                toEmail: messageReplyRequest.toEmail,
                messageId: messageReplyRequest.messageId,
                sendGridMessageId: messageId,
            }
        }),
        prisma.sendGridMessageMap.create({
            data: {
                id: messageId,
                type: SendGridMessageType.MESSAGE_REPLY,
            }
        })
    ]);
    return messageReply;
});

