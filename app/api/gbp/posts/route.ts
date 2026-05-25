/**
 * GBP Posts API Route
 * ────────────────────
 * Handles GBP post creation, scheduling, and management
 * GET: List posts for a client with filtering
 * POST: Create a new post (draft or scheduled)
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { GBPPost, ApiResponse } from '@/types/gbp-database';

/**
 * GET /api/gbp/posts
 * Retrieves posts for a client with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'client_id is required' },
        { status: 400 }
      );
    }

    // Use conditional queries based on status filter
    let posts;
    if (status) {
      posts = await sql`
        SELECT * FROM posts
        WHERE client_id = ${clientId} AND status = ${status}
        ORDER BY
          CASE status
            WHEN 'scheduled' THEN 1
            WHEN 'draft' THEN 2
            WHEN 'published' THEN 3
            ELSE 4
          END,
          scheduled_date ASC,
          created_at DESC
        LIMIT ${limit}
      `;
    } else {
      posts = await sql`
        SELECT * FROM posts
        WHERE client_id = ${clientId}
        ORDER BY
          CASE status
            WHEN 'scheduled' THEN 1
            WHEN 'draft' THEN 2
            WHEN 'published' THEN 3
            ELSE 4
          END,
          scheduled_date ASC,
          created_at DESC
        LIMIT ${limit}
      `;
    }

    // Get summary stats
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'draft') as drafts,
        COUNT(*) FILTER (WHERE status = 'scheduled') as scheduled,
        COUNT(*) FILTER (WHERE status = 'published') as published,
        SUM(views) as total_views,
        SUM(clicks) as total_clicks
      FROM posts
      WHERE client_id = ${clientId}
    `;

    return NextResponse.json({
      success: true,
      data: posts as GBPPost[],
      stats: stats[0],
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/posts
 * Creates a new post (can be draft, scheduled, or published)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !body.content) {
      return NextResponse.json(
        { success: false, error: 'client_id and content are required' },
        { status: 400 }
      );
    }

    // Validate content length (GBP limit is 1500 characters)
    if (body.content.length > 1500) {
      return NextResponse.json(
        { success: false, error: 'Content exceeds 1500 character limit' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO posts (
        client_id,
        post_type,
        title,
        content,
        call_to_action,
        cta_url,
        image_url,
        status,
        scheduled_date,
        published_date
      ) VALUES (
        ${body.client_id},
        ${body.post_type || 'update'},
        ${body.title || null},
        ${body.content},
        ${body.call_to_action || null},
        ${body.cta_url || null},
        ${body.image_url || null},
        ${body.status || 'draft'},
        ${body.scheduled_date || null},
        ${body.status === 'published' ? new Date().toISOString() : null}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as GBPPost,
      message: 'Post created successfully',
    } as ApiResponse<GBPPost>, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
