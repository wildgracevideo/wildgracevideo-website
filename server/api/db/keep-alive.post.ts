import prisma from '~/lib/prisma';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    if (
        !runtimeConfig.apiKey ||
        event.headers.get('Authorization') !== runtimeConfig.apiKey
    ) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    await prisma.keepAlive.create({ data: {} });
});
