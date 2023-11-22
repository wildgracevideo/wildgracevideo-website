import { MessageReplyRequest } from "~/types/messages";

// TODO: Use MessageReply type
// export default defineEventHandler(async (event): Promise<MessageReply> => {
export default defineEventHandler(async (event): Promise<void> => {
  const messageReplyRequest = await readBody<MessageReplyRequest>(event);

  console.log(messageReplyRequest);

  // const messageReplyCreateInput: Prisma.MessageReplyCreateInput = {
  //   toEmail: messageReplyRequest.toEmail,
  //   name: messageReplyRequest.name,
  //   message: {
  //     connect: {
  //       id: messageReplyRequest.messageId
  //     }
  //   }
  // };
  // const prismaResult = prisma.messageReply.create({data: messageReplyCreateInput});
  // await emailResult;
  // return await prismaResult;
});

