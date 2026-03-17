import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * POST /api/invoices/migrate
 * Adds missing columns to the Invoice table for payment tracking.
 * Safe to run multiple times - uses IF NOT EXISTS.
 */
export async function POST() {
  try {
    // Add columns if they don't exist (PostgreSQL syntax)
    await sql`
      DO $$
      BEGIN
        -- Add sentAt column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Invoice' AND column_name = 'sentAt') THEN
          ALTER TABLE "Invoice" ADD COLUMN "sentAt" TIMESTAMPTZ;
        END IF;

        -- Add paidAt column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Invoice' AND column_name = 'paidAt') THEN
          ALTER TABLE "Invoice" ADD COLUMN "paidAt" TIMESTAMPTZ;
        END IF;

        -- Add paidAmount column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Invoice' AND column_name = 'paidAmount') THEN
          ALTER TABLE "Invoice" ADD COLUMN "paidAmount" DECIMAL(10, 2);
        END IF;

        -- Add paymentMethod column
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Invoice' AND column_name = 'paymentMethod') THEN
          ALTER TABLE "Invoice" ADD COLUMN "paymentMethod" VARCHAR(50);
        END IF;

        -- Add paymentMethods column (JSONB for payment options)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Invoice' AND column_name = 'paymentMethods') THEN
          ALTER TABLE "Invoice" ADD COLUMN "paymentMethods" JSONB;
        END IF;

        -- Add clientId column (references Client table)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Invoice' AND column_name = 'clientId') THEN
          ALTER TABLE "Invoice" ADD COLUMN "clientId" VARCHAR(50);
        END IF;
      END
      $$;
    `

    return NextResponse.json({
      success: true,
      message: 'Invoice table migration completed successfully. Columns added: sentAt, paidAt, paidAmount, paymentMethod, paymentMethods, clientId'
    })
  } catch (error) {
    console.error('Error running invoice migration:', error)
    return NextResponse.json({
      error: 'Failed to run migration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET to check current column status
export async function GET() {
  try {
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Invoice'
      ORDER BY ordinal_position
    `

    const requiredColumns = ['sentAt', 'paidAt', 'paidAmount', 'paymentMethod', 'paymentMethods', 'clientId']
    const existingColumns = columns.map((c: { column_name: string }) => c.column_name)
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col))

    return NextResponse.json({
      columns: existingColumns,
      missingColumns,
      needsMigration: missingColumns.length > 0
    })
  } catch (error) {
    console.error('Error checking invoice columns:', error)
    return NextResponse.json({
      error: 'Failed to check columns',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
