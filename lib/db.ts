import { neon } from '@neondatabase/serverless'

// Validate DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL environment variable is not set');
}

// Create a SQL query function using the connection string from environment
export const sql = neon(process.env.DATABASE_URL || '')

// Helper function to generate unique IDs
export function generateId(prefix: string = '') {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`
}
