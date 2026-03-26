/**
 * GBP Client Detail API Route
 * ────────────────────────────
 * Handles individual client operations
 * GET: Get client by ID with full details
 * PUT: Update client information
 * DELETE: Delete a client
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/neon';
import type { GBPClient, ApiResponse } from '@/types/gbp-database';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/gbp/clients/[id]
 * Retrieves a single client with all details
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Get the client with full details
    const result = await sql`
      SELECT c.*,
        (SELECT COUNT(*) FROM citations WHERE client_id = c.id AND status = 'live') as total_citations,
        (SELECT COUNT(*) FROM keywords WHERE client_id = c.id) as tracked_keywords,
        (SELECT COUNT(*) FROM posts WHERE client_id = c.id AND status = 'published') as total_posts,
        (SELECT COUNT(*) FROM reviews WHERE client_id = c.id) as total_reviews,
        (SELECT AVG(rating)::DECIMAL(2,1) FROM reviews WHERE client_id = c.id) as avg_rating,
        (SELECT COUNT(*) FROM action_items WHERE client_id = c.id AND status = 'pending') as pending_actions
      FROM clients c
      WHERE c.id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    } as ApiResponse<GBPClient>);
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gbp/clients/[id]
 * Updates a client's information using COALESCE to preserve existing values
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if client exists
    const existing = await sql`SELECT id FROM clients WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Handle business hours if provided
    const businessHours = (body.monday_hours || body.tuesday_hours || body.wednesday_hours ||
        body.thursday_hours || body.friday_hours || body.saturday_hours || body.sunday_hours)
      ? JSON.stringify({
          monday: body.monday_hours,
          tuesday: body.tuesday_hours,
          wednesday: body.wednesday_hours,
          thursday: body.thursday_hours,
          friday: body.friday_hours,
          saturday: body.saturday_hours,
          sunday: body.sunday_hours,
        })
      : null;

    // Use COALESCE to update only provided fields, keeping existing values for nulls
    const result = await sql`
      UPDATE clients SET
        legal_name = COALESCE(${body.legal_name ?? null}, legal_name),
        primary_category = COALESCE(${body.primary_category ?? null}, primary_category),
        secondary_categories = COALESCE(${body.secondary_categories ?? null}, secondary_categories),
        address = COALESCE(${body.address ?? null}, address),
        city = COALESCE(${body.city ?? null}, city),
        state = COALESCE(${body.state ?? null}, state),
        zip = COALESCE(${body.zip ?? null}, zip),
        primary_phone = COALESCE(${body.primary_phone ?? null}, primary_phone),
        website_url = COALESCE(${body.website_url ?? null}, website_url),
        year_established = COALESCE(${body.year_established ? parseInt(body.year_established) : null}, year_established),
        service_areas = COALESCE(${body.service_areas ?? null}, service_areas),
        business_description = COALESCE(${body.business_description ?? null}, business_description),
        services_list = COALESCE(${body.services_list ?? null}, services_list),
        service_descriptions = COALESCE(${body.service_descriptions ?? null}, service_descriptions),
        target_keywords = COALESCE(${body.target_keywords ?? null}, target_keywords),
        top_faqs = COALESCE(${body.top_faqs ?? null}, top_faqs),
        unique_selling_prop = COALESCE(${body.unique_selling_prop ?? null}, unique_selling_prop),
        current_promotions = COALESCE(${body.current_promotions ?? null}, current_promotions),
        has_logo = COALESCE(${body.has_logo ?? null}, has_logo),
        has_cover_photo = COALESCE(${body.has_cover_photo ?? null}, has_cover_photo),
        photo_count = COALESCE(${body.photo_count !== undefined ? parseInt(body.photo_count) : null}, photo_count),
        has_geo_tagged_photos = COALESCE(${body.has_geo_tagged_photos ?? null}, has_geo_tagged_photos),
        has_team_photo = COALESCE(${body.has_team_photo ?? null}, has_team_photo),
        has_video = COALESCE(${body.has_video ?? null}, has_video),
        has_before_after_photos = COALESCE(${body.has_before_after_photos ?? null}, has_before_after_photos),
        photo_notes = COALESCE(${body.photo_notes ?? null}, photo_notes),
        gbp_access = COALESCE(${body.gbp_access ?? null}, gbp_access),
        ga4_access = COALESCE(${body.ga4_access ?? null}, ga4_access),
        search_console_access = COALESCE(${body.search_console_access ?? null}, search_console_access),
        cms_access = COALESCE(${body.cms_access ?? null}, cms_access),
        social_media_access = COALESCE(${body.social_media_access ?? null}, social_media_access),
        citation_logins = COALESCE(${body.citation_logins ?? null}, citation_logins),
        access_notes = COALESCE(${body.access_notes ?? null}, access_notes),
        competitor_1_name = COALESCE(${body.competitor_1_name ?? null}, competitor_1_name),
        competitor_1_url = COALESCE(${body.competitor_1_url ?? null}, competitor_1_url),
        competitor_2_name = COALESCE(${body.competitor_2_name ?? null}, competitor_2_name),
        competitor_2_url = COALESCE(${body.competitor_2_url ?? null}, competitor_2_url),
        competitor_3_name = COALESCE(${body.competitor_3_name ?? null}, competitor_3_name),
        competitor_3_url = COALESCE(${body.competitor_3_url ?? null}, competitor_3_url),
        target_geographies = COALESCE(${body.target_geographies ?? null}, target_geographies),
        customer_type = COALESCE(${body.customer_type ?? null}, customer_type),
        seasonal_patterns = COALESCE(${body.seasonal_patterns ?? null}, seasonal_patterns),
        previous_seo_work = COALESCE(${body.previous_seo_work ?? null}, previous_seo_work),
        preferred_post_topics = COALESCE(${body.preferred_post_topics ?? null}, preferred_post_topics),
        monthly_photo_delivery = COALESCE(${body.monthly_photo_delivery ?? null}, monthly_photo_delivery),
        review_request_method = COALESCE(${body.review_request_method ?? null}, review_request_method),
        reporting_cadence = COALESCE(${body.reporting_cadence ?? null}, reporting_cadence),
        point_of_contact = COALESCE(${body.point_of_contact ?? null}, point_of_contact),
        point_of_contact_email = COALESCE(${body.point_of_contact_email ?? null}, point_of_contact_email),
        point_of_contact_phone = COALESCE(${body.point_of_contact_phone ?? null}, point_of_contact_phone),
        additional_notes = COALESCE(${body.additional_notes ?? null}, additional_notes),
        status = COALESCE(${body.status ?? null}, status),
        campaign_start_date = COALESCE(${body.campaign_start_date ?? null}, campaign_start_date),
        monthly_fee = COALESCE(${body.monthly_fee ? parseFloat(body.monthly_fee) : null}, monthly_fee),
        business_hours = COALESCE(${businessHours}::jsonb, business_hours),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0] as GBPClient,
      message: 'Client updated successfully',
    } as ApiResponse<GBPClient>);
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/gbp/clients/[id]
 * Deletes a client and all associated data (cascades)
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Check if client exists
    const existing = await sql`SELECT id, legal_name FROM clients WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Delete the client (cascades to related tables)
    await sql`DELETE FROM clients WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: `Client "${existing[0].legal_name}" deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
