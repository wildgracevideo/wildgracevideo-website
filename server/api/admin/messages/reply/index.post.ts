import prisma from "~/lib/prisma";
import { type MessageReply, type Prisma } from "@prisma/client";
import { sendEmail } from "~/lib/send-email";
import { MessageReplyRequest } from "~/types/messages";

export default defineEventHandler(async (event): Promise<MessageReply> => {
  const messageReplyRequest = await readBody<MessageReplyRequest>(event);

  const htmlBody = `
    <html>
      <body>
        Hi ${messageReplyRequest.name},
        <br />
        ${messageReplyRequest.message}
        <br/>
        <br/>
        Carly Kreiger
        <br/>
        Wild Grace Videography
      </body>
    </html>`;

  const emailResult = sendEmail(htmlBody, messageReplyRequest.toEmail, messageReplyRequest.subject);

  const messageReplyCreateInput: Prisma.MessageReplyCreateInput = {
    toEmail: messageReplyRequest.toEmail,
    body: messageReplyRequest.message,
    subject: messageReplyRequest.subject,
    name: messageReplyRequest.name,
    message: {
      connect: {
        id: messageReplyRequest.messageId
      }
    }
  };
  const prismaResult = prisma.messageReply.create({data: messageReplyCreateInput});
  await emailResult;
  return await prismaResult;
});

