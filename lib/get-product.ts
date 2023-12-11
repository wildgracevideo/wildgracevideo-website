// eslint-disable-next-line import/no-unresolved
import type { EventHandlerRequest, H3Event } from 'h3';
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server';

export interface ProductBackendProperties {
    stripePriceId: string;
    sendGridTemplateId: string;
    omnisendTag: string;
    path: string;
}

export async function getProductByRoute(
    event: H3Event<EventHandlerRequest>,
    route: string
): Promise<ProductBackendProperties> {
    return await getProductBy(
        event,
        (it) => it.path === route,
        `Invalid path ${route} for request.`
    );
}

export async function getProductByPriceId(
    event: H3Event<EventHandlerRequest>,
    priceId: string
): Promise<ProductBackendProperties> {
    return await getProductBy(
        event,
        (it) => it.stripePriceId === priceId,
        `Invalid priceId ${priceId} for request.`
    );
}

async function getProductBy(
    event: H3Event<EventHandlerRequest>,
    predicate: (element: ProductBackendProperties) => boolean,
    errorMessage: string
): Promise<ProductBackendProperties> {
    const contentList = (await serverQueryContent(
        event
    ).find()) as ParsedContent[];
    const product = contentList
        .filter((it) => it._path?.startsWith('/products'))
        .map((it) => it as unknown as ProductBackendProperties)
        .find(predicate);

    if (product) {
        return product;
    } else {
        console.error(errorMessage);
        throw createError({ statusMessage: errorMessage, statusCode: 400 });
    }
}
