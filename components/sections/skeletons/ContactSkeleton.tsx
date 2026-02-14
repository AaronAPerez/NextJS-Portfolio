'use client';

import { Skeleton } from './Skeleton';

/**
 * Contact Form Skeleton
 */
function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Name and Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-14 w-full" variant="rounded" />
        </div>
        <div>
          <Skeleton className="h-4 w-12 mb-2" />
          <Skeleton className="h-14 w-full" variant="rounded" />
        </div>
      </div>

      {/* Subject */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-14 w-full" variant="rounded" />
      </div>

      {/* Message */}
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-40 w-full" variant="rounded" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-14 w-full" variant="rounded" />

      {/* Privacy text */}
      <Skeleton className="h-3 w-3/4 mx-auto" />
    </div>
  );
}

/**
 * Sidebar Skeleton
 */
function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Skeleton className="h-5 w-28 mb-4" variant="rounded" />

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circular" className="w-4 h-4" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-3 w-full" />
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Skeleton className="h-5 w-32 mb-4" variant="rounded" />

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" variant="rounded" />
          ))}
        </div>
      </div>

      {/* Social Links Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Skeleton className="h-5 w-20 mb-4" variant="rounded" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-28" variant="rounded" />
          <Skeleton className="h-10 w-28" variant="rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Contact Section Skeleton - Matches redesigned form-first layout
 */
export default function ContactSkeleton() {
  return (
    <div className="relative w-full overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Decorative line with icon */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
            <Skeleton variant="circular" className="w-12 h-12" />
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
          </div>

          {/* Title */}
          <Skeleton className="h-12 w-56 mx-auto mb-4" variant="rounded" />

          {/* Description */}
          <Skeleton className="h-5 w-96 max-w-full mx-auto" variant="rounded" />
        </div>

        {/* Main Grid: Form + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Primary focus */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              {/* Form header */}
              <div className="flex items-center gap-3 mb-6">
                <Skeleton className="w-9 h-9" variant="rounded" />
                <Skeleton className="h-6 w-36" variant="rounded" />
              </div>
              <ContactFormSkeleton />
            </div>
          </div>

          {/* Sidebar */}
          <SidebarSkeleton />
        </div>
      </div>
    </div>
  );
}
