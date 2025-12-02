import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  proficiency: number;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SkillFilters {
  published?: boolean;
  category?: string;
}

// Fetch all skills
export function useSkills(filters?: SkillFilters) {
  return useQuery({
    queryKey: ['skills', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.published !== undefined) params.set('published', String(filters.published));
      if (filters?.category) params.set('category', filters.category);

      const response = await fetch(`/api/skills?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      return response.json() as Promise<Skill[]>;
    },
  });
}

// Create skill mutation
export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Skill>) => {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create skill');
      return response.json() as Promise<Skill>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
}

// Update skill mutation
export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Skill> }) => {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update skill');
      return response.json() as Promise<Skill>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
}

// Delete skill mutation
export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete skill');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
}
