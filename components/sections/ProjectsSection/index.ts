/**
 * ProjectsSection Module
 *
 * Barrel file exporting all ProjectsSection components and utilities.
 * Provides clean imports for consumers.
 *
 * @example
 * ```tsx
 * import {
 *   ProjectsSection,
 *   ProjectCard,
 *   FeaturedProjectCard,
 *   FilterTabs,
 *   ProjectsSkeleton,
 * } from '@/components/sections/ProjectsSection';
 * ```
 */

// Main section component
export { default as ProjectsSection } from './ProjectsSection';
export { default } from './ProjectsSection';

// Card components
export { default as ProjectCard } from './ProjectCard';
export { default as FeaturedProjectCard } from './FeaturedProjectCard';

// UI components
export { default as FilterTabs } from './FilterTabs';
export { default as ProjectsSkeleton, SkeletonCard, FeaturedSkeletonCard } from './ProjectsSkeleton';

// Shared components
export { StatusBadge, TechChip } from './shared';

// Animation variants
export * from './animations';

// Utility functions
export * from './utils/project-mappers';
