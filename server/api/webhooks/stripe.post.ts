import { Source, createContact } from '~/lib/create-contact';
import { sendReelIdeasEmail } from '~/lib/send-template-email';
import { stripe } from '~/lib/stripe';

export default defineEventHandler(async (event): Promise<void> => {
  const webhookBody = await readBody(event);
  if (webhookBody.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(webhookBody.data.object.id);
    if (session.consent?.promotions === "opt_in") {
      console.log("User opted in to emails.")
      const toEmail = session.customer_details?.email || session.customer_email;
      if (!toEmail) {
        console.error('No email found');
        throw createError({ statusMessage: 'Email Not Found', statusCode: 400 });
      }
      const nameParts = session.customer_details?.name?.split(' ') || [];
      const firstName = nameParts[0] || '';
      let lastName = '';
      if (nameParts.length > 1) {
        lastName = nameParts[nameParts.length - 1];
      }
      const templateData = {
        firstName: firstName,
      };
      await sendReelIdeasEmail(toEmail, templateData);
      const createContactRequest = {
        firstName: firstName,
        lastName: lastName,
        source: Source.THIRTY_DAY_VIDEO_TRANSFORMATION_BUY,
        email: toEmail,
        countryCode: session.customer_details?.address?.country || undefined,
      };
      await createContact(createContactRequest);
    } else {
      console.log("User opted out from emails.")
    }
  }
});