import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// GET single hosting options document
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await sql`
      SELECT * FROM "HostingOption" WHERE "id" = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Hosting options not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error fetching hosting options:', error)
    return NextResponse.json({ error: 'Failed to fetch hosting options' }, { status: 500 })
  }
}

// PUT update hosting options document
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const result = await sql`
      UPDATE "HostingOption" SET
        "companyName" = ${data.companyName},
        "headerTitle" = ${data.headerTitle},
        "headerSubtitle" = ${data.headerSubtitle || ''},
        "overviewText" = ${data.overviewText || ''},
        "requirement1" = ${data.requirement1 || ''},
        "requirement2" = ${data.requirement2 || ''},
        "overviewNote" = ${data.overviewNote || ''},
        "options" = ${JSON.stringify(data.options || [])},
        "domainTitle" = ${data.domainTitle || ''},
        "domainDescription" = ${data.domainDescription || ''},
        "domainProviders" = ${JSON.stringify(data.domainProviders || [])},
        "domainPricing" = ${data.domainPricing || ''},
        "contactFormTitle" = ${data.contactFormTitle || ''},
        "contactFormDescription" = ${data.contactFormDescription || ''},
        "autoReplySubject" = ${data.autoReplySubject || ''},
        "autoReplyBody" = ${data.autoReplyBody || ''},
        "autoReplySignature" = ${data.autoReplySignature || ''},
        "contactFormNote" = ${data.contactFormNote || ''},
        "footerTitle" = ${data.footerTitle || ''},
        "footerText" = ${data.footerText || ''},
        "clientEmail" = ${data.clientEmail || ''},
        "updatedAt" = NOW()
      WHERE "id" = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Hosting options not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating hosting options:', error)
    return NextResponse.json({ error: 'Failed to update hosting options' }, { status: 500 })
  }
}

// DELETE hosting options document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await sql`
      DELETE FROM "HostingOption" WHERE "id" = ${id} RETURNING "id"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Hosting options not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Hosting options deleted successfully' })
  } catch (error) {
    console.error('Error deleting hosting options:', error)
    return NextResponse.json({ error: 'Failed to delete hosting options' }, { status: 500 })
  }
}
