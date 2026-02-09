import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET all invoices for a client
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const invoices = await sql`
      SELECT * FROM "Invoice"
      WHERE "clientId" = ${id}
      ORDER BY "createdAt" DESC
    `

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching client invoices:', error)
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}
