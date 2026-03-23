/**
 * StatusBadge Component
 *
 * Displays the status of a project with appropriate styling.
 * Shows different colors for production (green), in-progress (amber), and archived.
 */

'use client';

import { memo } from 'react';
import type { ProjectDisplayStatus } from '@/types/display-project';

interface StatusBadgeProps {
  /** Project status */
  status: ProjectDisplayStatus;
}

/**
 * StatusBadge
 *
 * Renders a pill-shaped badge indicating project status.
 *
 * @example
 * ```tsx
 * <StatusBadge status="production" />
 * <StatusBadge status="in-progress" />
 * ```
 */
function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'production') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
        <span
          className="h-1.5 w-1.5 rounded-full bg-green-500"
          aria-hidden="true"
        />
        Production · Live
      </span>
    );
  }

  if (status === 'in-progress') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
        <span
          className="h-1.5 w-1.5 rounded-full bg-amber-500"
          aria-hidden="true"
        />
        In Progress
      </span>
    );
  }

  if (status === 'archived') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <span
          className="h-1.5 w-1.5 rounded-full bg-gray-400"
          aria-hidden="true"
        />
        Archived
      </span>
    );
  }

  return null;
}

export default memo(StatusBadge);
