'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rounded';
  animate?: boolean;
}

/**
 * Base Skeleton component with shimmer animation
 * Use this to build section-specific skeleton loaders
 */
export function Skeleton({
  className,
  variant = 'default',
  animate = true
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        animate && 'animate-pulse',
        variant === 'circular' && 'rounded-full',
        variant === 'rounded' && 'rounded-xl',
        variant === 'default' && 'rounded-md',
        className
      )}
    />
  );
}

/**
 * Skeleton text line with variable width
 */
export function SkeletonText({
  className,
  width = 'w-full'
}: {
  className?: string;
  width?: string;
}) {
  return (
    <Skeleton
      className={cn('h-4', width, className)}
    />
  );
}

/**
 * Skeleton card with configurable content
 */
export function SkeletonCard({
  className,
  lines = 3,
  hasImage = false,
  hasHeader = true
}: {
  className?: string;
  lines?: number;
  hasImage?: boolean;
  hasHeader?: boolean;
}) {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6',
      className
    )}>
      {hasImage && (
        <Skeleton className="w-full h-48 mb-4 rounded-lg" />
      )}
      {hasHeader && (
        <div className="flex items-center gap-3 mb-4">
          <Skeleton variant="circular" className="w-10 h-10" />
          <Skeleton className="h-5 w-32" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonText
            key={i}
            width={i === lines - 1 ? 'w-2/3' : 'w-full'}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Section header skeleton matching the site's header style
 */
export function SkeletonSectionHeader({ className }: { className?: string }) {
  return (
    <div className={cn('text-center mb-16', className)}>
      {/* Decorative line with icon */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
      </div>

      {/* Title */}
      <Skeleton className="h-12 w-64 mx-auto mb-6" variant="rounded" />

      {/* Description */}
      <Skeleton className="h-5 w-96 max-w-full mx-auto" variant="rounded" />
    </div>
  );
}

export default Skeleton;
