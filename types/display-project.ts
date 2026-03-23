/**
 * Display Project Types
 *
 * Unified project types for displaying projects across the application.
 * Abstracts database and static project formats into a common interface.
 */

// Gradient configuration for project branding
export interface ProjectGradient {
  from: string;
  to: string;
}

// Project statistics for display
export interface ProjectStats {
  commits?: number;
  lighthouse?: number;
  label?: string;
}

// Project status options for UI display
export type ProjectDisplayStatus = 'production' | 'in-progress' | 'archived';

// Project category options for filtering
export type ProjectCategory = 'client' | 'saas' | 'tool';

// Filter tab options
export type FilterTab = 'all' | 'client' | 'saas' | 'tool';

// Filter tab configuration
export interface FilterTabConfig {
  id: FilterTab;
  label: string;
}

// Filter counts for each category
export type FilterCounts = Record<FilterTab, number>;

/**
 * DisplayProject
 *
 * Unified project type that works with both database and static data.
 * This is the primary type used for rendering project cards and lists.
 */
export interface DisplayProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: ProjectDisplayStatus;
  category: ProjectCategory;
  gradient: ProjectGradient;
  image?: string;  // Primary project screenshot/preview image
  companyLogo?: string;
  stats: ProjectStats;
  tech: string[];
  highlights: string[];
}

// Default filter tabs configuration
export const FILTER_TABS: FilterTabConfig[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'client', label: 'Client Work' },
  { id: 'saas', label: 'SaaS' },
  { id: 'tool', label: 'Tools' },
];

// Default gradient for projects without one
export const DEFAULT_GRADIENT: ProjectGradient = {
  from: '#3B82F6',
  to: '#8B5CF6',
};
