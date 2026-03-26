/**
 * GBP Reports API Route
 * ──────────────────────
 * Handles monthly report generation and storage
 * GET: List reports for a client
 * POST: Create a new monthly report
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { GBPMonthlyReportDB, ApiResponse } from '@/types/gbp-database';

/**
 * GET /api/gbp/reports
 * Retrieves reports for a client
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const reportMonth = searchParams.get('month');

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'client_id is required' },
        { status: 400 }
      );
    }

    // If specific month requested, return that report with related data
    if (reportMonth) {
      const report = await sql`
        SELECT * FROM monthly_reports
        WHERE client_id = ${clientId} AND report_month = ${reportMonth}
      `;

      if (report.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Report not found' },
          { status: 404 }
        );
      }

      // Get keywords for this report
      const keywords = await sql`
        SELECT
          k.keyword,
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
        WHERE k.client_id = ${clientId}
        ORDER BY k.is_primary DESC, k.keyword
      `;

      // Get action items for this report
      const actionItems = await sql`
        SELECT * FROM action_items
        WHERE report_id = ${report[0].id}
        ORDER BY
          CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
          created_at
      `;

      // Get goals for this report
      const goals = await sql`
        SELECT * FROM monthly_goals
        WHERE report_id = ${report[0].id}
      `;

      // Get citations summary
      const citations = await sql`
        SELECT directory_name
        FROM citations
        WHERE client_id = ${clientId} AND status = 'live'
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
    }

    // List all reports for client
    const reports = await sql`
      SELECT * FROM monthly_reports
      WHERE client_id = ${clientId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      data: reports as GBPMonthlyReportDB[],
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/reports
 * Creates a new monthly report
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !body.report_month) {
      return NextResponse.json(
        { success: false, error: 'client_id and report_month are required' },
        { status: 400 }
      );
    }

    // Check for duplicate report
    const existing = await sql`
      SELECT id FROM monthly_reports
      WHERE client_id = ${body.client_id} AND report_month = ${body.report_month}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Report already exists for this month' },
        { status: 409 }
      );
    }

    // Determine campaign month (count of reports + 1)
    const countResult = await sql`
      SELECT COUNT(*) as count FROM monthly_reports
      WHERE client_id = ${body.client_id}
    `;
    const campaignMonth = body.campaign_month || (parseInt(countResult[0].count) + 1);

    const result = await sql`
      INSERT INTO monthly_reports (
        client_id,
        report_month,
        campaign_month,
        total_views,
        search_views,
        maps_views,
        views_change,
        website_clicks,
        website_clicks_change,
        phone_calls,
        phone_calls_change,
        direction_requests,
        direction_requests_change,
        photo_views,
        photo_views_change,
        photos_uploaded,
        posts_published,
        post_views,
        total_reviews,
        new_reviews,
        average_rating,
        rating_change,
        reviews_responded,
        response_rate,
        total_citations,
        new_citations,
        executive_summary,
        highlight_of_month,
        next_month_focus,
        prepared_by,
        prepared_by_email,
        report_date
      ) VALUES (
        ${body.client_id},
        ${body.report_month},
        ${campaignMonth},
        ${body.total_views || 0},
        ${body.search_views || 0},
        ${body.maps_views || 0},
        ${body.views_change || 0},
        ${body.website_clicks || 0},
        ${body.website_clicks_change || 0},
        ${body.phone_calls || 0},
        ${body.phone_calls_change || 0},
        ${body.direction_requests || 0},
        ${body.direction_requests_change || 0},
        ${body.photo_views || 0},
        ${body.photo_views_change || 0},
        ${body.photos_uploaded || 0},
        ${body.posts_published || 0},
        ${body.post_views || 0},
        ${body.total_reviews || 0},
        ${body.new_reviews || 0},
        ${body.average_rating || 0},
        ${body.rating_change || 0},
        ${body.reviews_responded || 0},
        ${body.response_rate || 0},
        ${body.total_citations || 0},
        ${body.new_citations || 0},
        ${body.executive_summary || null},
        ${body.highlight_of_month || null},
        ${body.next_month_focus || null},
        ${body.prepared_by || 'AP Designs'},
        ${body.prepared_by_email || null},
        ${body.report_date || new Date().toISOString().split('T')[0]}
      )
      RETURNING *
    `;

    const report = result[0] as GBPMonthlyReportDB;

    // Create action items if provided
    if (Array.isArray(body.action_items)) {
      for (const item of body.action_items) {
        await sql`
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
            ${report.id},
            ${item.priority || 'medium'},
            ${item.category || 'profile'},
            ${item.title},
            ${item.description || null},
            ${item.status || 'pending'},
            ${item.due_date || null},
            ${item.assigned_to || null}
          )
        `;
      }
    }

    // Create goals if provided
    if (Array.isArray(body.goals)) {
      for (const goal of body.goals) {
        await sql`
          INSERT INTO monthly_goals (
            client_id,
            report_id,
            metric,
            target_value,
            actual_value,
            unit
          ) VALUES (
            ${body.client_id},
            ${report.id},
            ${goal.metric},
            ${goal.target_value || 0},
            ${goal.actual_value || 0},
            ${goal.unit || null}
          )
        `;
      }
    }

    return NextResponse.json({
      success: true,
      data: report,
      message: `Report for ${body.report_month} created successfully`,
    } as ApiResponse<GBPMonthlyReportDB>, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    );
  }
}
