/**
 * Neon Database Connection
 * ─────────────────────────
 * Serverless PostgreSQL connection using @neondatabase/serverless
 * Configured for the GBP Optimization service
 */

import { neon } from '@neondatabase/serverless';

// Get database URL from environment variable
const DATABASE_URL = process.env.NEON_DATABASE_URL;

if (!DATABASE_URL) {
  console.warn('NEON_DATABASE_URL environment variable not set');
}

/**
 * Create a SQL query executor
 * Uses tagged template literals for safe parameterized queries
 */
export const sql = neon(DATABASE_URL || '');

export default sql;
