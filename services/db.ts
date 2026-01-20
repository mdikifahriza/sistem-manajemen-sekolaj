
import { neon } from '@neondatabase/serverless';

// Try standard env var or Next.js public env var
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || process.env.DATABASE_URL || '';

/**
 * Neon SQL client for serverless environments.
 * Uses HTTP for communication, making it ideal for browser-based apps.
 */
export const sql = databaseUrl && !databaseUrl.includes('your_neon_connection_string') 
  ? neon(databaseUrl) 
  : null;

export const isDbConnected = !!sql;
