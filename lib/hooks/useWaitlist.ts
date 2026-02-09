import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface WaitlistEntry {
  id: string
  firstName: string
  email: string
  phone?: string
  department?: string
  status: string
  createdAt: string
  interestedIn: string[]
}

export function useWaitlist() {
  return useQuery<WaitlistEntry[]>({
    queryKey: ['waitlist'],
    queryFn: async () => {
      const response = await fetch('/api/admin/waitlist')
      if (!response.ok) throw new Error('Failed to fetch waitlist')
      return response.json()
    },
  })
}

export function useUpdateWaitlistEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<WaitlistEntry>
    }) => {
      const response = await fetch(`/api/admin/waitlist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update waitlist entry')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] })
    },
  })
}

export function useDeleteWaitlistEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/waitlist/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete waitlist entry')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] })
    },
  })
}

export function useExportWaitlist() {
  return useMutation({
    mutationFn: async (format: 'csv' | 'sheets') => {
      const response = await fetch(`/api/admin/waitlist/export?format=${format}`)
      if (!response.ok) throw new Error('Failed to export waitlist')

      if (format === 'csv') {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `waitlist-${new Date().toISOString()}.csv`
        a.click()
      }

      return response.json()
    },
  })
}
