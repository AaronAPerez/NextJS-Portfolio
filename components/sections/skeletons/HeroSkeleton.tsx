'use client';

import { Skeleton } from './Skeleton';

/**
 * Hero Section Skeleton
 * Matches the layout of HeroSection for smooth loading transition
 */
export default function HeroSkeleton() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-2 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-12 md:pt-14 lg:-mt-10">
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">

            {/* Left Column - Content skeleton */}
            <div className="space-y-4 sm:space-y-6 w-full text-center lg:text-left order-2 lg:order-1">
              {/* Main headline */}
              <Skeleton className="h-16 sm:h-20 lg:h-24 w-3/4 mx-auto lg:mx-0" variant="rounded" />

              {/* Subtitle highlight */}
              <Skeleton className="h-12 sm:h-14 w-64 mx-auto lg:mx-0" variant="rounded" />

              {/* Tech stack text */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <Skeleton className="h-6 w-28" variant="rounded" />
                <Skeleton className="h-6 w-20" variant="rounded" />
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} variant="circular" className="w-12 h-12" />
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Skeleton className="h-12 w-40" variant="rounded" />
                <Skeleton className="h-12 w-44" variant="rounded" />
              </div>

              {/* Location */}
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Skeleton variant="circular" className="w-4 h-4" />
                <Skeleton className="h-4 w-48" variant="rounded" />
              </div>
            </div>

            {/* Right Column - Profile image skeleton */}
            <div className="flex flex-col items-center lg:items-end gap-4 order-1 lg:order-2 pb-6 sm:pb-12">
              <div className="relative w-full max-w-md flex justify-center">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
                  {/* Profile circle */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-600/30 rounded-full p-1">
                    <Skeleton variant="circular" className="w-full h-full" />
                  </div>

                  {/* Floating tech icons */}
                  <Skeleton variant="circular" className="absolute -top-6 -right-6 w-16 h-16" />
                  <Skeleton variant="circular" className="absolute -bottom-2 -left-6 w-14 h-14" />
                  <Skeleton variant="circular" className="absolute top-1/4 -left-8 w-12 h-12" />
                  <Skeleton variant="circular" className="absolute top-1/3 -right-8 w-10 h-10" />
                </div>

                {/* Achievement badges */}
                <div className="absolute -bottom-8 sm:-bottom-12 flex flex-col sm:flex-row gap-2 items-center">
                  <Skeleton className="h-8 w-32" variant="rounded" />
                  <Skeleton className="h-8 w-28" variant="rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-24" variant="rounded" />
              <Skeleton variant="circular" className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
