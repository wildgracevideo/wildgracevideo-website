import { CheckoutType } from '~/lib/checkout-type';
import { stripe } from '~/lib/stripe';
import { CheckoutRequest } from '~/types/checkout-request';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<string> => {
  const checkoutRequest = await readBody<CheckoutRequest>(event);

  let priceId = "";
  switch (checkoutRequest.type) {
    case CheckoutType.ReelIdeas:
      priceId = runtimeConfig.stripeReelIdeasPriceId;
      break;
    case CheckoutType.InteriorDesignerReelIdeas:
      priceId = runtimeConfig.stripeInteriorDesignerReelIdeasPriceId;
      break;
    default:
      console.error(`Checkout request type of, ${checkoutRequest.type}, is not supported.`);
      throw createError({ statusMessage: 'Invalid checkout request', statusCode: 400 });
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      success_url: checkoutRequest.successUrl,
      cancel_url: checkoutRequest.cancelUrl,
      line_items: [
        { 
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      custom_text: {
        submit: {
          message: 'We\'ll email you the resources after you complete the purchase. By purchasing this product you\'re opting in to marketing emails.',
        },
      },
    });
  } catch (e) {
    console.error('Failed to create the stripe session', e);
    throw createError({ statusMessage: 'Internal Server Error', statusCode: 500 });
  }
  if (!session.url) {
    console.error('No url returned in Stripe session');
    throw createError({ statusMessage: 'Internal Server Error', statusCode: 500 });
  }
  return session.url;
});
