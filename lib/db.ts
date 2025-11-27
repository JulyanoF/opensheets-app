import * as schema from "@/db/schema";
import { drizzle, type PgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  db?: PgDatabase<typeof schema>;
  pool?: Pool;
};

let _db: PgDatabase<typeof schema> | undefined;
let _pool: Pool | undefined;

function getDb() {
  if (_db) return _db;

  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, PG_CA_CERTIFICATE } = process.env;

  _pool =
    globalForDb.pool ??
    new Pool({
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      database: POSTGRES_DB,
      ssl: {
        rejectUnauthorized: true,
        ca: PG_CA_CERTIFICATE,
      },
    });

  _db = globalForDb.db ?? drizzle(_pool, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.pool = _pool;
    globalForDb.db = _db;
  }

  return _db;
}

export const db = new Proxy({} as PgDatabase<typeof schema>, {
  get(_, prop) {
    return Reflect.get(getDb(), prop);
  },
});

export { schema };
