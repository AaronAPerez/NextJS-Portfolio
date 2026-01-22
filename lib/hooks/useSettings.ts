import { useQuery } from '@tanstack/react-query'

interface Settings {
  [category: string]: {
    [key: string]: string
  }
}

export function useSettings(category?: string) {
  return useQuery({
    queryKey: category ? ['settings', category] : ['settings'],
    queryFn: async () => {
      const url = category
        ? `/api/settings?category=${category}`
        : '/api/settings'
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch settings')
      return response.json() as Promise<Settings>
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })
}

// Helper to get a specific setting value
export function useSetting(category: string, key: string, defaultValue: string = '') {
  const { data: settings } = useSettings(category)
  return settings?.[category]?.[key] || defaultValue
}

// Helper to get all settings for a category with fallback values
export function useCategorySettings(category: string, defaults: Record<string, string> = {}) {
  const { data: settings, isLoading } = useSettings(category)
  const categorySettings = settings?.[category] || {}

  // Merge with defaults
  const merged = { ...defaults, ...categorySettings }

  return { settings: merged, isLoading }
}
