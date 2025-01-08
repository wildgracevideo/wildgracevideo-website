import { db } from '~/lib/db';
import { freebieSignups } from '~/drizzle/schema';

interface FreebieSignupRequest {
    email: string;
    freebieName: string;
}

export default defineEventHandler(
    async (event): Promise<FreebieSignupRequest> => {
        const body = await readBody<FreebieSignupRequest>(event);
        await db.insert(freebieSignups).values(body);
        return body;
    }
);
