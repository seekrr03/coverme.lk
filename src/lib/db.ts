import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool() {
  if (!pool) {
    // Enable SSL bypass for Supabase connection
    const connectionString = process.env.POSTGRES_URL || "postgres://postgres.ddcicsbibybgiggwbdsu:g3T4M4qnnSay5on6@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x";
    
    // Strip query parameters (e.g. ?sslmode=require) so pg-pool doesn't override our ssl configurations
    const cleanConnectionString = connectionString.split('?')[0];

    pool = new Pool({
      connectionString: cleanConnectionString,
      ssl: {
        rejectUnauthorized: false
      },
      max: 10, // Limit connections in serverless environment
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const dbPool = getDbPool();
  return dbPool.query(text, params);
}
