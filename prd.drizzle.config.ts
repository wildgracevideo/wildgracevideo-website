import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    schema: './shared/drizzle/schema.ts',
    out: './shared/drizzle/migrations',
    driver: 'turso',
    dbCredentials: {
        url: process.env.PRD_TURSO_DATABASE_URL!,
        authToken: process.env.PRD_TURSO_AUTH_TOKEN,
    },
} satisfies Config;
