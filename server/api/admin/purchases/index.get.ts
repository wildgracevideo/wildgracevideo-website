import { count, desc } from 'drizzle-orm';
import { type InferSelectModel } from 'drizzle-orm';
import { purchaseAudits } from '~/drizzle/schema';
import { db } from '~/lib/db';
import { PaginationResult } from '~/types/pagination';

export default defineEventHandler(
    async (
        event
    ): Promise<PaginationResult<InferSelectModel<typeof purchaseAudits>>> => {
        const query = getQuery(event);
        const offset = parseQueryParam(query.offset?.toString(), 'offset');
        const limit = parseQueryParam(query.limit?.toString(), 'limit');
        const findPurchases = db
            .select()
            .from(purchaseAudits)
            .offset(offset)
            .limit(limit)
            .orderBy(desc(purchaseAudits.createdAt))
            .all();
        const countResult = await db
            .select({
                count: count(),
            })
            .from(purchaseAudits);
        const resultsCount = countResult[0].count;

        return {
            offset,
            limit,
            results: await findPurchases,
            totalPages: Math.ceil(resultsCount / limit),
            page: Math.floor(offset / limit),
            totalResults: resultsCount,
        };
    }
);

function parseQueryParam(param: string | undefined, paramName: string): number {
    const errorMessage = `${paramName} must be a positive number`;
    const paramNum = Number.parseInt(param || '');
    if (isNaN(paramNum) || paramNum < 0) {
        console.log(errorMessage);
        throw createError({ statusMessage: errorMessage, statusCode: 400 });
    }
    return paramNum;
}
