import { PurchaseAudit } from "@prisma/client";
import prisma from "~/lib/prisma";
import { PaginationResult } from "~/types/pagination";

export default defineEventHandler(async (event): Promise<PaginationResult<PurchaseAudit>> => {
    const query = getQuery(event);
    const offset = parseQueryParam(query.offset?.toString(), "offset");
    const limit = parseQueryParam(query.limit?.toString(), "limit");
    const purchasesPromise = prisma.purchaseAudit.findMany({
        skip: offset,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const countPromise = prisma.purchaseAudit.aggregate({
      _count: {
        id: true,
      },
    });

    const count = (await countPromise)._count.id;
    return {
        offset,
        limit,
        results: await purchasesPromise,
        totalPages: Math.ceil(count / limit),
        page: Math.floor(offset / limit),
        totalResults: count,
    };
});

function parseQueryParam(param: string | undefined, paramName: string): number {
    const errorMessage = `${paramName} must be a positive number`;
    const paramNum = Number.parseInt(param || "");
    if (isNaN(paramNum) || paramNum < 0) {
        console.log(errorMessage);
        throw createError({ statusMessage: errorMessage, statusCode: 400 });
    }
    return paramNum;
}
