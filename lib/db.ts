import { neon } from '@neondatabase/serverless'

// Create a SQL query function using the connection string from environment
export const sql = neon(process.env.DATABASE_URL!)

// Helper function to generate unique IDs
export function generateId(prefix: string = '') {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`
}
