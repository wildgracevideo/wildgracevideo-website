import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
import * as schema from '~/drizzle/schema';
dotenv.config();

const migrateEnv = process.env.MIGRATE_ENV || 'dev';

let dbUrl = process.env.TURSO_DATABASE_URL!;
let authToken = process.env.TURSO_AUTH_TOKEN;

if (migrateEnv === 'prd') {
    dbUrl = process.env.PRD_TURSO_DATABASE_URL!;
    authToken = process.env.PRD_TURSO_AUTH_TOKEN;
}

export const turso = createClient({
    url: dbUrl,
    authToken: authToken,
});

export const db = drizzle(turso, { schema });

await migrate(db, { migrationsFolder: './drizzle/migrations' });
turso.close();
