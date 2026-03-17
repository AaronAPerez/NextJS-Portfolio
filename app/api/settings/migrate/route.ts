import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * POST /api/settings/migrate
 * Creates the Settings table if it doesn't exist.
 * Safe to run multiple times.
 */
export async function POST() {
  try {
    // Create Settings table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS "Settings" (
        "id" VARCHAR(50) PRIMARY KEY,
        "key" VARCHAR(100) UNIQUE NOT NULL,
        "value" TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `

    // Create index on key for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS "idx_settings_key" ON "Settings" ("key")
    `

    return NextResponse.json({
      success: true,
      message: 'Settings table created successfully'
    })
  } catch (error) {
    console.error('Error creating settings table:', error)
    return NextResponse.json({
      error: 'Failed to create settings table',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET to check if Settings table exists
export async function GET() {
  try {
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'Settings'
      ) as exists
    `

    const settingsCount = tableExists[0]?.exists
      ? await sql`SELECT COUNT(*) as count FROM "Settings"`
      : [{ count: 0 }]

    return NextResponse.json({
      tableExists: tableExists[0]?.exists || false,
      settingsCount: Number(settingsCount[0]?.count || 0)
    })
  } catch (error) {
    console.error('Error checking settings table:', error)
    return NextResponse.json({
      error: 'Failed to check settings table',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
