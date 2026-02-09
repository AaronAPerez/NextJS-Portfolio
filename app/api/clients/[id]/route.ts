import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET single client by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const result = await sql`
      SELECT * FROM "Client" WHERE "id" = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
  }
}

// PUT update client
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await request.json()

    const result = await sql`
      UPDATE "Client"
      SET
        "name" = ${data.name},
        "company" = ${data.company || ''},
        "email" = ${data.email || ''},
        "phone" = ${data.phone || ''},
        "address" = ${data.address || ''},
        "city" = ${data.city || ''},
        "state" = ${data.state || ''},
        "zipCode" = ${data.zipCode || ''},
        "notes" = ${data.notes || ''},
        "status" = ${data.status || 'active'},
        "updatedAt" = NOW()
      WHERE "id" = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
  }
}

// DELETE client
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check if client has invoices
    const invoices = await sql`
      SELECT COUNT(*) as count FROM "Invoice" WHERE "clientId" = ${id}
    `

    if (invoices[0].count > 0) {
      // Soft delete - mark as inactive instead of deleting
      await sql`
        UPDATE "Client"
        SET "status" = 'inactive', "updatedAt" = NOW()
        WHERE "id" = ${id}
      `
      return NextResponse.json({ message: 'Client marked as inactive (has invoices)' })
    }

    const result = await sql`
      DELETE FROM "Client" WHERE "id" = ${id}
      RETURNING "id"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Client deleted successfully' })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
  }
}
