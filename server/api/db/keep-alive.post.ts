import { keepAlives } from '~~/shared/drizzle/schema';
import { db } from '~~/shared/lib/db';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    if (
        !runtimeConfig.apiKey ||
        event.headers.get('Authorization') !== runtimeConfig.apiKey
    ) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    await db.insert(keepAlives).values({});
});
