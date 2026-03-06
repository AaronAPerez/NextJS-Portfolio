/**
 * Projects Seed API Route
 *
 * One-time migration endpoint to seed the database with existing static project data.
 * Merges data from both /components/config/projects.ts and /data/projects.ts.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql, generateId } from '@/lib/db';
import { slugify } from '@/lib/utils';

// Import static project data
import { projects as configProjects } from '@/components/config/projects';
import { Projects as dataProjects } from '@/data/projects';

/**
 * POST /api/projects/seed
 *
 * Seeds the database with existing static project data.
 * This is a one-time migration operation.
 *
 * Query Parameters:
 * - force: Set to 'true' to force re-seed even if projects exist
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    // Check if projects already exist (unless force is true)
    if (!force) {
      const existingProjects = await sql`
        SELECT COUNT(*) as count FROM "Project"
      `;

      if (existingProjects[0]?.count > 0) {
        return NextResponse.json(
          {
            error: 'Projects already exist in the database. Use ?force=true to re-seed.',
            existingCount: existingProjects[0].count,
          },
          { status: 409 }
        );
      }
    }

    // If force is true, clear existing projects first
    if (force) {
      await sql`DELETE FROM "Project"`;
    }

    // Create a merged map of projects
    // Use data from configProjects as base, enhance with dataProjects metadata
    const mergedProjects = new Map();

    // First, add all config projects (these have the display-focused data)
    for (const project of configProjects) {
      mergedProjects.set(project.id, {
        id: generateId('proj'),
        title: project.title,
        description: project.description,
        slug: slugify(project.title),
        category: project.category,
        clientType: project.clientType || null,
        status: 'published', // Existing projects are assumed published
        featured: project.featured,
        isLive: project.isLive,
        displayOrder: configProjects.indexOf(project),
        tech: project.tech,
        images: project.images.map((url, idx) => ({
          id: `img-${idx}`,
          url,
          alt: project.imagesAlt?.[idx] || project.title,
          isPrimary: idx === 0,
        })),
        gradient: project.gradient || null,
        demoLink: project.demoLink || null,
        codeLink: project.codeLink,
        websiteLink: project.websiteLink || null,
        businessImpact: null,
        technicalHighlights: null,
        timeline: null,
        teamSize: null,
        role: null,
        seo: null,
        originalId: project.id, // Keep track for matching
      });
    }

    // Now enhance with data from dataProjects (which has business impact, tech highlights, etc.)
    for (const project of dataProjects) {
      // Try to find matching project by ID or title similarity
      let matchingKey = null;

      for (const [key, value] of mergedProjects.entries()) {
        // Match by similar ID (e.g., 'amp-vending' matches 'amp-vending-enhanced')
        if (
          value.originalId?.includes(project.id.split('-')[0]) ||
          project.id.includes(value.originalId?.split('-')[0] || '')
        ) {
          matchingKey = key;
          break;
        }
      }

      if (matchingKey) {
        // Enhance existing project with additional data
        const existing = mergedProjects.get(matchingKey);
        mergedProjects.set(matchingKey, {
          ...existing,
          businessImpact: project.businessImpact
            ? {
                primaryMetric: project.businessImpact.primaryMetric,
                keyMetrics: project.businessImpact.keyMetrics.map((m) => ({
                  label: m.label,
                  value: m.value,
                  improvement: m.improvement,
                  icon: m.icon?.displayName || m.icon?.name || 'TrendingUp',
                  color: m.color,
                })),
                roiStatement: project.businessImpact.roiStatement,
                clientTestimonial: project.businessImpact.clientTestimonial,
              }
            : null,
          technicalHighlights: project.technicalHighlights || null,
          timeline: project.timeline || null,
          teamSize: project.teamSize || null,
          role: project.role || null,
          seo: project.seo || null,
        });
      } else {
        // Add as new project (not in configProjects but in dataProjects)
        mergedProjects.set(project.id, {
          id: generateId('proj'),
          title: project.title,
          description: project.description,
          slug: slugify(project.title),
          category: project.category === 'web' ? 'portfolio' : project.category,
          clientType: null,
          status: project.status === 'completed' ? 'published' : 'draft',
          featured: project.featured,
          isLive: true,
          displayOrder: mergedProjects.size,
          tech: project.technologies || [],
          images: project.thumbnail
            ? [
                {
                  id: 'img-0',
                  url: project.thumbnail,
                  alt: project.imageAlt || project.title,
                  isPrimary: true,
                },
              ]
            : [],
          gradient: null,
          demoLink: project.liveUrl || null,
          codeLink: project.githubUrl || null,
          websiteLink: project.liveUrl || null,
          businessImpact: project.businessImpact
            ? {
                primaryMetric: project.businessImpact.primaryMetric,
                keyMetrics: project.businessImpact.keyMetrics.map((m) => ({
                  label: m.label,
                  value: m.value,
                  improvement: m.improvement,
                  icon: m.icon?.displayName || m.icon?.name || 'TrendingUp',
                  color: m.color,
                })),
                roiStatement: project.businessImpact.roiStatement,
                clientTestimonial: project.businessImpact.clientTestimonial,
              }
            : null,
          technicalHighlights: project.technicalHighlights || null,
          timeline: project.timeline || null,
          teamSize: project.teamSize || null,
          role: project.role || null,
          seo: project.seo || null,
          originalId: project.id,
        });
      }
    }

    // Insert all merged projects into the database
    const insertedProjects = [];

    for (const [, project] of mergedProjects) {
      try {
        const result = await sql`
          INSERT INTO "Project" (
            "id", "title", "description", "slug", "category", "clientType",
            "status", "featured", "isLive", "displayOrder", "tech", "images",
            "gradient", "demoLink", "codeLink", "websiteLink", "businessImpact",
            "technicalHighlights", "timeline", "teamSize", "role", "seo"
          ) VALUES (
            ${project.id},
            ${project.title},
            ${project.description},
            ${project.slug},
            ${project.category},
            ${project.clientType},
            ${project.status},
            ${project.featured},
            ${project.isLive},
            ${project.displayOrder},
            ${JSON.stringify(project.tech)},
            ${JSON.stringify(project.images)},
            ${project.gradient ? JSON.stringify(project.gradient) : null},
            ${project.demoLink},
            ${project.codeLink},
            ${project.websiteLink},
            ${project.businessImpact ? JSON.stringify(project.businessImpact) : null},
            ${project.technicalHighlights ? JSON.stringify(project.technicalHighlights) : null},
            ${project.timeline},
            ${project.teamSize},
            ${project.role},
            ${project.seo ? JSON.stringify(project.seo) : null}
          )
          RETURNING "id", "title"
        `;

        insertedProjects.push(result[0]);
      } catch (error) {
        console.error(`Error inserting project ${project.title}:`, error);
      }
    }

    return NextResponse.json({
      message: 'Projects seeded successfully',
      insertedCount: insertedProjects.length,
      projects: insertedProjects,
    });
  } catch (error) {
    console.error('Error seeding projects:', error);
    return NextResponse.json(
      { error: 'Failed to seed projects' },
      { status: 500 }
    );
  }
}
