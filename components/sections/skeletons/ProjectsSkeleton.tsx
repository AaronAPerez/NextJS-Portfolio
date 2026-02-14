'use client';

import { Skeleton, SkeletonSectionHeader } from './Skeleton';

/**
 * Project Card Skeleton
 */
function ProjectCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="w-full h-48" />

      <div className="p-6">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-3" variant="rounded" />

        {/* Description */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16" variant="rounded" />
          <Skeleton className="h-6 w-20" variant="rounded" />
          <Skeleton className="h-6 w-14" variant="rounded" />
          <Skeleton className="h-6 w-18" variant="rounded" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24" variant="rounded" />
          <Skeleton className="h-10 w-24" variant="rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Projects Section Skeleton
 * Matches the layout of ProjectsSection for smooth loading transition
 */
export default function ProjectsSkeleton() {
  return (
    <div className="relative w-full overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SkeletonSectionHeader />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
