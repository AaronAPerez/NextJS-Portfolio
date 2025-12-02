import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  isLive: boolean;
  clientType?: string | null;
  featured: boolean;
  images: string[];
  imagesAlt: string[];
  demoLink?: string | null;
  codeLink: string;
  websiteLink?: string | null;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectFilters {
  published?: boolean;
  featured?: boolean;
  category?: string;
}

// Fetch all projects
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.published !== undefined) params.set('published', String(filters.published));
      if (filters?.featured !== undefined) params.set('featured', String(filters.featured));
      if (filters?.category) params.set('category', filters.category);

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json() as Promise<Project[]>;
    },
  });
}

// Fetch single project
export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json() as Promise<Project>;
    },
    enabled: !!id,
  });
}

// Create project mutation
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create project');
      return response.json() as Promise<Project>;
    },
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Update project mutation
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Project> }) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update project');
      return response.json() as Promise<Project>;
    },
    onSuccess: (data) => {
      // Update cache with new data
      queryClient.setQueryData(['projects', data.id], data);
      // Invalidate projects list to refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Delete project mutation
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
