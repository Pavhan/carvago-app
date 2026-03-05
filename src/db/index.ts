import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  pool: pg.Pool | undefined;
};

function getConnectionString() {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
}

export function getDb() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL/POSTGRES_URL. Set variables in .env.local (dev) or Vercel Project Settings.",
    );
  }

  const pool =
    globalForDb.pool ??
    new pg.Pool({
      connectionString,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.pool = pool;
  }

  return drizzle(pool, { schema });
}

export const db = getDb();
