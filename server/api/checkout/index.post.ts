import { stripe } from '~~/shared/lib/stripe';
import { CheckoutRequest } from '~~/shared/types/checkout-request';
import { CmsProduct } from '~~/shared/types/cms';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<string> => {
    const checkoutRequest = await readBody<CheckoutRequest>(event);

    let stripePriceId: string;
    const product = (
        await queryCollection(event, 'content')
            .where('stem', '=', `product/${checkoutRequest.route}`)
            .first()
    )?.meta as unknown as CmsProduct;
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
