/**
 * GBP Clients API Route
 * ──────────────────────
 * Handles CRUD operations for GBP optimization clients
 * GET: List all clients with dashboard stats
 * POST: Create a new client from intake form
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { GBPClient, ClientDashboardStats, ApiResponse } from '@/types/gbp-database';

/**
 * GET /api/gbp/clients
 * Retrieves all clients with their dashboard statistics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Use tagged template literals for all queries (required by @neondatabase/serverless)
    let clients: ClientDashboardStats[];
    let countResult;

    if (status) {
      // Filter by status using tagged template
      clients = await sql`
        SELECT * FROM client_dashboard_stats
        WHERE status = ${status}
        ORDER BY legal_name ASC
        LIMIT ${limit} OFFSET ${offset}
      ` as ClientDashboardStats[];

      countResult = await sql`
        SELECT COUNT(*) as total FROM clients WHERE status = ${status}
      `;
    } else {
      // Get all clients using tagged template
      clients = await sql`
        SELECT * FROM client_dashboard_stats
        ORDER BY legal_name ASC
        LIMIT ${limit} OFFSET ${offset}
      ` as ClientDashboardStats[];

      countResult = await sql`
        SELECT COUNT(*) as total FROM clients
      `;
    }

    const total = parseInt(countResult[0]?.total || '0');

    return NextResponse.json({
      success: true,
      data: clients,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gbp/clients
 * Creates a new GBP client from intake form data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.legal_name) {
      return NextResponse.json(
        { success: false, error: 'Business name (legal_name) is required' },
        { status: 400 }
      );
    }

    // Build the business hours JSON
    const businessHours = {
      monday: body.monday_hours || '9:00 AM - 5:00 PM',
      tuesday: body.tuesday_hours || '9:00 AM - 5:00 PM',
      wednesday: body.wednesday_hours || '9:00 AM - 5:00 PM',
      thursday: body.thursday_hours || '9:00 AM - 5:00 PM',
      friday: body.friday_hours || '9:00 AM - 5:00 PM',
      saturday: body.saturday_hours || 'Closed',
      sunday: body.sunday_hours || 'Closed',
    };

    // Insert the new client
    const result = await sql`
      INSERT INTO clients (
        legal_name,
        primary_category,
        secondary_categories,
        address,
        city,
        state,
        zip,
        primary_phone,
        website_url,
        year_established,
        service_areas,
        business_hours,
        business_description,
        services_list,
        service_descriptions,
        target_keywords,
        top_faqs,
        unique_selling_prop,
        current_promotions,
        has_logo,
        has_cover_photo,
        photo_count,
        has_geo_tagged_photos,
        has_team_photo,
        has_video,
        has_before_after_photos,
        photo_notes,
        gbp_access,
        ga4_access,
        search_console_access,
        cms_access,
        social_media_access,
        citation_logins,
        access_notes,
        competitor_1_name,
        competitor_1_url,
        competitor_2_name,
        competitor_2_url,
        competitor_3_name,
        competitor_3_url,
        target_geographies,
        customer_type,
        seasonal_patterns,
        previous_seo_work,
        preferred_post_topics,
        monthly_photo_delivery,
        review_request_method,
        reporting_cadence,
        point_of_contact,
        point_of_contact_email,
        point_of_contact_phone,
        additional_notes,
        status,
        monthly_fee
      ) VALUES (
        ${body.legal_name},
        ${body.primary_category || null},
        ${body.secondary_categories || null},
        ${body.address || null},
        ${body.city || null},
        ${body.state || null},
        ${body.zip || null},
        ${body.primary_phone || null},
        ${body.website_url || null},
        ${body.year_established ? parseInt(body.year_established) : null},
        ${body.service_areas || null},
        ${JSON.stringify(businessHours)},
        ${body.business_description || null},
        ${body.services_list || null},
        ${body.service_descriptions || null},
        ${body.target_keywords || null},
        ${body.top_faqs || null},
        ${body.unique_selling_prop || null},
        ${body.current_promotions || null},
        ${body.has_logo || false},
        ${body.has_cover_photo || false},
        ${body.photo_count ? parseInt(body.photo_count) : 0},
        ${body.has_geo_tagged_photos || false},
        ${body.has_team_photo || false},
        ${body.has_video || false},
        ${body.has_before_after_photos || false},
        ${body.photo_notes || null},
        ${body.gbp_access || null},
        ${body.ga4_access || false},
        ${body.search_console_access || false},
        ${body.cms_access || false},
        ${body.social_media_access || false},
        ${body.citation_logins || null},
        ${body.access_notes || null},
        ${body.competitor_1_name || null},
        ${body.competitor_1_url || null},
        ${body.competitor_2_name || null},
        ${body.competitor_2_url || null},
        ${body.competitor_3_name || null},
        ${body.competitor_3_url || null},
        ${body.target_geographies || null},
        ${body.customer_type || null},
        ${body.seasonal_patterns || null},
        ${body.previous_seo_work || null},
        ${body.preferred_post_topics || null},
        ${body.monthly_photo_delivery || false},
        ${body.review_request_method || null},
        ${body.reporting_cadence || null},
        ${body.point_of_contact || null},
        ${body.point_of_contact_email || null},
        ${body.point_of_contact_phone || null},
        ${body.additional_notes || null},
        ${body.status || 'lead'},
        ${body.monthly_fee ? parseFloat(body.monthly_fee) : null}
      )
      RETURNING *
    `;

    const client = result[0] as GBPClient;

    return NextResponse.json({
      success: true,
      data: client,
      message: 'Client created successfully',
    } as ApiResponse<GBPClient>, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
