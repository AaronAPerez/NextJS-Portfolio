import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  department?: string
  message: string
  status: string
  priority: string
  createdAt: string
  replied: boolean
}

export function useMessages() {
  return useQuery<ContactMessage[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await fetch('/api/admin/messages')
      if (!response.ok) throw new Error('Failed to fetch messages')
      return response.json()
    },
  })
}

export function useUpdateMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<ContactMessage>
    }) => {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update message')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete message')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export function useBulkUpdateMessages() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      ids,
      data,
    }: {
      ids: string[]
      data: Partial<ContactMessage>
    }) => {
      const response = await fetch('/api/admin/messages/bulk', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, data }),
      })
      if (!response.ok) throw new Error('Failed to bulk update messages')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}
