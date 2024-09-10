import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '~/lib/db';

import { luciaSessionTable, luciaUserTable } from '~/drizzle/schema';

const adapter = new DrizzleSQLiteAdapter(db, luciaSessionTable, luciaUserTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !import.meta.dev,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            githubId: attributes.githubId,
            username: attributes.username,
        };
    },
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    githubId: string;
    username: string;
}
