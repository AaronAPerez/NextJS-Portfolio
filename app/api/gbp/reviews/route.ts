/**
 * GBP Reviews API Route
 * ──────────────────────
 * Handles review tracking and response management
 * GET: List reviews for a client with sentiment analysis
 * POST: Add a new review entry
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { Review, ApiResponse } from '@/types/gbp-database';

/**
 * Determine sentiment based on rating
 */
function determineSentiment(rating: number): 'positive' | 'neutral' | 'negative' {
  if (rating >= 4) return 'positive';
  if (rating >= 3) return 'neutral';
  return 'negative';
}

/**
 * GET /api/gbp/reviews
 * Retrieves reviews for a client with stats
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const responded = searchParams.get('responded');
    const rating = searchParams.get('rating');
    const limit = parseInt(searchParams.get('limit') || '100');

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'client_id is required' },
        { status: 400 }
      );
    }

    // Use conditional queries based on filters
    let reviews;
    const respondedFilter = responded !== null ? responded === 'true' : null;
    const ratingFilter = rating ? parseInt(rating) : null;

    if (respondedFilter !== null && ratingFilter !== null) {
      reviews = await sql`
        SELECT * FROM reviews
        WHERE client_id = ${clientId} AND responded = ${respondedFilter} AND rating = ${ratingFilter}
        ORDER BY review_date DESC NULLS LAST, created_at DESC
        LIMIT ${limit}
      `;
    } else if (respondedFilter !== null) {
      reviews = await sql`
        SELECT * FROM reviews
        WHERE client_id = ${clientId} AND responded = ${respondedFilter}
        ORDER BY review_date DESC NULLS LAST, created_at DESC
        LIMIT ${limit}
      `;
    } else if (ratingFilter !== null) {
      reviews = await sql`
        SELECT * FROM reviews
        WHERE client_id = ${clientId} AND rating = ${ratingFilter}
        ORDER BY review_date DESC NULLS LAST, created_at DESC
        LIMIT ${limit}
      `;
    } else {
      reviews = await sql`
        SELECT * FROM reviews
        WHERE client_id = ${clientId}
        ORDER BY review_date DESC NULLS LAST, created_at DESC
        LIMIT ${limit}
      `;
    }

    // Get comprehensive stats
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        AVG(rating)::DECIMAL(2,1) as average_rating,
        COUNT(*) FILTER (WHERE rating = 5) as five_star,
        COUNT(*) FILTER (WHERE rating = 4) as four_star,
        COUNT(*) FILTER (WHERE rating = 3) as three_star,
        COUNT(*) FILTER (WHERE rating = 2) as two_star,
        COUNT(*) FILTER (WHERE rating = 1) as one_star,
        COUNT(*) FILTER (WHERE responded = true) as responded_count,
        COUNT(*) FILTER (WHERE responded = false) as pending_response,
        COUNT(*) FILTER (WHERE sentiment = 'positive') as positive,
        COUNT(*) FILTER (WHERE sentiment = 'neutral') as neutral,
        COUNT(*) FILTER (WHERE sentiment = 'negative') as negative,
        COUNT(*) FILTER (WHERE review_date >= CURRENT_DATE - INTERVAL '30 days') as last_30_days
      FROM reviews
      WHERE client_id = ${clientId}
    `;

    // Calculate response rate
    const total = parseInt(stats[0]?.total || '0');
    const respondedCount = parseInt(stats[0]?.responded_count || '0');
    const responseRate = total > 0 ? Math.round((respondedCount / total) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: reviews as Review[],
      stats: {
        ...stats[0],
        response_rate: responseRate,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/reviews
 * Creates a new review entry
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !body.rating) {
      return NextResponse.json(
        { success: false, error: 'client_id and rating are required' },
        { status: 400 }
      );
    }

    // Validate rating range
    const rating = parseInt(body.rating);
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Determine sentiment
    const sentiment = body.sentiment || determineSentiment(rating);

    const result = await sql`
      INSERT INTO reviews (
        client_id,
        reviewer_name,
        rating,
        review_text,
        sentiment,
        review_date,
        responded,
        response_text,
        response_date,
        platform,
        review_url
      ) VALUES (
        ${body.client_id},
        ${body.reviewer_name || null},
        ${rating},
        ${body.review_text || null},
        ${sentiment},
        ${body.review_date || new Date().toISOString().split('T')[0]},
        ${body.responded || false},
        ${body.response_text || null},
        ${body.response_date || null},
        ${body.platform || 'google'},
        ${body.review_url || null}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as Review,
      message: 'Review added successfully',
    } as ApiResponse<Review>, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/reviews
 * Bulk import reviews (useful for initial setup)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.client_id || !Array.isArray(body.reviews)) {
      return NextResponse.json(
        { success: false, error: 'client_id and reviews array are required' },
        { status: 400 }
      );
    }

    const created = [];

    for (const review of body.reviews) {
      const rating = parseInt(review.rating);
      if (rating < 1 || rating > 5) continue;

      const sentiment = review.sentiment || determineSentiment(rating);

      const result = await sql`
        INSERT INTO reviews (
          client_id,
          reviewer_name,
          rating,
          review_text,
          sentiment,
          review_date,
          responded,
          response_text,
          response_date,
          platform,
          review_url
        ) VALUES (
          ${body.client_id},
          ${review.reviewer_name || null},
          ${rating},
          ${review.review_text || null},
          ${sentiment},
          ${review.review_date || new Date().toISOString().split('T')[0]},
          ${review.responded || false},
          ${review.response_text || null},
          ${review.response_date || null},
          ${review.platform || 'google'},
          ${review.review_url || null}
        )
        RETURNING *
      `;
      created.push(result[0]);
    }

    return NextResponse.json({
      success: true,
      data: created,
      message: `${created.length} reviews imported`,
    });
  } catch (error) {
    console.error('Error bulk importing reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import reviews' },
      { status: 500 }
    );
  }
}
