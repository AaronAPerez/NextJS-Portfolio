/**
 * useProjects Hook
 *
 * Custom hook for fetching and managing projects data.
 * Provides loading states, error handling, and data caching.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ProjectDB, ProjectStatus, ProjectCategory } from '@/types/project';

// Import static projects as fallback
import { projects as staticProjects } from '@/components/config/projects';

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
 * useProjects - Hook for fetching projects from the API
 *
 * Features:
 * - Automatic data fetching on mount
 * - Filtering support (status, category, featured, search)
 * - Fallback to static data if API fails (for SSR compatibility)
 * - Error handling and loading states
 * - Manual refetch capability
 *
 * @param options - Filter and configuration options
 * @returns Object containing projects array, loading state, error, and refetch function
 */
export function useProjects(options: UseProjectsOptions = {}): UseProjectsReturn {
  const {
    status = 'all',
    category = 'all',
    featured,
    search,
    fallbackToStatic = true,
  } = options;

  const [projects, setProjects] = useState<ProjectDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch projects from the API
   */
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query parameters
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

      // If API returns projects, use them
      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else if (fallbackToStatic) {
        // Fallback to static projects if API returns empty
        // Convert static projects to ProjectDB format
        const converted = convertStaticProjects(staticProjects);
        setProjects(applyFilters(converted, { status, category, featured, search }));
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to load projects');

      // Use static fallback on error
      if (fallbackToStatic) {
        const converted = convertStaticProjects(staticProjects);
        setProjects(applyFilters(converted, { status, category, featured, search }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [status, category, featured, search, fallbackToStatic]);

  // Fetch projects on mount and when filters change
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch: fetchProjects,
  };
}

/**
 * Convert static projects to ProjectDB format
 */
function convertStaticProjects(staticProjectsData: typeof staticProjects): ProjectDB[] {
  return staticProjectsData.map((project, index) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    slug: project.id,
    category: project.category,
    clientType: project.clientType,
    status: 'published' as ProjectStatus,
    featured: project.featured,
    isLive: project.isLive,
    displayOrder: index,
    tech: project.tech,
    images: project.images.map((url, imgIndex) => ({
      id: `img-${imgIndex}`,
      url,
      alt: project.imagesAlt?.[imgIndex] || project.title,
      isPrimary: imgIndex === 0,
    })),
    gradient: project.gradient,
    demoLink: project.demoLink,
    codeLink: project.codeLink,
    websiteLink: project.websiteLink,
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
