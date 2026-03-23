/**
 * Projects Seed API Route
 *
 * Seeds the database with project data from the static config.
 * Converts static project format to database format with gradients and company logos.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql, generateId } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { PROJECTS } from '@/components/config/projects';

/**
 * Adjust hex color brightness for generating gradient "to" color
 */
function adjustColor(hex: string, amount: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * POST /api/projects/seed
 *
 * Seeds the database with static project data.
 *
 * Query Parameters:
 * - force: Set to 'true' to clear existing projects and re-seed
 */
export async function POST(request: NextRequest) {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL is not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    // Check if projects already exist (unless force is true)
    if (!force) {
      const existingProjects = await sql`
        SELECT COUNT(*) as count FROM "Project"
      `;

      const count = Number(existingProjects[0]?.count || 0);
      if (count > 0) {
        return NextResponse.json(
          {
            error: 'Projects already exist in the database. Use ?force=true to re-seed.',
            existingCount: count,
          },
          { status: 409 }
        );
      }
    }

    // If force is true, clear existing projects first
    if (force) {
      await sql`DELETE FROM "Project"`;
    }

    // Convert static projects to database format and insert
    const insertedProjects = [];

    for (let i = 0; i < PROJECTS.length; i++) {
      const project = PROJECTS[i];

      try {
        const id = generateId('proj');
        const slug = slugify(project.title);

        // Create gradient from accentColor
        const gradient = {
          from: project.accentColor,
          to: adjustColor(project.accentColor, -30),
        };

        // Map status for database
        const statusMap: Record<string, string> = {
          'production': 'published',
          'in-progress': 'in_development',
          'archived': 'archived',
        };
        const dbStatus = statusMap[project.status] || 'published';

        // Map category for database
        const categoryMap: Record<string, string> = {
          'client': 'production',
          'saas': 'portfolio',
          'tool': 'coursework',
        };
        const dbCategory = categoryMap[project.category] || 'portfolio';

        // Insert project
        const result = await sql`
          INSERT INTO "Project" (
            "id", "title", "description", "slug", "category", "clientType",
            "status", "featured", "isLive", "displayOrder", "order", "published",
            "tech", "images", "imagesAlt", "gradient", "gradientFrom", "gradientTo",
            "demoLink", "codeLink", "websiteLink", "companyLogo",
            "createdAt", "updatedAt"
          ) VALUES (
            ${id},
            ${project.title},
            ${project.description},
            ${slug},
            ${dbCategory},
            ${'business'},
            ${dbStatus},
            ${project.featured},
            ${project.status === 'production'},
            ${i},
            ${i},
            ${project.status === 'production'},
            ${project.tech},
            ${[]},
            ${[]},
            ${JSON.stringify(gradient)},
            ${gradient.from},
            ${gradient.to},
            ${project.liveUrl !== '#' ? project.liveUrl : null},
            ${project.githubUrl},
            ${project.liveUrl !== '#' ? project.liveUrl : null},
            ${project.companyLogo || null},
            NOW(),
            NOW()
          )
          RETURNING "id", "title", "slug", "featured"
        `;

        insertedProjects.push(result[0]);
        console.log(`✓ Inserted project: ${project.title}`);
      } catch (insertError) {
        console.error(`✗ Error inserting project ${project.title}:`, insertError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Projects seeded successfully',
      insertedCount: insertedProjects.length,
      totalProjects: PROJECTS.length,
      projects: insertedProjects,
    });
  } catch (error) {
    console.error('Error seeding projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to seed projects',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/projects/seed
 *
 * Returns info about the seed endpoint.
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/projects/seed',
    method: 'POST',
    description: 'Seeds the database with static project data',
    parameters: {
      force: 'Set to "true" to clear existing projects and re-seed',
    },
    projectsToSeed: PROJECTS.length,
    projects: PROJECTS.map((p) => ({
      id: p.id,
      title: p.title,
      status: p.status,
      featured: p.featured,
    })),
  });
}
