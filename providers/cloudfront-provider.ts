import type { ProviderGetImage } from '@nuxt/image';
import { createOperationsGenerator } from '#image';

const operationsGenerator = createOperationsGenerator();

export const getImage: ProviderGetImage = (
    src,
    { modifiers = {}, baseURL } = {}
) => {
    if (!src.startsWith(baseURL)) {
        return {
            url: src,
        };
    }
    const srcWithoutQuery = src.split('?')[0];
    const operations = operationsGenerator(modifiers);
    let operationsArray: string[] = [];
    if (operations) {
        operationsArray = operations.split('/');
    }
    if (!operationsArray.some((it) => /^format=.*/g.test(it))) {
        operationsArray.push('format=webp');
    }
    const transformedUrl = srcWithoutQuery + '?' + operationsArray.join('&');
    return {
        url: transformedUrl,
    };
};
