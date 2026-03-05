import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const globalForDb = globalThis as unknown as {
  pool: pg.Pool | undefined;
};

function isLocalPostgres(url: string) {
  return /localhost|127\.0\.0\.1|host\.docker\.internal/i.test(url);
}

export function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'Missing DATABASE_URL. Set variables in .env.local (dev) or Vercel Project Settings.',
    );
  }

  if (isLocalPostgres(connectionString)) {
    const pool =
      globalForDb.pool ??
      new pg.Pool({
        connectionString,
      });

    if (process.env.NODE_ENV !== 'production') {
      globalForDb.pool = pool;
    }

    return drizzlePg(pool, { schema });
  }

  const sql = neon(connectionString);
  return drizzleNeon({ client: sql, schema });
}

export const db = getDb();
