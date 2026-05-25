/**
 * GBP Service Packages API Route
 * ────────────────────────────────
 * Handles service package retrieval
 * GET: List all active service packages
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { ServicePackage } from '@/types/gbp-database';

/**
 * GET /api/gbp/packages
 * Retrieves all active service packages
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    let packages;
    if (includeInactive) {
      packages = await sql`
        SELECT * FROM service_packages
        ORDER BY monthly_price ASC
      `;
    } else {
      packages = await sql`
        SELECT * FROM service_packages
        WHERE is_active = true
        ORDER BY monthly_price ASC
      `;
    }

    return NextResponse.json({
      success: true,
      data: packages as ServicePackage[],
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
