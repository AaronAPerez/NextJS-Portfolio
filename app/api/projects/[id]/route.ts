/**
 * Individual Project API Routes
 *
 * Handles GET (single project), PUT (update), and DELETE operations.
 * Supports hybrid schema with legacy columns (images as ARRAY, order, published)
 * and new columns (displayOrder, status, gradient as JSONB).
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { slugify } from '@/lib/utils';
import type { UpdateProjectInput, ProjectImage } from '@/types/project';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Transform raw database row to ProjectDB format
 * Handles both legacy and new schema formats
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformProject(row: any) {
  // Handle images - can be ARRAY of strings (legacy) or JSONB array of objects (new)
  let images: ProjectImage[] = [];
  if (row.images) {
    if (Array.isArray(row.images)) {
      if (row.images.length > 0 && typeof row.images[0] === 'string') {
        // Legacy format: convert string URLs to ProjectImage objects
        images = row.images.map((url: string, idx: number) => ({
          id: `img-${idx}`,
          url,
          alt: row.imagesAlt?.[idx] || row.title,
          isPrimary: idx === 0,
        }));
      } else {
        images = row.images;
      }
    }
  }

  // Handle gradient
  let gradient = row.gradient;
  if (!gradient && (row.gradientFrom || row.gradientTo)) {
    gradient = {
      from: row.gradientFrom || '#3B82F6',
      to: row.gradientTo || '#8B5CF6',
    };
  }

  const tech = Array.isArray(row.tech) ? row.tech : [];
  const status = row.status || (row.published ? 'published' : 'draft');
  const displayOrder = row.displayOrder ?? row.order ?? 0;

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    slug: row.slug || row.id,
    category: row.category || 'portfolio',
    clientType: row.clientType,
    status,
    featured: row.featured ?? false,
    isLive: row.isLive ?? false,
    displayOrder,
    tech,
    images,
    gradient,
    demoLink: row.demoLink,
    codeLink: row.codeLink,
    websiteLink: row.websiteLink,
    businessImpact: row.businessImpact,
    technicalHighlights: row.technicalHighlights,
    timeline: row.timeline,
    teamSize: row.teamSize,
    role: row.role,
    seo: row.seo,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * GET /api/projects/[id]
 *
 * Retrieves a single project by ID or slug.
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by slug
    const projects = await sql`
      SELECT * FROM "Project"
      WHERE "id" = ${id} OR "slug" = ${id}
      LIMIT 1
    `;

    if (projects.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project: transformProject(projects[0]) });
  } catch (error) {
    console.error('Error fetching project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to fetch project',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/[id]
 *
 * Updates an existing project.
 * Handles both legacy and new schema columns.
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const data: UpdateProjectInput = await request.json();

    // Check if project exists
    const existingProject = await sql`
      SELECT * FROM "Project" WHERE "id" = ${id}
    `;

    if (existingProject.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // If slug is being updated, check for uniqueness
    if (data.slug && data.slug !== existingProject[0].slug) {
      const slugExists = await sql`
        SELECT "id" FROM "Project"
        WHERE "slug" = ${data.slug} AND "id" != ${id}
      `;

      if (slugExists.length > 0) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Generate new slug from title if title changed and slug not explicitly set
    const newSlug = data.slug || (data.title ? slugify(data.title) : existingProject[0].slug);

    // Prepare image data for both legacy and new columns
    const imageUrls = data.images?.map((img) => img.url);
    const imageAlts = data.images?.map((img) => img.alt);

    // Update the project - handle both legacy and new columns
    const result = await sql`
      UPDATE "Project"
      SET
        "title" = COALESCE(${data.title}, "title"),
        "description" = COALESCE(${data.description}, "description"),
        "slug" = ${newSlug},
        "category" = COALESCE(${data.category}, "category"),
        "clientType" = COALESCE(${data.clientType}, "clientType"),
        "status" = COALESCE(${data.status}, "status"),
        "published" = COALESCE(${data.status ? data.status === 'published' : null}, "published"),
        "featured" = COALESCE(${data.featured}, "featured"),
        "isLive" = COALESCE(${data.isLive}, "isLive"),
        "displayOrder" = COALESCE(${data.displayOrder}, "displayOrder"),
        "order" = COALESCE(${data.displayOrder}, "order"),
        "tech" = COALESCE(${data.tech || null}, "tech"),
        "images" = COALESCE(${imageUrls || null}, "images"),
        "imagesAlt" = COALESCE(${imageAlts || null}, "imagesAlt"),
        "gradient" = COALESCE(${data.gradient ? JSON.stringify(data.gradient) : null}::jsonb, "gradient"),
        "gradientFrom" = COALESCE(${data.gradient?.from || null}, "gradientFrom"),
        "gradientTo" = COALESCE(${data.gradient?.to || null}, "gradientTo"),
        "demoLink" = COALESCE(${data.demoLink}, "demoLink"),
        "codeLink" = COALESCE(${data.codeLink}, "codeLink"),
        "websiteLink" = COALESCE(${data.websiteLink}, "websiteLink"),
        "businessImpact" = COALESCE(${data.businessImpact ? JSON.stringify(data.businessImpact) : null}::jsonb, "businessImpact"),
        "technicalHighlights" = COALESCE(${data.technicalHighlights ? JSON.stringify(data.technicalHighlights) : null}::jsonb, "technicalHighlights"),
        "timeline" = COALESCE(${data.timeline}, "timeline"),
        "teamSize" = COALESCE(${data.teamSize}, "teamSize"),
        "role" = COALESCE(${data.role}, "role"),
        "seo" = COALESCE(${data.seo ? JSON.stringify(data.seo) : null}::jsonb, "seo"),
        "updatedAt" = NOW()
      WHERE "id" = ${id}
      RETURNING *
    `;

    return NextResponse.json({ project: transformProject(result[0]) });
  } catch (error) {
    console.error('Error updating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to update project',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id]
 *
 * Deletes a project by ID.
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Check if project exists
    const existingProject = await sql`
      SELECT "id", "title" FROM "Project" WHERE "id" = ${id}
    `;

    if (existingProject.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete the project
    await sql`DELETE FROM "Project" WHERE "id" = ${id}`;

    return NextResponse.json({
      message: `Project "${existingProject[0].title}" deleted successfully`,
      deletedId: id,
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to delete project',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
