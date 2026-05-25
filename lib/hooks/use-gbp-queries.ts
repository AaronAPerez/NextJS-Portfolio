/**
 * GBP Query Hooks - TanStack Query hooks for GBP API data fetching
 * Provides caching, automatic refetching, and optimistic updates
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import {
  // Client API
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  type GBPClient,
  type CreateClientInput,
  type UpdateClientInput,
  // Lead API
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  type GBPLead,
  type LeadStats,
  type CreateLeadInput,
  type UpdateLeadInput,
  // Report API
  getReports,
  getReport,
  createReport,
  updateReport,
  type GBPReport,
  // Package API
  getPackages,
  updatePackage,
  type ServicePackage,
} from '@/lib/api/gbp-api'
import type { ClientStatus, LeadStatus, LeadSource } from '@/lib/stores'

// ============================================================================
// Query Keys - Centralized key management for cache invalidation
// ============================================================================

export const gbpQueryKeys = {
  // Clients
  clients: {
    all: ['gbp', 'clients'] as const,
    list: (filters: { status?: ClientStatus | 'all'; search?: string }) =>
      [...gbpQueryKeys.clients.all, 'list', filters] as const,
    detail: (id: string) => [...gbpQueryKeys.clients.all, 'detail', id] as const,
  },
  // Leads
  leads: {
    all: ['gbp', 'leads'] as const,
    list: (filters: { status?: LeadStatus | 'all'; source?: LeadSource | 'all'; search?: string }) =>
      [...gbpQueryKeys.leads.all, 'list', filters] as const,
    detail: (id: string) => [...gbpQueryKeys.leads.all, 'detail', id] as const,
  },
  // Reports
  reports: {
    all: ['gbp', 'reports'] as const,
    list: (filters: { client_id?: string; month?: string }) =>
      [...gbpQueryKeys.reports.all, 'list', filters] as const,
    detail: (id: string) => [...gbpQueryKeys.reports.all, 'detail', id] as const,
  },
  // Packages
  packages: {
    all: ['gbp', 'packages'] as const,
  },
}

// ============================================================================
// Client Hooks
// ============================================================================

interface UseClientsOptions {
  status?: ClientStatus | 'all'
  search?: string
  enabled?: boolean
}

/**
 * Hook to fetch GBP clients with filtering
 * Automatically caches and refetches data
 */
export function useClients(options: UseClientsOptions = {}) {
  const { status, search, enabled = true } = options

  return useQuery({
    queryKey: gbpQueryKeys.clients.list({ status, search }),
    queryFn: () => getClients({ status, search }),
    enabled,
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
  })
}

/**
 * Hook to fetch a single client by ID
 */
export function useClient(
  id: string,
  options?: Omit<UseQueryOptions<GBPClient, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: gbpQueryKeys.clients.detail(id),
    queryFn: () => getClient(id),
    enabled: !!id,
    ...options,
  })
}

/**
 * Hook to create a new client
 * Invalidates client list cache on success
 */
export function useCreateClient(
  options?: UseMutationOptions<GBPClient, Error, CreateClientInput>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      // Invalidate all client queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.clients.all })
    },
    ...options,
  })
}

/**
 * Hook to update a client
 * Supports optimistic updates for better UX
 */
export function useUpdateClient(
  options?: UseMutationOptions<GBPClient, Error, { id: string; data: UpdateClientInput }>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateClient(id, data),
    // Optimistic update
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: gbpQueryKeys.clients.detail(id) })

      // Snapshot the previous value
      const previousClient = queryClient.getQueryData<GBPClient>(
        gbpQueryKeys.clients.detail(id)
      )

      // Optimistically update
      if (previousClient) {
        queryClient.setQueryData(gbpQueryKeys.clients.detail(id), {
          ...previousClient,
          ...data,
        })
      }

      return { previousClient }
    },
    // Rollback on error
    onError: (_err, { id }, context) => {
      if (context?.previousClient) {
        queryClient.setQueryData(gbpQueryKeys.clients.detail(id), context.previousClient)
      }
    },
    // Refetch on settle
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.clients.detail(id) })
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.clients.all })
    },
    ...options,
  })
}

/**
 * Hook to delete a client
 */
export function useDeleteClient(options?: UseMutationOptions<void, Error, string>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.clients.all })
    },
    ...options,
  })
}

// ============================================================================
// Lead Hooks
// ============================================================================

interface UseLeadsOptions {
  status?: LeadStatus | 'all'
  source?: LeadSource | 'all'
  search?: string
  enabled?: boolean
}

interface LeadsData {
  leads: GBPLead[]
  stats: LeadStats
}

/**
 * Hook to fetch leads with filtering and stats
 */
export function useLeads(options: UseLeadsOptions = {}) {
  const { status, source, search, enabled = true } = options

  return useQuery({
    queryKey: gbpQueryKeys.leads.list({ status, source, search }),
    queryFn: () => getLeads({ status, source, search }),
    enabled,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

/**
 * Hook to fetch a single lead by ID
 */
export function useLead(
  id: string,
  options?: Omit<UseQueryOptions<GBPLead, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: gbpQueryKeys.leads.detail(id),
    queryFn: () => getLead(id),
    enabled: !!id,
    ...options,
  })
}

/**
 * Hook to create a new lead
 */
export function useCreateLead(options?: UseMutationOptions<GBPLead, Error, CreateLeadInput>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.leads.all })
    },
    ...options,
  })
}

/**
 * Hook to update a lead with optimistic updates
 */
export function useUpdateLead(
  options?: UseMutationOptions<GBPLead, Error, { id: string; data: UpdateLeadInput }>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateLead(id, data),
    // Optimistic update for status changes
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: gbpQueryKeys.leads.all })

      // Get current leads data
      const previousLeadsQueries = queryClient.getQueriesData<LeadsData>({
        queryKey: gbpQueryKeys.leads.all,
      })

      // Optimistically update leads in all cached queries
      previousLeadsQueries.forEach(([queryKey, leadsData]) => {
        if (leadsData?.leads) {
          queryClient.setQueryData(queryKey, {
            ...leadsData,
            leads: leadsData.leads.map((lead) =>
              lead.id === id ? { ...lead, ...data } : lead
            ),
          })
        }
      })

      return { previousLeadsQueries }
    },
    onError: (_err, _variables, context) => {
      // Rollback all cached queries
      context?.previousLeadsQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.leads.all })
    },
    ...options,
  })
}

/**
 * Hook to delete a lead
 */
export function useDeleteLead(options?: UseMutationOptions<void, Error, string>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.leads.all })
    },
    ...options,
  })
}

// ============================================================================
// Report Hooks
// ============================================================================

interface UseReportsOptions {
  client_id?: string
  month?: string
  enabled?: boolean
}

/**
 * Hook to fetch reports with filtering
 */
export function useReports(options: UseReportsOptions = {}) {
  const { client_id, month, enabled = true } = options

  return useQuery({
    queryKey: gbpQueryKeys.reports.list({ client_id, month }),
    queryFn: () => getReports({ client_id, month }),
    enabled,
    staleTime: 60 * 1000, // Reports change less frequently
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Hook to fetch a single report by ID
 */
export function useReport(
  id: string,
  options?: Omit<UseQueryOptions<GBPReport, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: gbpQueryKeys.reports.detail(id),
    queryFn: () => getReport(id),
    enabled: !!id,
    ...options,
  })
}

/**
 * Hook to create a new report
 */
export function useCreateReport(
  options?: UseMutationOptions<GBPReport, Error, Partial<GBPReport>>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.reports.all })
    },
    ...options,
  })
}

/**
 * Hook to update a report
 */
export function useUpdateReport(
  options?: UseMutationOptions<GBPReport, Error, { id: string; data: Partial<GBPReport> }>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateReport(id, data),
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.reports.detail(id) })
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.reports.all })
    },
    ...options,
  })
}

// ============================================================================
// Package Hooks
// ============================================================================

/**
 * Hook to fetch service packages
 */
export function usePackages() {
  return useQuery({
    queryKey: gbpQueryKeys.packages.all,
    queryFn: getPackages,
    staleTime: 5 * 60 * 1000, // Packages rarely change
    gcTime: 30 * 60 * 1000,
  })
}

/**
 * Hook to update a service package
 */
export function useUpdatePackage(
  options?: UseMutationOptions<ServicePackage, Error, { id: string; data: Partial<ServicePackage> }>
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gbpQueryKeys.packages.all })
    },
    ...options,
  })
}
