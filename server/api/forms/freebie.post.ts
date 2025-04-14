import { db } from '~~/shared/lib/db';
import { freebieSignups } from '~~/shared/drizzle/schema';

interface FreebieSignupRequest {
    email: string;
    freebieName: string;
    firstName: string;
    lastName: string;
}

export default defineEventHandler(
    async (event): Promise<FreebieSignupRequest> => {
        const body = await readBody<FreebieSignupRequest>(event);
        await db.insert(freebieSignups).values(body);
        return body;
    }
);
