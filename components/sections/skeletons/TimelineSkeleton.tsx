'use client';

import { Skeleton, SkeletonSectionHeader } from './Skeleton';

/**
 * Timeline Card Skeleton
 */
function TimelineCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 flex-shrink-0" variant="rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" variant="rounded" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Period and location */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Skeleton className="h-4 w-24" variant="rounded" />
        <Skeleton className="h-4 w-28" variant="rounded" />
      </div>

      {/* Details list */}
      <div className="space-y-2 mb-4">
        {['w-full', 'w-11/12', 'w-4/5', 'w-full'].map((width, i) => (
          <div key={i} className="flex items-start gap-2">
            <Skeleton variant="circular" className="w-2 h-2 mt-2 flex-shrink-0" />
            <Skeleton className={`h-4 ${width}`} />
          </div>
        ))}
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-6 w-16" variant="rounded" />
        ))}
      </div>
    </div>
  );
}

/**
 * Timeline Section Skeleton
 * Matches the layout of Timeline component for smooth loading transition
 */
export default function TimelineSkeleton() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 py-20 md:py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SkeletonSectionHeader />

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-12">
          {/* Experience Column */}
          <div>
            <div className="mb-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Skeleton variant="circular" className="w-6 h-6" />
                <Skeleton className="h-7 w-40" variant="rounded" />
              </div>
              <Skeleton className="h-4 w-full max-w-md mx-auto lg:mx-0" />
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <TimelineCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="mb-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Skeleton variant="circular" className="w-6 h-6" />
                <Skeleton className="h-7 w-52" variant="rounded" />
              </div>
              <Skeleton className="h-4 w-full max-w-md mx-auto lg:mx-0" />
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <TimelineCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
