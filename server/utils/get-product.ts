import type { EventHandlerRequest, H3Event } from 'h3';
import { CmsProduct } from '~~/shared/types/cms';

export interface ProductBackendProperties {
    stripePriceId: string;
    sendGridTemplateId: string;
    omnisendTag: string;
    path: string;
}

const runtimeConfig = useRuntimeConfig();

export async function getProductByPriceId(
    event: H3Event<EventHandlerRequest>,
    priceId: string
): Promise<ProductBackendProperties> {
    let predicate;
    if (runtimeConfig.stripePriceOverride) {
        predicate = (_it: ProductBackendProperties) => true;
    } else {
        predicate = (it: ProductBackendProperties) =>
            it.stripePriceId === priceIdOrOverride;
    }
    const priceIdOrOverride = runtimeConfig.stripePriceOverride || priceId;
    return await getProductBy(
        event,
        predicate,
        `Invalid priceId ${priceId} for request.`
    );
}

async function getProductBy(
    event: H3Event<EventHandlerRequest>,
    predicate: (element: ProductBackendProperties) => boolean,
    errorMessage: string
): Promise<ProductBackendProperties> {
    const contentList = await queryCollection(event, 'content')
        .where('stem', 'LIKE', 'product/%')
        .all();
    const product = contentList
        .map((it) => it.meta as unknown as CmsProduct)
        .find(predicate);

    if (product) {
        return product;
    } else {
        console.error(errorMessage);
        throw createError({ statusMessage: errorMessage, statusCode: 400 });
    }
}
