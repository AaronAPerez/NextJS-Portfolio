/**
 * GBP Leads API Route
 * ────────────────────
 * Captures leads from the free GBP audit tool
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';

/**
 * POST /api/gbp/leads
 * Captures a lead from the GBP audit form
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.contactEmail || !body.businessName) {
      return NextResponse.json(
        { success: false, error: 'Business name and email are required' },
        { status: 400 }
      );
    }

    // Check if lead already exists (by email)
    const existing = await sql`
      SELECT id FROM gbp_leads WHERE contact_email = ${body.contactEmail}
    `;

    if (existing.length > 0) {
      // Update existing lead
      await sql`
        UPDATE gbp_leads
        SET
          business_name = ${body.businessName},
          business_phone = ${body.businessPhone || null},
          business_website = ${body.businessWebsite || null},
          business_city = ${body.businessCity || null},
          business_state = ${body.businessState || null},
          business_category = ${body.businessCategory || null},
          contact_name = ${body.contactName || null},
          contact_phone = ${body.contactPhone || null},
          source = ${body.source || 'website'},
          updated_at = NOW()
        WHERE contact_email = ${body.contactEmail}
      `;

      return NextResponse.json({
        success: true,
        message: 'Lead updated',
        isNew: false,
      });
    }

    // Create new lead
    const result = await sql`
      INSERT INTO gbp_leads (
        business_name,
        business_phone,
        business_website,
        business_city,
        business_state,
        business_category,
        contact_name,
        contact_email,
        contact_phone,
        source,
        status
      ) VALUES (
        ${body.businessName},
        ${body.businessPhone || null},
        ${body.businessWebsite || null},
        ${body.businessCity || null},
        ${body.businessState || null},
        ${body.businessCategory || null},
        ${body.contactName || null},
        ${body.contactEmail},
        ${body.contactPhone || null},
        ${body.source || 'gbp_audit'},
        'new'
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Lead captured',
      leadId: result[0].id,
      isNew: true,
    }, { status: 201 });
  } catch (error) {
    console.error('Error capturing lead:', error);
    // Don't fail the audit flow if lead capture fails
    return NextResponse.json({
      success: false,
      error: 'Failed to capture lead',
    }, { status: 500 });
  }
}

/**
 * GET /api/gbp/leads
 * Lists all leads (admin only - should add auth)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let leads;
    if (status) {
      leads = await sql`
        SELECT * FROM gbp_leads
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    } else {
      leads = await sql`
        SELECT * FROM gbp_leads
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    }

    // Get summary stats
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'new') as new_leads,
        COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
        COUNT(*) FILTER (WHERE status = 'qualified') as qualified,
        COUNT(*) FILTER (WHERE status = 'converted') as converted,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as last_7_days,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as last_30_days
      FROM gbp_leads
    `;

    return NextResponse.json({
      success: true,
      data: leads,
      stats: stats[0],
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
