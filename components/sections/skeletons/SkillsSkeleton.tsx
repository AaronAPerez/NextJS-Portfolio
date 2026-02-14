'use client';

import { Skeleton, SkeletonSectionHeader } from './Skeleton';

/**
 * Skill Card Skeleton
 */
function SkillCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 h-full">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-12" variant="rounded" />
        <Skeleton className="h-6 w-40" variant="rounded" />
      </div>

      {/* Skill list */}
      <div className="space-y-3">
        {['w-4/5', 'w-full', 'w-3/4', 'w-5/6', 'w-full', 'w-2/3'].map((width, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton variant="circular" className="w-5 h-5 flex-shrink-0" />
            <Skeleton className={`h-4 ${width}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skills Section Skeleton
 * Matches the layout of Skills component for smooth loading transition
 */
export default function SkillsSkeleton() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.05)_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.03)_1px,_transparent_0)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SkeletonSectionHeader />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>

        {/* Additional info text */}
        <div className="mt-12 text-center">
          <div className="max-w-3xl mx-auto space-y-2">
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
