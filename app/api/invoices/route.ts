import { NextRequest, NextResponse } from 'next/server'
import { sql, generateId } from '@/lib/db'

// GET all invoices
export async function GET() {
  try {
    const invoices = await sql`
      SELECT * FROM "Invoice"
      ORDER BY "createdAt" DESC
    `
    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}

// POST create new invoice
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const id = generateId('inv')

    const result = await sql`
      INSERT INTO "Invoice" (
        "id", "invoiceNumber", "invoiceDate", "dueDate",
        "companyName", "companyAddress", "companyCity", "companyPhone", "companyEmail", "companyWebsite",
        "clientName", "clientCompany", "clientAddress", "clientCity", "clientEmail", "clientPhone",
        "items", "notes", "terms", "taxRate", "subtotal", "tax", "total", "status"
      ) VALUES (
        ${id}, ${data.invoiceNumber}, ${data.invoiceDate}, ${data.dueDate},
        ${data.companyName}, ${data.companyAddress || ''}, ${data.companyCity || ''},
        ${data.companyPhone || ''}, ${data.companyEmail || ''}, ${data.companyWebsite || ''},
        ${data.clientName || ''}, ${data.clientCompany || ''}, ${data.clientAddress || ''},
        ${data.clientCity || ''}, ${data.clientEmail || ''}, ${data.clientPhone || ''},
        ${JSON.stringify(data.items || [])}, ${data.notes || ''}, ${data.terms || ''},
        ${data.taxRate || 0}, ${data.subtotal || 0}, ${data.tax || 0}, ${data.total || 0},
        ${data.status || 'draft'}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
