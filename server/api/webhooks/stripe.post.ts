import { CreateContactRequest, ProductType, createContact } from '~/lib/create-contact';
import { sendReelIdeasEmail } from '~/lib/send-template-email';
import { stripe } from '~/lib/stripe';
import prisma from '~/lib/prisma';
import { PurchaseAudit, SendGridMessageType } from '@prisma/client';

export default defineEventHandler(async (event): Promise<void> => {
  const webhookBody = await readBody(event);
  if (webhookBody.type === 'checkout.session.completed') {
    const sessionId = webhookBody.data.object.id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("User opted in to emails.")
    const toEmail = session.customer_details?.email || session.customer_email;
    if (!toEmail) {
      console.error('No email found');
      throw createError({ statusMessage: 'Email Not Found', statusCode: 400 });
    }
    const nameParts = session.customer_details?.name?.split(' ') || [];
    const firstName = capitalizeFirstLetter(nameParts[0] || '');
    let lastName = '';
    if (nameParts.length > 1) {
      lastName = nameParts[nameParts.length - 1];
    } 
    if (lastName) {
      lastName = capitalizeFirstLetter(lastName);
    }
    const createContactRequest = {
      firstName: firstName,
      lastName: lastName,
      source: ProductType.THIRTY_DAY_VIDEO_TRANSFORMATION_BUY,
      email: toEmail,
      countryCode: session.customer_details?.address?.country || undefined,
      stripeSessionId: sessionId,
    };
    const templateData = {
      firstName: firstName,
    };
    let purchaseAudit = await getPurchaseAuditFromDB(createContactRequest);
    if (!purchaseAudit) {
      purchaseAudit = await saveContactToDB(createContactRequest);
    }
    if (!purchaseAudit.sentProduct) {
      const messageId = await sendReelIdeasEmail(toEmail, templateData);
      await updateSentProductField(purchaseAudit.id, messageId); 
    }
    await createContact(createContactRequest);
  }
});

async function getPurchaseAuditFromDB(request: CreateContactRequest): Promise<PurchaseAudit | null> {
  try {
    return await prisma.purchaseAudit.findFirst({
      where: { stripeSessionId: request.stripeSessionId },
    });
  } catch (e){
    console.error('Failed to get PurchaseAudit from the database.', e);
    throw e;
  }
}

async function saveContactToDB(request: CreateContactRequest): Promise<PurchaseAudit> {
  const input = {
    email: request.email,
    product: request.source,
    country: request.countryCode,
    firstName: request.firstName,
    lastName: request.lastName,
    stripeSessionId: request.stripeSessionId,
  }
  try {
    return prisma.purchaseAudit.create({ data: input }); 
  } catch (e) {
    console.error('Failed to create purchase audit.', e);
    throw e;
  }
}

async function updateSentProductField(id: string, messageId: string): Promise<void> {
  try {
    await prisma.purchaseAudit.update({
      where: {
        id: id,
      },
      data: {
        sentProduct: true,
        sendGridMessageId: messageId,
      }
    });
  } catch (e) {
    console.error('Failed to update sentProduct field.', e);
    throw e;
  }

  // TODO: Error handling here?
  await prisma.sendGridMessageMap.create({
    data: {
      id: messageId,
      type: SendGridMessageType.PURCHASE,
    }
  });
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
