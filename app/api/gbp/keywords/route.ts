/**
 * GBP Keywords API Route
 * ───────────────────────
 * Handles keyword tracking and rank history
 * GET: List keywords for a client with latest rankings
 * POST: Create a new keyword to track
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { Keyword, KeywordPerformance, ApiResponse } from '@/types/gbp-database';

/**
 * GET /api/gbp/keywords
 * Retrieves keywords with their performance data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const includeHistory = searchParams.get('history') === 'true';

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'client_id is required' },
        { status: 400 }
      );
    }

    // Get keywords with latest ranking
    const keywords = await sql`
      SELECT
        k.*,
        kr.rank_position as current_rank,
        kr.in_local_pack,
        kr.local_pack_position,
        kr.tracked_date as last_tracked,
        (
          SELECT kr2.rank_position
          FROM keyword_rankings kr2
          WHERE kr2.keyword_id = k.id
          ORDER BY kr2.tracked_date DESC
          OFFSET 1 LIMIT 1
        ) as previous_rank
      FROM keywords k
      LEFT JOIN LATERAL (
        SELECT * FROM keyword_rankings
        WHERE keyword_id = k.id
        ORDER BY tracked_date DESC
        LIMIT 1
      ) kr ON true
      WHERE k.client_id = ${clientId}
      ORDER BY k.is_primary DESC, k.keyword ASC
    `;

    // Optionally get ranking history
    let history = null;
    if (includeHistory) {
      history = await sql`
        SELECT
          k.keyword,
          kr.rank_position,
          kr.in_local_pack,
          kr.tracked_date
        FROM keyword_rankings kr
        JOIN keywords k ON kr.keyword_id = k.id
        WHERE k.client_id = ${clientId}
        ORDER BY k.keyword, kr.tracked_date DESC
      `;
    }

    // Get summary stats
    const stats = await sql`
      SELECT
        COUNT(*) as total_keywords,
        COUNT(*) FILTER (WHERE k.is_primary) as primary_keywords,
        COUNT(*) FILTER (WHERE kr.in_local_pack) as in_local_pack,
        AVG(kr.rank_position)::DECIMAL(4,1) as avg_position
      FROM keywords k
      LEFT JOIN LATERAL (
        SELECT * FROM keyword_rankings
        WHERE keyword_id = k.id
        ORDER BY tracked_date DESC
        LIMIT 1
      ) kr ON true
      WHERE k.client_id = ${clientId}
    `;

    return NextResponse.json({
      success: true,
      data: keywords,
      history: history,
      stats: stats[0],
    });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch keywords' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/keywords
 * Creates a new keyword to track
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !body.keyword) {
      return NextResponse.json(
        { success: false, error: 'client_id and keyword are required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = await sql`
      SELECT id FROM keywords
      WHERE client_id = ${body.client_id}
      AND LOWER(keyword) = LOWER(${body.keyword})
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Keyword already exists for this client' },
        { status: 409 }
      );
    }

    const result = await sql`
      INSERT INTO keywords (
        client_id,
        keyword,
        search_volume,
        difficulty_score,
        is_primary,
        target_location
      ) VALUES (
        ${body.client_id},
        ${body.keyword},
        ${body.search_volume || null},
        ${body.difficulty_score || null},
        ${body.is_primary || false},
        ${body.target_location || null}
      )
      RETURNING *
    `;

    // Optionally add initial ranking if provided
    if (body.initial_rank !== undefined) {
      await sql`
        INSERT INTO keyword_rankings (
          keyword_id,
          client_id,
          rank_position,
          in_local_pack,
          local_pack_position
        ) VALUES (
          ${result[0].id},
          ${body.client_id},
          ${body.initial_rank},
          ${body.in_local_pack || false},
          ${body.local_pack_position || null}
        )
      `;
    }

    return NextResponse.json({
      success: true,
      data: result[0] as Keyword,
      message: 'Keyword created successfully',
    } as ApiResponse<Keyword>, { status: 201 });
  } catch (error) {
    console.error('Error creating keyword:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create keyword' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/keywords
 * Record new rankings for multiple keywords (batch update)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !Array.isArray(body.rankings)) {
      return NextResponse.json(
        { success: false, error: 'client_id and rankings array are required' },
        { status: 400 }
      );
    }

    const created = [];

    for (const ranking of body.rankings) {
      if (!ranking.keyword_id) continue;

      const result = await sql`
        INSERT INTO keyword_rankings (
          keyword_id,
          client_id,
          rank_position,
          in_local_pack,
          local_pack_position,
          tracked_date
        ) VALUES (
          ${ranking.keyword_id},
          ${body.client_id},
          ${ranking.rank_position || null},
          ${ranking.in_local_pack || false},
          ${ranking.local_pack_position || null},
          ${ranking.tracked_date || new Date().toISOString().split('T')[0]}
        )
        RETURNING *
      `;
      created.push(result[0]);
    }

    return NextResponse.json({
      success: true,
      data: created,
      message: `${created.length} rankings recorded`,
    });
  } catch (error) {
    console.error('Error recording rankings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record rankings' },
      { status: 500 }
    );
  }
}
