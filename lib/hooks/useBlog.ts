import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured?: boolean
  publishedAt?: string
  author: string
  category?: string
  metaTitle?: string
  metaDescription?: string
  views?: number
  createdAt: string
  updatedAt: string
  tags?: Array<{ id: string; name: string; slug: string }>
}

export function useBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await fetch('/api/admin/blog')
      if (!response.ok) throw new Error('Failed to fetch blog posts')
      return response.json()
    },
  })
}

export function useBlogPost(slug: string) {
  return useQuery<BlogPost>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await fetch(`/api/admin/blog/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch blog post')
      return response.json()
    },
    enabled: !!slug,
  })
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<BlogPost>) => {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create blog post')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BlogPost> }) => {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update blog post')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete blog post')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}

// Export alias for convenience
export { useBlogPosts as useBlog }
