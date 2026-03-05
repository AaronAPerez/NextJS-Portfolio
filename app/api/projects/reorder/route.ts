/**
 * Projects Reorder API Route
 *
 * Handles batch updating of project display orders for drag-and-drop functionality.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import type { ReorderProjectsInput } from '@/types/project';

/**
 * PUT /api/projects/reorder
 *
 * Updates the display order of multiple projects at once.
 *
 * Request Body: ReorderProjectsInput
 * - projects: Array of { id: string, displayOrder: number }
 */
export async function PUT(request: NextRequest) {
  try {
    const data: ReorderProjectsInput = await request.json();

    // Validate input
    if (!data.projects || !Array.isArray(data.projects) || data.projects.length === 0) {
      return NextResponse.json(
        { error: 'Projects array is required' },
        { status: 400 }
      );
    }

    // Validate each project entry
    for (const project of data.projects) {
      if (!project.id || typeof project.displayOrder !== 'number') {
        return NextResponse.json(
          { error: 'Each project must have an id and displayOrder' },
          { status: 400 }
        );
      }
    }

    // Update each project's display order in a transaction-like manner
    // Updates both new (displayOrder) and legacy (order) columns for compatibility
    const updates = await Promise.all(
      data.projects.map(async (project) => {
        try {
          await sql`
            UPDATE "Project"
            SET
              "displayOrder" = ${project.displayOrder},
              "order" = ${project.displayOrder},
              "updatedAt" = NOW()
            WHERE "id" = ${project.id}
          `;
          return { id: project.id, success: true };
        } catch (error) {
          console.error(`Error updating project ${project.id}:`, error);
          return { id: project.id, success: false };
        }
      })
    );

    // Check if all updates succeeded
    const failedUpdates = updates.filter((u) => !u.success);
    if (failedUpdates.length > 0) {
      return NextResponse.json(
        {
          error: 'Some projects failed to update',
          failedIds: failedUpdates.map((u) => u.id),
        },
        { status: 207 } // Multi-Status
      );
    }

    return NextResponse.json({
      message: 'Projects reordered successfully',
      updatedCount: updates.length,
    });
  } catch (error) {
    console.error('Error reordering projects:', error);
    return NextResponse.json(
      { error: 'Failed to reorder projects' },
      { status: 500 }
    );
  }
}
