import { NextRequest, NextResponse } from 'next/server'
import { sql, generateId } from '@/lib/db'

// GET all clients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let clients
    if (status && status !== 'all') {
      if (search) {
        clients = await sql`
          SELECT * FROM "Client"
          WHERE "status" = ${status}
          AND ("name" ILIKE ${'%' + search + '%'} OR "company" ILIKE ${'%' + search + '%'} OR "email" ILIKE ${'%' + search + '%'})
          ORDER BY "createdAt" DESC
        `
      } else {
        clients = await sql`
          SELECT * FROM "Client"
          WHERE "status" = ${status}
          ORDER BY "createdAt" DESC
        `
      }
    } else if (search) {
      clients = await sql`
        SELECT * FROM "Client"
        WHERE "name" ILIKE ${'%' + search + '%'} OR "company" ILIKE ${'%' + search + '%'} OR "email" ILIKE ${'%' + search + '%'}
        ORDER BY "createdAt" DESC
      `
    } else {
      clients = await sql`
        SELECT * FROM "Client"
        ORDER BY "createdAt" DESC
      `
    }

    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

// POST create new client
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const id = generateId('cli')

    const result = await sql`
      INSERT INTO "Client" (
        "id", "name", "company", "email", "phone",
        "address", "city", "state", "zipCode", "notes", "status"
      ) VALUES (
        ${id}, ${data.name}, ${data.company || ''}, ${data.email || ''},
        ${data.phone || ''}, ${data.address || ''}, ${data.city || ''},
        ${data.state || ''}, ${data.zipCode || ''}, ${data.notes || ''},
        ${data.status || 'active'}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
