/**
 * GBP Citations API Route
 * ────────────────────────
 * Handles citation tracking and management
 * GET: List citations for a client or all citation directories
 * POST: Create a new citation entry
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { Citation, CitationDirectory, ApiResponse } from '@/types/gbp-database';

/**
 * GET /api/gbp/citations
 * Retrieves citations or citation directories
 * Query params:
 *   - client_id: Filter by client
 *   - directories: If "true", returns available directories instead
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const getDirectories = searchParams.get('directories') === 'true';

    // Return available directories if requested
    if (getDirectories) {
      const directories = await sql`
        SELECT * FROM citation_directories
        ORDER BY domain_authority DESC NULLS LAST, name ASC
      `;

      return NextResponse.json({
        success: true,
        data: directories as CitationDirectory[],
      });
    }

    // Return client citations
    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'client_id is required' },
        { status: 400 }
      );
    }

    const citations = await sql`
      SELECT c.*, cd.domain_authority, cd.category as directory_category
      FROM citations c
      LEFT JOIN citation_directories cd ON c.directory_name = cd.name
      WHERE c.client_id = ${clientId}
      ORDER BY cd.domain_authority DESC NULLS LAST, c.submitted_date DESC
    `;

    // Get summary stats
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'live') as live,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'submitted') as submitted,
        COUNT(*) FILTER (WHERE nap_consistent = false) as inconsistent
      FROM citations
      WHERE client_id = ${clientId}
    `;

    return NextResponse.json({
      success: true,
      data: citations as Citation[],
      stats: stats[0],
    });
  } catch (error) {
    console.error('Error fetching citations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch citations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/citations
 * Creates a new citation entry for a client
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !body.directory_name) {
      return NextResponse.json(
        { success: false, error: 'client_id and directory_name are required' },
        { status: 400 }
      );
    }

    // Get directory URL if not provided
    let directoryUrl = body.directory_url;
    if (!directoryUrl) {
      const directory = await sql`
        SELECT url FROM citation_directories WHERE name = ${body.directory_name}
      `;
      directoryUrl = directory[0]?.url || null;
    }

    const result = await sql`
      INSERT INTO citations (
        client_id,
        directory_name,
        directory_url,
        listing_url,
        status,
        nap_consistent,
        submitted_date,
        live_date,
        notes
      ) VALUES (
        ${body.client_id},
        ${body.directory_name},
        ${directoryUrl},
        ${body.listing_url || null},
        ${body.status || 'pending'},
        ${body.nap_consistent !== false},
        ${body.submitted_date || null},
        ${body.live_date || null},
        ${body.notes || null}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as Citation,
      message: 'Citation created successfully',
    } as ApiResponse<Citation>, { status: 201 });
  } catch (error) {
    console.error('Error creating citation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create citation' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/citations
 * Bulk create citations from selected directories
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.client_id || !Array.isArray(body.directories)) {
      return NextResponse.json(
        { success: false, error: 'client_id and directories array are required' },
        { status: 400 }
      );
    }

    const created: Citation[] = [];

    for (const directoryName of body.directories) {
      // Check if citation already exists for this directory
      const existing = await sql`
        SELECT id FROM citations
        WHERE client_id = ${body.client_id} AND directory_name = ${directoryName}
      `;

      if (existing.length === 0) {
        // Get directory info
        const directory = await sql`
          SELECT name, url FROM citation_directories WHERE name = ${directoryName}
        `;

        if (directory.length > 0) {
          const result = await sql`
            INSERT INTO citations (
              client_id,
              directory_name,
              directory_url,
              status,
              nap_consistent
            ) VALUES (
              ${body.client_id},
              ${directory[0].name},
              ${directory[0].url},
              'pending',
              true
            )
            RETURNING *
          `;
          created.push(result[0] as Citation);
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: created,
      message: `${created.length} citations created`,
    });
  } catch (error) {
    console.error('Error bulk creating citations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create citations' },
      { status: 500 }
    );
  }
}
