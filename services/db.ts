
import { neon } from '@neondatabase/serverless';

// Try standard env var or Next.js public env var
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || process.env.DATABASE_URL || '';

/**
 * Neon SQL client for serverless environments.
 * Uses HTTP for communication, making it ideal for browser-based apps.
 */
export const sql = databaseUrl ? neon(databaseUrl) : null;

/**
 * Helper to determine if a database connection is configured.
 * We consider it connected if the SQL client is initialized and the URL is not empty.
 */
export const isDbConnected = !!sql && databaseUrl !== '';
