import { NextRequest, NextResponse } from 'next/server'
import { sql, generateId } from '@/lib/db'

// GET all hosting options documents
export async function GET() {
  try {
    const documents = await sql`
      SELECT * FROM "HostingOption"
      ORDER BY "createdAt" DESC
    `
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching hosting options:', error)
    return NextResponse.json({ error: 'Failed to fetch hosting options' }, { status: 500 })
  }
}

// POST create new hosting options document
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const id = generateId('hosting')

    const result = await sql`
      INSERT INTO "HostingOption" (
        "id", "companyName", "headerTitle", "headerSubtitle",
        "overviewText", "requirement1", "requirement2", "overviewNote",
        "options", "domainTitle", "domainDescription", "domainProviders", "domainPricing",
        "contactFormTitle", "contactFormDescription", "autoReplySubject", "autoReplyBody",
        "autoReplySignature", "contactFormNote", "footerTitle", "footerText", "clientEmail"
      ) VALUES (
        ${id}, ${data.companyName}, ${data.headerTitle}, ${data.headerSubtitle || ''},
        ${data.overviewText || ''}, ${data.requirement1 || ''}, ${data.requirement2 || ''}, ${data.overviewNote || ''},
        ${JSON.stringify(data.options || [])}, ${data.domainTitle || ''}, ${data.domainDescription || ''},
        ${JSON.stringify(data.domainProviders || [])}, ${data.domainPricing || ''},
        ${data.contactFormTitle || ''}, ${data.contactFormDescription || ''}, ${data.autoReplySubject || ''},
        ${data.autoReplyBody || ''}, ${data.autoReplySignature || ''}, ${data.contactFormNote || ''},
        ${data.footerTitle || ''}, ${data.footerText || ''}, ${data.clientEmail || ''}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating hosting options:', error)
    return NextResponse.json({ error: 'Failed to create hosting options' }, { status: 500 })
  }
}
