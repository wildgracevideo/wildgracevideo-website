import { stripe } from '~/lib/stripe';
import { CheckoutRequest } from '~/types/checkout-request';
// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<string> => {
    const checkoutRequest = await readBody<CheckoutRequest>(event);

    let stripePriceId: string;
    const product = await serverQueryContent(event, '/product')
        .where({ path: checkoutRequest.route })
        .findOne();
    if (product) {
        stripePriceId = product.stripePriceId;
    } else {
        const message = `Invalid path ${checkoutRequest.route} for checkout request.`;
        console.error(message);
        throw createError({ statusMessage: message, statusCode: 400 });
    }

    let session;
    try {
        session = await stripe.checkout.sessions.create({
            success_url: checkoutRequest.successUrl,
            cancel_url: checkoutRequest.cancelUrl,
            line_items: [
                {
                    price: runtimeConfig.stripePriceOverride || stripePriceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            custom_text: {
                submit: {
                    message:
                        "We'll email you the resources after you complete the purchase. By purchasing this product you're opting in to marketing emails.",
                },
            },
        });
    } catch (e) {
        console.error('Failed to create the stripe session', e);
        throw createError({
            statusMessage: 'Internal Server Error',
            statusCode: 500,
        });
    }
    if (!session.url) {
        console.error('No url returned in Stripe session');
        throw createError({
            statusMessage: 'Internal Server Error',
            statusCode: 500,
        });
    }
    return session.url;
});
