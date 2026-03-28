/**
 * GBP API Service Layer - Centralized API calls for GBP Optimization feature
 * Provides type-safe API functions with consistent error handling
 */

import type { ClientStatus, LeadStatus, LeadSource } from '@/lib/stores'

// ============================================================================
// Types - API Response Wrappers
// ============================================================================

export interface ApiResponse<T> {
  data: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ============================================================================
// Types - Client
// ============================================================================

export interface GBPClient {
  id: string
  business_name: string
  status: ClientStatus
  monthly_retainer: number
  contact_email: string
  contact_phone: string
  website_url: string
  gbp_url: string
  service_area: string
  business_category: string
  // Metrics
  total_citations: number
  total_keywords: number
  avg_review_rating: number
  total_reviews: number
  // Timestamps
  created_at: string
  updated_at: string
  onboarding_completed_at: string | null
}

export interface CreateClientInput {
  business_name: string
  contact_email: string
  contact_phone?: string
  website_url?: string
  gbp_url?: string
  service_area?: string
  business_category?: string
  monthly_retainer?: number
}

export interface UpdateClientInput {
  business_name?: string
  status?: ClientStatus
  contact_email?: string
  contact_phone?: string
  website_url?: string
  gbp_url?: string
  service_area?: string
  business_category?: string
  monthly_retainer?: number
}

// ============================================================================
// Types - Lead
// ============================================================================

export interface GBPLead {
  id: string
  business_name: string
  contact_name: string
  email: string
  phone: string
  website_url: string
  status: LeadStatus
  source: LeadSource
  audit_score: number | null
  audit_grade: string | null
  audit_data: Record<string, unknown> | null
  notes: string | null
  last_contacted_at: string | null
  converted_to_client_id: string | null
  created_at: string
  updated_at: string
}

export interface LeadStats {
  total: number
  new_leads: number
  contacted: number
  qualified: number
  converted: number
  last_7_days: number
  last_30_days: number
}

export interface CreateLeadInput {
  business_name: string
  contact_name?: string
  email: string
  phone?: string
  website_url?: string
  source?: LeadSource
  audit_score?: number
  audit_grade?: string
  audit_data?: Record<string, unknown>
}

export interface UpdateLeadInput {
  status?: LeadStatus
  notes?: string
  last_contacted_at?: string
}

// ============================================================================
// Types - Report
// ============================================================================

export interface GBPReport {
  id: string
  client_id: string
  report_month: string
  campaign_month: number
  // Profile metrics
  profile_views_total: number
  profile_views_search: number
  profile_views_maps: number
  profile_views_change: number
  // Customer actions
  website_clicks: number
  phone_calls: number
  direction_requests: number
  // Content
  photos_uploaded: number
  posts_published: number
  // Reviews
  reviews_received: number
  avg_rating: number
  review_response_rate: number
  // Other
  citations_added: number
  citations_cleaned: number
  // Narrative
  executive_summary: string
  monthly_highlight: string
  next_month_focus: string
  // Timestamps
  created_at: string
  updated_at: string
}

// ============================================================================
// API Functions - Clients
// ============================================================================

interface GetClientsParams {
  status?: ClientStatus | 'all'
  search?: string
  limit?: number
  offset?: number
}

/**
 * Fetch all GBP clients with optional filtering
 */
export async function getClients(params: GetClientsParams = {}): Promise<GBPClient[]> {
  const searchParams = new URLSearchParams()

  if (params.status && params.status !== 'all') {
    searchParams.set('status', params.status)
  }
  if (params.search) {
    searchParams.set('search', params.search)
  }
  if (params.limit) {
    searchParams.set('limit', params.limit.toString())
  }
  if (params.offset) {
    searchParams.set('offset', params.offset.toString())
  }

  const url = `/api/gbp/clients${searchParams.toString() ? `?${searchParams}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch clients: ${response.statusText}`)
  }

  const data = await response.json()
  return data.clients || data
}

/**
 * Fetch a single client by ID
 */
export async function getClient(id: string): Promise<GBPClient> {
  const response = await fetch(`/api/gbp/clients/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch client: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Create a new GBP client
 */
export async function createClient(input: CreateClientInput): Promise<GBPClient> {
  const response = await fetch('/api/gbp/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to create client: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Update an existing client
 */
export async function updateClient(id: string, input: UpdateClientInput): Promise<GBPClient> {
  const response = await fetch(`/api/gbp/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to update client: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Delete a client
 */
export async function deleteClient(id: string): Promise<void> {
  const response = await fetch(`/api/gbp/clients/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete client: ${response.statusText}`)
  }
}

// ============================================================================
// API Functions - Leads
// ============================================================================

interface GetLeadsParams {
  status?: LeadStatus | 'all'
  source?: LeadSource | 'all'
  search?: string
  limit?: number
  offset?: number
}

interface GetLeadsResponse {
  leads: GBPLead[]
  stats: LeadStats
}

/**
 * Fetch all leads with optional filtering and stats
 */
export async function getLeads(params: GetLeadsParams = {}): Promise<GetLeadsResponse> {
  const searchParams = new URLSearchParams()

  if (params.status && params.status !== 'all') {
    searchParams.set('status', params.status)
  }
  if (params.source && params.source !== 'all') {
    searchParams.set('source', params.source)
  }
  if (params.search) {
    searchParams.set('search', params.search)
  }
  if (params.limit) {
    searchParams.set('limit', params.limit.toString())
  }
  if (params.offset) {
    searchParams.set('offset', params.offset.toString())
  }

  const url = `/api/gbp/leads${searchParams.toString() ? `?${searchParams}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch leads: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch a single lead by ID
 */
export async function getLead(id: string): Promise<GBPLead> {
  const response = await fetch(`/api/gbp/leads/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch lead: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Create a new lead (typically from audit form)
 */
export async function createLead(input: CreateLeadInput): Promise<GBPLead> {
  const response = await fetch('/api/gbp/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to create lead: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Update a lead (status, notes, etc.)
 */
export async function updateLead(id: string, input: UpdateLeadInput): Promise<GBPLead> {
  const response = await fetch(`/api/gbp/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to update lead: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<void> {
  const response = await fetch(`/api/gbp/leads/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete lead: ${response.statusText}`)
  }
}

// ============================================================================
// API Functions - Reports
// ============================================================================

interface GetReportsParams {
  client_id?: string
  month?: string
  limit?: number
  offset?: number
}

/**
 * Fetch reports with optional filtering
 */
export async function getReports(params: GetReportsParams = {}): Promise<GBPReport[]> {
  const searchParams = new URLSearchParams()

  if (params.client_id) {
    searchParams.set('client_id', params.client_id)
  }
  if (params.month) {
    searchParams.set('month', params.month)
  }
  if (params.limit) {
    searchParams.set('limit', params.limit.toString())
  }
  if (params.offset) {
    searchParams.set('offset', params.offset.toString())
  }

  const url = `/api/gbp/reports${searchParams.toString() ? `?${searchParams}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.statusText}`)
  }

  const data = await response.json()
  return data.reports || data
}

/**
 * Fetch a single report by ID
 */
export async function getReport(id: string): Promise<GBPReport> {
  const response = await fetch(`/api/gbp/reports/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch report: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Create a new monthly report
 */
export async function createReport(input: Partial<GBPReport>): Promise<GBPReport> {
  const response = await fetch('/api/gbp/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to create report: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Update an existing report
 */
export async function updateReport(id: string, input: Partial<GBPReport>): Promise<GBPReport> {
  const response = await fetch(`/api/gbp/reports/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to update report: ${response.statusText}`)
  }

  return response.json()
}

// ============================================================================
// API Functions - Service Packages
// ============================================================================

export interface ServicePackage {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  is_popular: boolean
  sort_order: number
}

/**
 * Fetch all service packages
 */
export async function getPackages(): Promise<ServicePackage[]> {
  const response = await fetch('/api/gbp/packages')

  if (!response.ok) {
    throw new Error(`Failed to fetch packages: ${response.statusText}`)
  }

  const data = await response.json()
  return data.packages || data
}

/**
 * Update a service package
 */
export async function updatePackage(id: string, input: Partial<ServicePackage>): Promise<ServicePackage> {
  const response = await fetch(`/api/gbp/packages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to update package: ${response.statusText}`)
  }

  return response.json()
}
