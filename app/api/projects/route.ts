/**
 * Projects API Routes
 *
 * Handles GET (list all projects) and POST (create new project) operations.
 * Projects are stored in Neon PostgreSQL database.
 *
 * Note: This API supports a hybrid schema that evolved from an earlier version.
 * Legacy columns (images as ARRAY, tech as ARRAY, order, published) are
 * transformed to the new format (images as JSONB, displayOrder, status).
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql, generateId } from '@/lib/db';
import { slugify } from '@/lib/utils';
import type { ProjectDB, CreateProjectInput, ProjectImage } from '@/types/project';

/**
 * Transform raw database row to ProjectDB format
 * Handles both legacy and new schema formats
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformProject(row: any): ProjectDB {
  // Handle images - can be ARRAY of strings (legacy) or JSONB array of objects (new)
  let images: ProjectImage[] = [];
  if (row.images) {
    if (Array.isArray(row.images)) {
      // Check if it's legacy format (array of strings) or new format (array of objects)
      if (row.images.length > 0 && typeof row.images[0] === 'string') {
        // Legacy format: convert string URLs to ProjectImage objects
        images = row.images.map((url: string, idx: number) => ({
          id: `img-${idx}`,
          url,
          alt: row.imagesAlt?.[idx] || row.title,
          isPrimary: idx === 0,
        }));
      } else {
        // New format: already ProjectImage objects
        images = row.images;
      }
    }
  }

  // Handle gradient - can be JSONB object or separate columns
  let gradient = row.gradient;
  if (!gradient && (row.gradientFrom || row.gradientTo)) {
    gradient = {
      from: row.gradientFrom || '#3B82F6',
      to: row.gradientTo || '#8B5CF6',
    };
  }

  // Handle tech - can be ARRAY or JSONB
  const tech = Array.isArray(row.tech) ? row.tech : [];

  // Handle status - use status column or derive from published
  const status = row.status || (row.published ? 'published' : 'draft');

  // Handle displayOrder - use displayOrder or order column
  const displayOrder = row.displayOrder ?? row.order ?? 0;

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    slug: row.slug || row.id, // Fallback to id if no slug
    category: row.category || 'portfolio',
    clientType: row.clientType,
    status,
    featured: row.featured ?? false,
    isLive: row.isLive ?? false,
    displayOrder,
    tech,
    images,
    gradient,
    companyLogo: row.companyLogo || null,
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
 * GET /api/projects
 *
 * Retrieves all projects with optional filtering.
 *
 * Query Parameters:
 * - status: Filter by status (draft, in_development, published, archived)
 * - category: Filter by category (production, portfolio, coursework)
 * - featured: Filter by featured status (true/false)
 * - search: Search in title, description, and tech stack
 */
export async function GET(request: NextRequest) {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('[GET /api/projects] DATABASE_URL is not set');
      return NextResponse.json(
        { error: 'Database not configured', details: 'DATABASE_URL environment variable is missing' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    // Fetch all projects with ordering (handle both displayOrder and legacy order column)
    const rawResult = await sql`
      SELECT * FROM "Project"
      ORDER BY COALESCE("displayOrder", "order") ASC, "createdAt" DESC
    `;

    // Transform raw results to ProjectDB format (handles legacy schema)
    let projects: ProjectDB[] = rawResult.map(transformProject);

    // Apply filters in JavaScript for reliable operation
    if (statusFilter) {
      projects = projects.filter((p) => p.status === statusFilter);
    }

    if (category) {
      projects = projects.filter((p) => p.category === category);
    }

    if (featured !== null && featured !== undefined) {
      const isFeatured = featured === 'true';
      projects = projects.filter((p) => p.featured === isFeatured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          (p.tech && JSON.stringify(p.tech).toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json({
      projects,
      total: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return detailed error in development for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 *
 * Creates a new project.
 *
 * Request Body: CreateProjectInput
 * - title (required): Project title
 * - description (required): Project description
 * - Other fields are optional with sensible defaults
 */
export async function POST(request: NextRequest) {
  try {
    const data: CreateProjectInput = await request.json();

    // Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Generate ID and slug
    const id = generateId('proj');
    const slug = data.slug || slugify(data.title);

    // Check if slug already exists
    const existingSlug = await sql`
      SELECT "id" FROM "Project" WHERE "slug" = ${slug}
    `;

    if (existingSlug.length > 0) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 409 }
      );
    }

    // Get next display order if not provided
    let displayOrder = data.displayOrder;
    if (displayOrder === undefined) {
      const maxOrder = await sql`
        SELECT COALESCE(MAX(COALESCE("displayOrder", "order")), -1) as max FROM "Project"
      `;
      displayOrder = (maxOrder[0]?.max ?? -1) + 1;
    }

    // Prepare image data for both legacy and new format
    const imageUrls = data.images?.map((img) => img.url) || [];
    const imageAlts = data.images?.map((img) => img.alt) || [];

    // Insert the new project (populates both legacy and new columns)
    const result = await sql`
      INSERT INTO "Project" (
        "id", "title", "description", "slug", "category", "clientType",
        "status", "featured", "isLive", "displayOrder", "order", "published",
        "tech", "images", "imagesAlt", "gradient", "gradientFrom", "gradientTo",
        "demoLink", "codeLink", "websiteLink", "businessImpact",
        "technicalHighlights", "timeline", "teamSize", "role", "seo"
      ) VALUES (
        ${id},
        ${data.title},
        ${data.description},
        ${slug},
        ${data.category || 'portfolio'},
        ${data.clientType || null},
        ${data.status || 'draft'},
        ${data.featured || false},
        ${data.isLive || false},
        ${displayOrder},
        ${displayOrder},
        ${data.status === 'published' || !data.status},
        ${data.tech || []},
        ${imageUrls},
        ${imageAlts},
        ${data.gradient ? JSON.stringify(data.gradient) : null},
        ${data.gradient?.from || null},
        ${data.gradient?.to || null},
        ${data.demoLink || null},
        ${data.codeLink || ''},
        ${data.websiteLink || null},
        ${data.businessImpact ? JSON.stringify(data.businessImpact) : null},
        ${data.technicalHighlights ? JSON.stringify(data.technicalHighlights) : null},
        ${data.timeline || null},
        ${data.teamSize || null},
        ${data.role || null},
        ${data.seo ? JSON.stringify(data.seo) : null}
      )
      RETURNING *
    `;

    // Transform the result to standard format before returning
    return NextResponse.json({ project: transformProject(result[0]) }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
