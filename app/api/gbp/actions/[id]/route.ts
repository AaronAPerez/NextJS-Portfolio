/**
 * GBP Action Item Detail API Route
 * ──────────────────────────────────
 * Handles individual action item operations
 * GET: Get action item by ID
 * PUT: Update action item status/details
 * DELETE: Remove an action item
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { ActionItem, ApiResponse } from '@/types/gbp-database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/actions/[id]
 * Retrieves a single action item
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const result = await sql`SELECT * FROM action_items WHERE id = ${id}`;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Action item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0] as ActionItem,
    } as ApiResponse<ActionItem>);
  } catch (error) {
    console.error('Error fetching action item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch action item' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/actions/[id]
 * Updates an action item's status or details
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if action item exists
    const existing = await sql`SELECT id, status FROM action_items WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Action item not found' },
        { status: 404 }
      );
    }

    // Handle status transitions - set completed_date when marking complete
    let completedDate = null;
    if (body.status === 'complete' && existing[0].status !== 'complete') {
      completedDate = new Date().toISOString().split('T')[0];
    }

    const result = await sql`
      UPDATE action_items
      SET
        priority = COALESCE(${body.priority}, priority),
        category = COALESCE(${body.category}, category),
        title = COALESCE(${body.title}, title),
        description = COALESCE(${body.description}, description),
        status = COALESCE(${body.status}, status),
        due_date = COALESCE(${body.due_date}, due_date),
        completed_date = COALESCE(${completedDate}, completed_date),
        assigned_to = COALESCE(${body.assigned_to}, assigned_to),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as ActionItem,
      message: 'Action item updated successfully',
    } as ApiResponse<ActionItem>);
  } catch (error) {
    console.error('Error updating action item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update action item' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/actions/[id]
 * Removes an action item
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const existing = await sql`SELECT id, title FROM action_items WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Action item not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM action_items WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Action item "${existing[0].title}" deleted`,
    });
  } catch (error) {
    console.error('Error deleting action item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete action item' },
      { status: 500 }
    );
  }
}
