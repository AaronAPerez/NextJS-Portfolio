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
  /** Whether to show featured card skeleton (default: false) */
  showFeatured?: boolean;
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
 * FeaturedSkeletonCard
 *
 * Larger skeleton card matching FeaturedProjectCard layout.
 */
function FeaturedSkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        {/* Visual pane */}
        <div className="h-56 rounded-t-2xl bg-gray-100 dark:bg-gray-800 lg:min-h-72 lg:rounded-l-2xl lg:rounded-tr-none" />

        {/* Content pane */}
        <div className="p-6 lg:p-8">
          {/* Status badges */}
          <div className="mb-3 flex gap-2">
            <div className="h-6 w-28 rounded-full bg-gray-100 dark:bg-gray-800" />
            <div className="h-6 w-20 rounded bg-gray-100 dark:bg-gray-800" />
          </div>

          {/* Title */}
          <div className="mb-2 h-7 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />

          {/* Description */}
          <div className="mb-4 space-y-1.5">
            <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
          </div>

          {/* Highlights */}
          <div className="mb-5 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 flex-1 rounded bg-gray-100 dark:bg-gray-800" />
              </div>
            ))}
          </div>

          {/* Tech chips */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-5 w-16 rounded bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <div className="h-10 w-32 rounded-lg bg-gray-100 dark:bg-gray-800" />
            <div className="h-10 w-24 rounded-lg bg-gray-100 dark:bg-gray-800" />
          </div>
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
 *   <ProjectsSkeleton count={6} showFeatured />
 * ) : (
 *   <ProjectsGrid projects={projects} />
 * )}
 * ```
 */
function ProjectsSkeleton({
  count = 3,
  showFeatured = false,
  className = '',
}: ProjectsSkeletonProps) {
  return (
    <div className={className}>
      {/* Featured card skeleton */}
      {showFeatured && (
        <div className="mb-6">
          <FeaturedSkeletonCard />
        </div>
      )}

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Export individual components for flexibility
export { SkeletonCard, FeaturedSkeletonCard };

// Memoize main component
export default memo(ProjectsSkeleton);
