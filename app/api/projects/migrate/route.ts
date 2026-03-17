import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * POST /api/projects/migrate
 * Adds missing columns to the Project table.
 * Safe to run multiple times - uses IF NOT EXISTS.
 */
export async function POST() {
  try {
    // Add columns if they don't exist (PostgreSQL syntax)
    await sql`
      DO $$
      BEGIN
        -- Core columns
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'slug') THEN
          ALTER TABLE "Project" ADD COLUMN "slug" VARCHAR(255);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'category') THEN
          ALTER TABLE "Project" ADD COLUMN "category" VARCHAR(50) DEFAULT 'portfolio';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'clientType') THEN
          ALTER TABLE "Project" ADD COLUMN "clientType" VARCHAR(50);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'status') THEN
          ALTER TABLE "Project" ADD COLUMN "status" VARCHAR(50) DEFAULT 'draft';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'featured') THEN
          ALTER TABLE "Project" ADD COLUMN "featured" BOOLEAN DEFAULT false;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'isLive') THEN
          ALTER TABLE "Project" ADD COLUMN "isLive" BOOLEAN DEFAULT false;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'displayOrder') THEN
          ALTER TABLE "Project" ADD COLUMN "displayOrder" INTEGER DEFAULT 0;
        END IF;

        -- Legacy columns (for backward compatibility)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'order') THEN
          ALTER TABLE "Project" ADD COLUMN "order" INTEGER DEFAULT 0;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'published') THEN
          ALTER TABLE "Project" ADD COLUMN "published" BOOLEAN DEFAULT true;
        END IF;

        -- Tech stack (array of strings)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'tech') THEN
          ALTER TABLE "Project" ADD COLUMN "tech" TEXT[] DEFAULT '{}';
        END IF;

        -- Images (array of strings for URLs)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'images') THEN
          ALTER TABLE "Project" ADD COLUMN "images" TEXT[] DEFAULT '{}';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'imagesAlt') THEN
          ALTER TABLE "Project" ADD COLUMN "imagesAlt" TEXT[] DEFAULT '{}';
        END IF;

        -- Gradient (JSONB or separate columns)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'gradient') THEN
          ALTER TABLE "Project" ADD COLUMN "gradient" JSONB;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'gradientFrom') THEN
          ALTER TABLE "Project" ADD COLUMN "gradientFrom" VARCHAR(20);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'gradientTo') THEN
          ALTER TABLE "Project" ADD COLUMN "gradientTo" VARCHAR(20);
        END IF;

        -- Links
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'demoLink') THEN
          ALTER TABLE "Project" ADD COLUMN "demoLink" VARCHAR(500);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'codeLink') THEN
          ALTER TABLE "Project" ADD COLUMN "codeLink" VARCHAR(500);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'websiteLink') THEN
          ALTER TABLE "Project" ADD COLUMN "websiteLink" VARCHAR(500);
        END IF;

        -- Business impact and technical highlights (JSONB)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'businessImpact') THEN
          ALTER TABLE "Project" ADD COLUMN "businessImpact" JSONB;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'technicalHighlights') THEN
          ALTER TABLE "Project" ADD COLUMN "technicalHighlights" JSONB;
        END IF;

        -- Project details
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'timeline') THEN
          ALTER TABLE "Project" ADD COLUMN "timeline" VARCHAR(100);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'teamSize') THEN
          ALTER TABLE "Project" ADD COLUMN "teamSize" VARCHAR(100);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'role') THEN
          ALTER TABLE "Project" ADD COLUMN "role" VARCHAR(100);
        END IF;

        -- SEO (JSONB)
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'seo') THEN
          ALTER TABLE "Project" ADD COLUMN "seo" JSONB;
        END IF;

        -- Timestamps
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'createdAt') THEN
          ALTER TABLE "Project" ADD COLUMN "createdAt" TIMESTAMPTZ DEFAULT NOW();
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                       WHERE table_name = 'Project' AND column_name = 'updatedAt') THEN
          ALTER TABLE "Project" ADD COLUMN "updatedAt" TIMESTAMPTZ DEFAULT NOW();
        END IF;
      END
      $$;
    `

    return NextResponse.json({
      success: true,
      message: 'Project table migration completed successfully'
    })
  } catch (error) {
    console.error('Error running project migration:', error)
    return NextResponse.json({
      error: 'Failed to run migration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET to check current column status
export async function GET() {
  try {
    const columns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'Project'
      ORDER BY ordinal_position
    `

    const requiredColumns = [
      'id', 'title', 'description', 'slug', 'category', 'clientType',
      'status', 'featured', 'isLive', 'displayOrder', 'order', 'published',
      'tech', 'images', 'imagesAlt', 'gradient', 'gradientFrom', 'gradientTo',
      'demoLink', 'codeLink', 'websiteLink', 'businessImpact',
      'technicalHighlights', 'timeline', 'teamSize', 'role', 'seo',
      'createdAt', 'updatedAt'
    ]
    const existingColumns = columns.map((c: { column_name: string }) => c.column_name)
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col))

    return NextResponse.json({
      columns: columns,
      existingColumnNames: existingColumns,
      missingColumns,
      needsMigration: missingColumns.length > 0
    })
  } catch (error) {
    console.error('Error checking project columns:', error)
    return NextResponse.json({
      error: 'Failed to check columns',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
