/**
 * ProjectsSkeleton Component
 *
 * Loading skeleton for the projects grid.
 * Displays animated placeholder cards while projects are loading.
 */

'use client';

import { memo } from 'react';

interface ProjectsSkeletonProps {
  /** Number of skeleton cards to show (default: 3) */
  count?: number;
  /** Optional className for container */
  className?: string;
}

/**
 * SkeletonCard
 *
 * Individual skeleton card matching ProjectCard layout.
 */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Header skeleton */}
      <div className="h-40 rounded-t-2xl bg-gray-100 dark:bg-gray-800" />

      {/* Content skeleton */}
      <div className="p-5">
        {/* Status badge */}
        <div className="mb-2 h-6 w-24 rounded-full bg-gray-100 dark:bg-gray-800" />

        {/* Title */}
        <div className="mb-2 h-5 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />

        {/* Description */}
        <div className="mb-4 space-y-1.5">
          <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Tech chips */}
        <div className="mb-4 flex gap-1">
          {[1, 2, 3].map((j) => (
            <div
              key={j}
              className="h-5 w-16 rounded bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <div className="h-7 w-20 rounded-md bg-gray-100 dark:bg-gray-800" />
          <div className="h-7 w-16 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

/**
 * ProjectsSkeleton
 *
 * Loading skeleton for the projects section.
 *
 * @example
 * ```tsx
 * {isLoading ? (
 *   <ProjectsSkeleton count={5} />
 * ) : (
 *   <ProjectsGrid projects={projects} />
 * )}
 * ```
 */
function ProjectsSkeleton({ count = 3, className = '' }: ProjectsSkeletonProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Export for flexibility
export { SkeletonCard };

// Memoize main component
export default memo(ProjectsSkeleton);
