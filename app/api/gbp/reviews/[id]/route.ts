/**
 * GBP Review Detail API Route
 * ────────────────────────────
 * Handles individual review operations
 * GET: Get review by ID
 * PUT: Update review (add response)
 * DELETE: Remove a review
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { Review, ApiResponse } from '@/types/gbp-database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/reviews/[id]
 * Retrieves a single review
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const result = await sql`SELECT * FROM reviews WHERE id = ${id}`;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0] as Review,
    } as ApiResponse<Review>);
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/reviews/[id]
 * Updates a review (typically to add a response)
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if review exists
    const existing = await sql`SELECT id FROM reviews WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // If adding a response, mark as responded
    const responded = body.response_text ? true : body.responded;
    const responseDate = body.response_text && !body.response_date
      ? new Date().toISOString().split('T')[0]
      : body.response_date;

    const result = await sql`
      UPDATE reviews
      SET
        reviewer_name = COALESCE(${body.reviewer_name}, reviewer_name),
        rating = COALESCE(${body.rating}, rating),
        review_text = COALESCE(${body.review_text}, review_text),
        sentiment = COALESCE(${body.sentiment}, sentiment),
        review_date = COALESCE(${body.review_date}, review_date),
        responded = COALESCE(${responded}, responded),
        response_text = COALESCE(${body.response_text}, response_text),
        response_date = COALESCE(${responseDate}, response_date),
        platform = COALESCE(${body.platform}, platform),
        review_url = COALESCE(${body.review_url}, review_url)
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as Review,
      message: 'Review updated successfully',
    } as ApiResponse<Review>);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/reviews/[id]
 * Removes a review
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const existing = await sql`
      SELECT id, reviewer_name, rating FROM reviews WHERE id = ${id}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM reviews WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Review from "${existing[0].reviewer_name || 'Anonymous'}" deleted`,
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
