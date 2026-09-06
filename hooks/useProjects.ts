/**
 * useProjects Hook
 *
 * Custom hook for fetching and managing projects data.
 * Provides loading states, error handling, and data caching.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import type { ProjectDB, ProjectStatus, ProjectCategory } from '@/types/project';

// Import static projects as fallback
import { PROJECTS as staticProjects } from '@/components/config/projects';
import { adjustColor } from '@/components/sections/ProjectsSection/utils/project-mappers';

interface UseProjectsOptions {
  status?: ProjectStatus | 'all';
  category?: ProjectCategory | 'all';
  featured?: boolean;
  search?: string;
  fallbackToStatic?: boolean;
}

interface UseProjectsReturn {
  projects: ProjectDB[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetch projects from the API, falling back to static config data if the
 * API returns nothing or fails (keeps the section renderable without a DB).
 */
async function fetchProjectsData(options: UseProjectsOptions): Promise<ProjectDB[]> {
  const { status = 'all', category = 'all', featured, search, fallbackToStatic = true } = options;

  try {
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (category !== 'all') params.set('category', category);
    if (featured !== undefined) params.set('featured', String(featured));
    if (search) params.set('search', search);

    const response = await fetch(`/api/projects?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();

    if (data.projects && data.projects.length > 0) {
      return data.projects;
    }
    if (fallbackToStatic) {
      const converted = convertStaticProjects(staticProjects);
      return applyFilters(converted, { status, category, featured, search });
    }
    return [];
  } catch (err) {
    console.error('Error fetching projects:', err);

    if (fallbackToStatic) {
      const converted = convertStaticProjects(staticProjects);
      return applyFilters(converted, { status, category, featured, search });
    }
    throw err;
  }
}

/**
 * useProjects - Hook for fetching projects from the API
 *
 * Features:
 * - Automatic data fetching on mount, cached and deduped via React Query
 * - Filtering support (status, category, featured, search)
 * - Fallback to static data if API fails (for SSR compatibility)
 * - Error handling and loading states
 * - Manual refetch capability
 *
 * @param options - Filter and configuration options
 * @returns Object containing projects array, loading state, error, and refetch function
 */
export function useProjects(options: UseProjectsOptions = {}): UseProjectsReturn {
  const { status = 'all', category = 'all', featured, search, fallbackToStatic = true } = options;

  const query = useQuery({
    queryKey: ['projects', status, category, featured, search, fallbackToStatic],
    queryFn: () => fetchProjectsData({ status, category, featured, search, fallbackToStatic }),
  });

  return {
    projects: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? (query.error instanceof Error ? query.error.message : String(query.error)) : null,
    refetch: async () => {
      await query.refetch();
    },
  };
}

/**
 * Convert static projects to ProjectDB format
 *
 * Static config projects use a display-oriented shape (category: 'client' | 'saas' | 'tool',
 * status: 'production' | 'in-progress' | 'archived') that doesn't match the admin DB schema,
 * so category/status/isLive are translated to their ProjectDB equivalents. This mirrors the
 * reverse mapping in mapDBToDisplay (project-mappers.ts) so a round trip is consistent.
 */
function convertStaticProjects(staticProjectsData: typeof staticProjects): ProjectDB[] {
  return staticProjectsData.map((project, index) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    slug: project.id,
    category: (project.category === 'client'
      ? 'production'
      : project.category === 'saas'
      ? 'portfolio'
      : 'coursework') as ProjectCategory,
    status: (project.status === 'in-progress' ? 'in_development' : 'published') as ProjectStatus,
    featured: project.featured,
    isLive: project.status === 'production',
    displayOrder: index,
    tech: project.tech,
    highlights: project.highlights,
    stats: project.stats,
    images: project.image
      ? [{ id: 'img-0', url: project.image, alt: project.title, isPrimary: true }]
      : [],
    gradient: {
      from: project.accentColor,
      to: adjustColor(project.accentColor, -30),
    },
    companyLogo: project.companyLogo,
    demoLink: project.liveUrl,
    codeLink: project.githubUrl,
    websiteLink: project.liveUrl,
    businessImpact: undefined,
    technicalHighlights: undefined,
    timeline: undefined,
    teamSize: undefined,
    role: undefined,
    seo: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Apply filters to projects array
 */
function applyFilters(
  projects: ProjectDB[],
  filters: UseProjectsOptions
): ProjectDB[] {
  return projects.filter((project) => {
    // Status filter
    if (filters.status && filters.status !== 'all' && project.status !== filters.status) {
      return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'all' && project.category !== filters.category) {
      return false;
    }

    // Featured filter
    if (filters.featured !== undefined && project.featured !== filters.featured) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(searchLower);
      const matchesDesc = project.description.toLowerCase().includes(searchLower);
      const matchesTech = project.tech.some((t) => t.toLowerCase().includes(searchLower));
      if (!matchesTitle && !matchesDesc && !matchesTech) {
        return false;
      }
    }

    return true;
  });
}

export default useProjects;
