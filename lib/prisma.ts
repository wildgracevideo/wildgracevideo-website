import { PrismaClient } from '@prisma/client'
import { type Message, type MessageReply } from '~/prisma/generated/zod';

const prisma: PrismaClient = new PrismaClient();
export default prisma;

type MessageRelations = {
  replies: MessageReply[];
};

export type MessageWithRelations = Message & MessageRelations;