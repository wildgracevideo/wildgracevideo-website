import type { EventHandlerRequest, H3Event } from 'h3';
import { eq, InferSelectModel, sql } from 'drizzle-orm';
import {
    createContact,
    CreateContactRequest,
} from '~~/shared/lib/create-contact';
import { sendTemplatedEmail } from '~~/shared/lib/send-template-email';
import { stripe } from '~~/shared/lib/stripe';
import {
    getProductByPriceId,
    ProductBackendProperties,
} from '~~/server/utils/get-product';
import { purchaseAudits, sendGridMessagesMap } from '~~/shared/drizzle/schema';
import { db } from '~~/shared/lib/db';

export default defineEventHandler(async (event): Promise<void> => {
    const webhookBody = await readBody(event);
    if (webhookBody.type === 'checkout.session.completed') {
        const sessionId = webhookBody.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const lineItems =
            await stripe.checkout.sessions.listLineItems(sessionId);
        console.log(lineItems);
        let priceId: string | undefined;
        if (lineItems.data) {
            console.log(lineItems.data[0].price);
            priceId = lineItems.data[0].price?.id;
        }

        let product: ProductBackendProperties;
        if (!priceId) {
            const message = `Line items for the session, ${sessionId}, were not found`;
            console.error(message);
            throw createError({ statusMessage: message, statusCode: 500 });
        } else {
            product = await getProduct(event, priceId!);
            console.log(
                `Checkout session, ${sessionId}, for product, ${product.omnisendTag}`
            );
        }
        console.log('User opted in to emails.');
        const toEmail =
            session.customer_details?.email || session.customer_email;
        if (!toEmail) {
            console.error('No email found');
            throw createError({
                statusMessage: 'Email Not Found',
                statusCode: 400,
            });
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
            firstName,
            lastName,
            source: product.omnisendTag,
            email: toEmail,
            countryCode:
                session.customer_details?.address?.country || undefined,
            stripeSessionId: sessionId,
        };
        const templateData = {
            firstName,
        };
        let purchaseAudit = await getPurchaseAuditFromDB(createContactRequest);
        if (!purchaseAudit) {
            purchaseAudit = await saveContactToDB(createContactRequest);
        }
        if (!purchaseAudit.sentProduct) {
            const messageId = await sendTemplatedEmail(
                toEmail,
                product.sendGridTemplateId,
                templateData
            );
            await updateSentProductField(purchaseAudit.id, messageId);
        }
        await createContact(createContactRequest);
    }
});

async function getProduct(
    event: H3Event<EventHandlerRequest>,
    priceId: string
): Promise<ProductBackendProperties> {
    return await getProductByPriceId(event, priceId);
}

async function getPurchaseAuditFromDB(
    request: CreateContactRequest
): Promise<InferSelectModel<typeof purchaseAudits> | null> {
    try {
        const foundAudits = await db
            .select()
            .from(purchaseAudits)
            .where(eq(purchaseAudits.stripeSessionId, request.stripeSessionId));
        return foundAudits[0];
    } catch (e) {
        console.error('Failed to get PurchaseAudit from the database.', e);
        throw e;
    }
}

async function saveContactToDB(
    request: CreateContactRequest
): Promise<InferSelectModel<typeof purchaseAudits>> {
    const input = {
        email: request.email,
        product: request.source,
        country: request.countryCode,
        firstName: request.firstName,
        lastName: request.lastName,
        stripeSessionId: request.stripeSessionId,
    };
    try {
        return (await db.insert(purchaseAudits).values(input).returning())[0];
    } catch (e) {
        console.error('Failed to create purchase audit.', e);
        throw e;
    }
}

async function updateSentProductField(
    id: string,
    messageId: string
): Promise<void> {
    try {
        await db.transaction(async (tx) => {
            await tx
                .update(purchaseAudits)
                .set({
                    sentProduct: true,
                    sendGridMessageId: messageId,
                    updatedAt: sql`CURRENT_TIMESTAMP`,
                })
                .where(eq(purchaseAudits.id, id));
            await tx
                .insert(sendGridMessagesMap)
                .values({ id: messageId, type: 'PURCHASE' });
        });
    } catch (e) {
        console.error(
            'Failed to update sentProduct field, or create sendGrid message mapping.',
            e
        );
        throw e;
    }
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
