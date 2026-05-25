/**
 * GBP Report Detail API Route
 * ────────────────────────────
 * Handles individual report operations
 * GET: Get report by ID with all related data
 * PUT: Update report metrics/narrative
 * DELETE: Remove a report
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { GBPMonthlyReportDB, ApiResponse } from '@/types/gbp-database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/reports/[id]
 * Retrieves a single report with all related data
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const report = await sql`
      SELECT r.*, c.legal_name as client_business_name, c.website_url as client_website
      FROM monthly_reports r
      JOIN clients c ON r.client_id = c.id
      WHERE r.id = ${id}
    `;

    if (report.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    // Get keywords with rankings as of report date
    const keywords = await sql`
      SELECT
        k.keyword,
        k.is_primary,
        kr.rank_position as current_rank,
        kr.in_local_pack,
        (
          SELECT kr2.rank_position
          FROM keyword_rankings kr2
          WHERE kr2.keyword_id = k.id
          AND kr2.tracked_date < ${report[0].report_date}
          ORDER BY kr2.tracked_date DESC
          LIMIT 1
        ) as previous_rank
      FROM keywords k
      LEFT JOIN LATERAL (
        SELECT * FROM keyword_rankings
        WHERE keyword_id = k.id
        AND tracked_date <= ${report[0].report_date}
        ORDER BY tracked_date DESC
        LIMIT 1
      ) kr ON true
      WHERE k.client_id = ${report[0].client_id}
      ORDER BY k.is_primary DESC, k.keyword
    `;

    // Get action items
    const actionItems = await sql`
      SELECT * FROM action_items
      WHERE report_id = ${id}
      ORDER BY
        CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
        created_at
    `;

    // Get goals
    const goals = await sql`
      SELECT * FROM monthly_goals
      WHERE report_id = ${id}
    `;

    // Get top citations
    const citations = await sql`
      SELECT directory_name
      FROM citations
      WHERE client_id = ${report[0].client_id}
      AND status = 'live'
      ORDER BY submitted_date DESC
      LIMIT 10
    `;

    return NextResponse.json({
      success: true,
      data: {
        ...report[0],
        keywords,
        actionItems,
        goals,
        topDirectories: citations.map(c => c.directory_name),
      },
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/reports/[id]
 * Updates report metrics and narrative
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if report exists
    const existing = await sql`SELECT id FROM monthly_reports WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    const result = await sql`
      UPDATE monthly_reports
      SET
        total_views = COALESCE(${body.total_views}, total_views),
        search_views = COALESCE(${body.search_views}, search_views),
        maps_views = COALESCE(${body.maps_views}, maps_views),
        views_change = COALESCE(${body.views_change}, views_change),
        website_clicks = COALESCE(${body.website_clicks}, website_clicks),
        website_clicks_change = COALESCE(${body.website_clicks_change}, website_clicks_change),
        phone_calls = COALESCE(${body.phone_calls}, phone_calls),
        phone_calls_change = COALESCE(${body.phone_calls_change}, phone_calls_change),
        direction_requests = COALESCE(${body.direction_requests}, direction_requests),
        direction_requests_change = COALESCE(${body.direction_requests_change}, direction_requests_change),
        photo_views = COALESCE(${body.photo_views}, photo_views),
        photo_views_change = COALESCE(${body.photo_views_change}, photo_views_change),
        photos_uploaded = COALESCE(${body.photos_uploaded}, photos_uploaded),
        posts_published = COALESCE(${body.posts_published}, posts_published),
        post_views = COALESCE(${body.post_views}, post_views),
        total_reviews = COALESCE(${body.total_reviews}, total_reviews),
        new_reviews = COALESCE(${body.new_reviews}, new_reviews),
        average_rating = COALESCE(${body.average_rating}, average_rating),
        rating_change = COALESCE(${body.rating_change}, rating_change),
        reviews_responded = COALESCE(${body.reviews_responded}, reviews_responded),
        response_rate = COALESCE(${body.response_rate}, response_rate),
        total_citations = COALESCE(${body.total_citations}, total_citations),
        new_citations = COALESCE(${body.new_citations}, new_citations),
        executive_summary = COALESCE(${body.executive_summary}, executive_summary),
        highlight_of_month = COALESCE(${body.highlight_of_month}, highlight_of_month),
        next_month_focus = COALESCE(${body.next_month_focus}, next_month_focus),
        prepared_by = COALESCE(${body.prepared_by}, prepared_by),
        prepared_by_email = COALESCE(${body.prepared_by_email}, prepared_by_email),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as GBPMonthlyReportDB,
      message: 'Report updated successfully',
    } as ApiResponse<GBPMonthlyReportDB>);
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update report' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/reports/[id]
 * Removes a report and its associated goals/action items
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const existing = await sql`
      SELECT id, report_month FROM monthly_reports WHERE id = ${id}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    // Delete related goals and action items first
    await sql`DELETE FROM monthly_goals WHERE report_id = ${id}`;
    await sql`UPDATE action_items SET report_id = NULL WHERE report_id = ${id}`;

    // Delete the report
    await sql`DELETE FROM monthly_reports WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Report for "${existing[0].report_month}" deleted`,
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
