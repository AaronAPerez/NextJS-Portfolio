/**
 * GBP Action Items API Route
 * ───────────────────────────
 * Handles task and action item management
 * GET: List action items for a client
 * POST: Create a new action item
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { ActionItem, ApiResponse } from '@/types/gbp-database';

/**
 * GET /api/gbp/actions
 * Retrieves action items for a client with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'client_id is required' },
        { status: 400 }
      );
    }

    // Base query with all possible filters using conditional WHERE clauses
    // We use (filter IS NULL OR column = filter) pattern to handle optional filters
    const actionItems = await sql`
      SELECT * FROM action_items
      WHERE client_id = ${clientId}
        AND (${status ?? null}::TEXT IS NULL OR status = ${status ?? null})
        AND (${priority ?? null}::TEXT IS NULL OR priority = ${priority ?? null})
        AND (${category ?? null}::TEXT IS NULL OR category = ${category ?? null})
      ORDER BY
        CASE status WHEN 'in_progress' THEN 1 WHEN 'pending' THEN 2 ELSE 3 END,
        CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
        due_date ASC NULLS LAST,
        created_at DESC
    `;

    // Get summary stats
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'complete') as complete,
        COUNT(*) FILTER (WHERE priority = 'high' AND status != 'complete') as high_priority_pending,
        COUNT(*) FILTER (WHERE due_date < CURRENT_DATE AND status != 'complete') as overdue
      FROM action_items
      WHERE client_id = ${clientId}
    `;

    return NextResponse.json({
      success: true,
      data: actionItems as ActionItem[],
      stats: stats[0],
    });
  } catch (error) {
    console.error('Error fetching action items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch action items' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/actions
 * Creates a new action item
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !body.title) {
      return NextResponse.json(
        { success: false, error: 'client_id and title are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO action_items (
        client_id,
        report_id,
        priority,
        category,
        title,
        description,
        status,
        due_date,
        assigned_to
      ) VALUES (
        ${body.client_id},
        ${body.report_id || null},
        ${body.priority || 'medium'},
        ${body.category || 'profile'},
        ${body.title},
        ${body.description || null},
        ${body.status || 'pending'},
        ${body.due_date || null},
        ${body.assigned_to || null}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as ActionItem,
      message: 'Action item created successfully',
    } as ApiResponse<ActionItem>, { status: 201 });
  } catch (error) {
    console.error('Error creating action item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create action item' },
      { status: 500 }
    );
  }
}
