/**
 * GBP Citation Detail API Route
 * ──────────────────────────────
 * Handles individual citation operations
 * GET: Get citation by ID
 * PUT: Update citation status/details
 * DELETE: Remove a citation
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { Citation, ApiResponse } from '@/types/gbp-database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/citations/[id]
 * Retrieves a single citation
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const result = await sql`
      SELECT c.*, cd.domain_authority, cd.category as directory_category
      FROM citations c
      LEFT JOIN citation_directories cd ON c.directory_name = cd.name
      WHERE c.id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Citation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0] as Citation,
    } as ApiResponse<Citation>);
  } catch (error) {
    console.error('Error fetching citation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch citation' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/citations/[id]
 * Updates a citation's status or details
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if citation exists
    const existing = await sql`SELECT id FROM citations WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Citation not found' },
        { status: 404 }
      );
    }

    // Build update query
    const result = await sql`
      UPDATE citations
      SET
        listing_url = COALESCE(${body.listing_url}, listing_url),
        status = COALESCE(${body.status}, status),
        nap_consistent = COALESCE(${body.nap_consistent}, nap_consistent),
        submitted_date = COALESCE(${body.submitted_date}, submitted_date),
        live_date = COALESCE(${body.live_date}, live_date),
        notes = COALESCE(${body.notes}, notes),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as Citation,
      message: 'Citation updated successfully',
    } as ApiResponse<Citation>);
  } catch (error) {
    console.error('Error updating citation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update citation' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/citations/[id]
 * Removes a citation
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const existing = await sql`
      SELECT id, directory_name FROM citations WHERE id = ${id}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Citation not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM citations WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Citation for "${existing[0].directory_name}" deleted`,
    });
  } catch (error) {
    console.error('Error deleting citation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete citation' },
      { status: 500 }
    );
  }
}
