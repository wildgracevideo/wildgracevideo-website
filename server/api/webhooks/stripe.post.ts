import { stripe } from '~/lib/stripe';

export default defineEventHandler(async (event): Promise<void> => {
  const webhookBody = await readBody(event);
  if (webhookBody.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(webhookBody.data.object.id);
    console.log(session);
  }
});