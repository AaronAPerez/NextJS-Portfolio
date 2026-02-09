import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// GET single invoice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await sql`
      SELECT * FROM "Invoice" WHERE "id" = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 })
  }
}

// PUT update invoice
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const result = await sql`
      UPDATE "Invoice" SET
        "invoiceNumber" = ${data.invoiceNumber},
        "invoiceDate" = ${data.invoiceDate},
        "dueDate" = ${data.dueDate},
        "companyName" = ${data.companyName},
        "companyAddress" = ${data.companyAddress || ''},
        "companyCity" = ${data.companyCity || ''},
        "companyPhone" = ${data.companyPhone || ''},
        "companyEmail" = ${data.companyEmail || ''},
        "companyWebsite" = ${data.companyWebsite || ''},
        "clientName" = ${data.clientName || ''},
        "clientCompany" = ${data.clientCompany || ''},
        "clientAddress" = ${data.clientAddress || ''},
        "clientCity" = ${data.clientCity || ''},
        "clientEmail" = ${data.clientEmail || ''},
        "clientPhone" = ${data.clientPhone || ''},
        "items" = ${JSON.stringify(data.items || [])},
        "notes" = ${data.notes || ''},
        "terms" = ${data.terms || ''},
        "taxRate" = ${data.taxRate || 0},
        "subtotal" = ${data.subtotal || 0},
        "tax" = ${data.tax || 0},
        "total" = ${data.total || 0},
        "status" = ${data.status || 'draft'},
        "updatedAt" = NOW()
      WHERE "id" = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating invoice:', error)
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 })
  }
}

// DELETE invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await sql`
      DELETE FROM "Invoice" WHERE "id" = ${id} RETURNING "id"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 })
  }
}
