/**
 * Section Skeletons
 *
 * Export all skeleton components for use with dynamic imports.
 * Each skeleton matches its corresponding section's layout for smooth loading transitions.
 */

// Base skeleton components
export { Skeleton, SkeletonText, SkeletonCard, SkeletonSectionHeader } from './Skeleton';

// Section-specific skeletons
export { default as HeroSkeleton } from './HeroSkeleton';
export { default as AboutSkeleton } from './AboutSkeleton';
export { default as ProjectsSkeleton } from './ProjectsSkeleton';
export { default as SkillsSkeleton } from './SkillsSkeleton';
export { default as TimelineSkeleton } from './TimelineSkeleton';
export { default as ContactSkeleton } from './ContactSkeleton';
