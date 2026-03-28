/**
 * GBP Lead Detail API Route
 * ──────────────────────────
 * Handles individual lead operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/leads/[id]
 * Retrieves a single lead
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const result = await sql`
      SELECT * FROM gbp_leads WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/leads/[id]
 * Updates a lead's information
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if lead exists
    const existing = await sql`SELECT id FROM gbp_leads WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update lead with COALESCE to preserve existing values
    const result = await sql`
      UPDATE gbp_leads SET
        business_name = COALESCE(${body.business_name ?? null}, business_name),
        business_phone = COALESCE(${body.business_phone ?? null}, business_phone),
        business_website = COALESCE(${body.business_website ?? null}, business_website),
        business_city = COALESCE(${body.business_city ?? null}, business_city),
        business_state = COALESCE(${body.business_state ?? null}, business_state),
        business_category = COALESCE(${body.business_category ?? null}, business_category),
        contact_name = COALESCE(${body.contact_name ?? null}, contact_name),
        contact_email = COALESCE(${body.contact_email ?? null}, contact_email),
        contact_phone = COALESCE(${body.contact_phone ?? null}, contact_phone),
        source = COALESCE(${body.source ?? null}, source),
        status = COALESCE(${body.status ?? null}, status),
        notes = COALESCE(${body.notes ?? null}, notes),
        audit_score = COALESCE(${body.audit_score ?? null}, audit_score),
        audit_grade = COALESCE(${body.audit_grade ?? null}, audit_grade),
        last_contacted_at = COALESCE(${body.last_contacted_at ?? null}, last_contacted_at),
        next_follow_up_at = COALESCE(${body.next_follow_up_at ?? null}, next_follow_up_at),
        assigned_to = COALESCE(${body.assigned_to ?? null}, assigned_to),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Lead updated successfully',
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/leads/[id]
 * Deletes a lead
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const existing = await sql`
      SELECT id, business_name FROM gbp_leads WHERE id = ${id}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM gbp_leads WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Lead for "${existing[0].business_name}" deleted`,
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
