/**
 * GBP Post Detail API Route
 * ──────────────────────────
 * Handles individual post operations
 * GET: Get post by ID
 * PUT: Update post content/status
 * DELETE: Remove a post
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { GBPPost, ApiResponse } from '@/types/gbp-database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/posts/[id]
 * Retrieves a single post
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const result = await sql`SELECT * FROM posts WHERE id = ${id}`;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0] as GBPPost,
    } as ApiResponse<GBPPost>);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/posts/[id]
 * Updates a post's content or status
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if post exists
    const existing = await sql`SELECT id, status FROM posts WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Validate content length if provided
    if (body.content && body.content.length > 1500) {
      return NextResponse.json(
        { success: false, error: 'Content exceeds 1500 character limit' },
        { status: 400 }
      );
    }

    // Handle status transitions
    let publishedDate = null;
    if (body.status === 'published' && existing[0].status !== 'published') {
      publishedDate = new Date().toISOString();
    }

    const result = await sql`
      UPDATE posts
      SET
        post_type = COALESCE(${body.post_type}, post_type),
        title = COALESCE(${body.title}, title),
        content = COALESCE(${body.content}, content),
        call_to_action = COALESCE(${body.call_to_action}, call_to_action),
        cta_url = COALESCE(${body.cta_url}, cta_url),
        image_url = COALESCE(${body.image_url}, image_url),
        status = COALESCE(${body.status}, status),
        scheduled_date = COALESCE(${body.scheduled_date}, scheduled_date),
        published_date = COALESCE(${publishedDate}, published_date),
        views = COALESCE(${body.views}, views),
        clicks = COALESCE(${body.clicks}, clicks),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as GBPPost,
      message: 'Post updated successfully',
    } as ApiResponse<GBPPost>);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/posts/[id]
 * Removes a post
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const existing = await sql`SELECT id, title FROM posts WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM posts WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Post "${existing[0].title || 'Untitled'}" deleted`,
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
