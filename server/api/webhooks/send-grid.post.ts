import prisma from '~/lib/prisma';
import { EventWebhook } from '@sendgrid/eventwebhook'; 
import { MessageStatus } from '@prisma/client';

const eventWebhookValidator = new EventWebhook();

const runtimeConfig = useRuntimeConfig();
const publicKey = eventWebhookValidator.convertPublicKeyToECDSA(runtimeConfig.sendgridWebhookSigningKey);

export default defineEventHandler(async (event): Promise<void> => {
  const webhookBody: Record<string, any>[] = await readBody(event);
  const signature = event.node.req.headers['x-twilio-email-event-webhook-signature'] as string;
  const timestamp = event.node.req.headers['x-twilio-email-event-webhook-timestamp'] as string;

  if (!signature) {
    console.error("Signature is required in the x-twilio-email-event-webhook-signature header");
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  } else if (!timestamp) {
    console.error("Signature is required in the x-twilio-email-event-webhook-signature header");
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }

  const payload = JSON.stringify(webhookBody).split('},{').join('},\r\n{') + '\r\n';
  const validSignature = eventWebhookValidator.verifySignature(publicKey, payload, signature, timestamp);
  if (!validSignature) {
    console.error("Signature is not valid");
    throw createError({ statusMessage: 'Unauthorized', statusCode: 401 });
  }

  for (const webhookEvent of webhookBody) {
    await handleEvent(webhookEvent);
  }
});

async function handleEvent(webhookEvent: Record<string, any>) {
  const sendGridMessageId = webhookEvent['sg_message_id']?.split('.')[0];
  let status = getStatusFrom(webhookEvent);
  if (!status) {
    // Don't contine to process an unknown event type
    return;
  }
  let purchaseAudit;
  try {
    purchaseAudit = await prisma.purchaseAudit.findFirst({where: { sendGridMessageId }});
  } catch (e) {
    console.error(`Failed to find existing purchaseAudit for messageId ${sendGridMessageId}.`, e);
    throw e;
  }
  if (!purchaseAudit) {
    const message = `No purchase audit results for messageId, ${sendGridMessageId}`;
    console.error(message)
    throw new Error(message, webhookEvent);
  } 
  if (status && getStatusPriority(status) > getStatusPriority(purchaseAudit.sendGridMessageStatus)) { 
    try {
      await prisma.purchaseAudit.update({
        where: {
          id: purchaseAudit.id,
        },
        data: {
          sendGridMessageStatus: status,
        }
      });
    } catch (e) {
      console.error('Failed to update purchaseAudit message status field.', e);
      throw e;
    }
  }
}

function getStatusFrom(webhookEvent: Record<string, any>): MessageStatus | undefined  {
  switch(webhookEvent.event) {
    case 'processed':
      return MessageStatus.PROCESSED;
    case 'deferred':
      return MessageStatus.DEFERRED;
    case 'delivered':
      return MessageStatus.DELIVERED;
    case 'open':
      return MessageStatus.OPENED;
    case 'click':
      return MessageStatus.CLICKED;
    case 'bounce':
      return MessageStatus.BOUNCED;
    case 'dropped':
      return MessageStatus.DROPPED;
    default:
      console.error("Event of type " + webhookEvent.event + " cannot be handled.");
  }
}

function getStatusPriority(status: MessageStatus): number {
  switch (status) {
    case MessageStatus.PENDING:
      return 0;
    case MessageStatus.PROCESSED:
      return 1;
    case MessageStatus.DEFERRED:
      return 2;
    case MessageStatus.BOUNCED:
      return 3;
    case MessageStatus.DELIVERED:
      return 4;
    case MessageStatus.OPENED:
      return 5;
    case MessageStatus.CLICKED:
      return 6;
    default:
      throw new Error(`Unknown MessageStatus ${status}`)
  }
}
