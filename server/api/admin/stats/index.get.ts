import { count, gt } from 'drizzle-orm';
import { freebieSignups, messages, purchaseAudits } from '~/drizzle/schema';
import { db } from '~/lib/db';
import { type Stat } from '~/types/stats';

export default defineEventHandler(async (event): Promise<Stat[]> => {
    const requestQueryParams = getQuery(event);
    const numDays = parseInt(requestQueryParams.numDays?.toString() ?? '7', 10);

    const date = new Date();
    date.setDate(date.getDate() - numDays);

    const messagesInLastXDaysPromise = db
        .select({ count: count() })
        .from(messages)
        .where(gt(messages.createdAt, date.toISOString().replace('T', ' ')));

    const purchasesInLastXDaysPromise = db
        .select({ count: count() })
        .from(purchaseAudits)
        .where(
            gt(purchaseAudits.createdAt, date.toISOString().replace('T', ' '))
        );

    const freebiesInLastXDaysPromise = db
        .select({ count: count() })
        .from(freebieSignups)
        .where(
            gt(freebieSignups.createdAt, date.toISOString().replace('T', ' '))
        );

    const messagesInLastXDays = await messagesInLastXDaysPromise;
    const purchasesInLastXDays = await purchasesInLastXDaysPromise;
    const freebiesInLastXDays = await freebiesInLastXDaysPromise;

    return [
        {
            title: 'Messages',
            stat: messagesInLastXDays[0].count.toString(),
            numDays: numDays,
        },
        {
            title: 'Purchases',
            stat: purchasesInLastXDays[0].count.toString(),
            numDays: numDays,
        },
        {
            title: 'Freebies',
            stat: freebiesInLastXDays[0].count.toString(),
            numDays: numDays,
        },
    ];
});
