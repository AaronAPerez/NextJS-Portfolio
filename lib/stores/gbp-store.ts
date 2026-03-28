/**
 * GBP Store - Zustand store for GBP Optimization feature state management
 * Handles UI state, filters, and client-side caching
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ============================================================================
// Types
// ============================================================================

// Client status options
export type ClientStatus = 'lead' | 'onboarding' | 'active' | 'paused' | 'churned'

// Lead status options
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'converted' | 'lost'

// Lead source options
export type LeadSource = 'gbp_audit' | 'website' | 'referral' | 'cold_outreach' | 'social' | 'other'

// Filter state for clients dashboard
interface ClientFilters {
  status: ClientStatus | 'all'
  search: string
  sortBy: 'name' | 'created_at' | 'monthly_retainer' | 'status'
  sortOrder: 'asc' | 'desc'
}

// Filter state for leads management
interface LeadFilters {
  status: LeadStatus | 'all'
  source: LeadSource | 'all'
  search: string
  dateRange: 'all' | '7d' | '30d' | '90d'
  sortBy: 'created_at' | 'business_name' | 'audit_score' | 'status'
  sortOrder: 'asc' | 'desc'
}

// UI state for various GBP views
interface GBPUIState {
  // Sidebar collapsed state
  sidebarCollapsed: boolean
  // Currently expanded lead row (for expandable table rows)
  expandedLeadId: string | null
  // Currently selected client for detail view
  selectedClientId: string | null
  // Report editor active tab
  reportEditorTab: 'edit' | 'preview'
  // Intake wizard current step
  intakeCurrentStep: number
}

// Combined GBP store state
interface GBPStoreState {
  // Filters
  clientFilters: ClientFilters
  leadFilters: LeadFilters
  // UI State
  ui: GBPUIState
  // Actions - Client Filters
  setClientFilter: <K extends keyof ClientFilters>(key: K, value: ClientFilters[K]) => void
  resetClientFilters: () => void
  // Actions - Lead Filters
  setLeadFilter: <K extends keyof LeadFilters>(key: K, value: LeadFilters[K]) => void
  resetLeadFilters: () => void
  // Actions - UI State
  toggleSidebar: () => void
  setExpandedLeadId: (id: string | null) => void
  setSelectedClientId: (id: string | null) => void
  setReportEditorTab: (tab: 'edit' | 'preview') => void
  setIntakeStep: (step: number) => void
  nextIntakeStep: () => void
  prevIntakeStep: () => void
}

// ============================================================================
// Default Values
// ============================================================================

const defaultClientFilters: ClientFilters = {
  status: 'all',
  search: '',
  sortBy: 'created_at',
  sortOrder: 'desc',
}

const defaultLeadFilters: LeadFilters = {
  status: 'all',
  source: 'all',
  search: '',
  dateRange: 'all',
  sortBy: 'created_at',
  sortOrder: 'desc',
}

const defaultUIState: GBPUIState = {
  sidebarCollapsed: false,
  expandedLeadId: null,
  selectedClientId: null,
  reportEditorTab: 'edit',
  intakeCurrentStep: 0,
}

// ============================================================================
// Store
// ============================================================================

export const useGBPStore = create<GBPStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      clientFilters: defaultClientFilters,
      leadFilters: defaultLeadFilters,
      ui: defaultUIState,

      // ========================================
      // Client Filter Actions
      // ========================================

      setClientFilter: (key, value) => {
        set((state) => ({
          clientFilters: {
            ...state.clientFilters,
            [key]: value,
          },
        }))
      },

      resetClientFilters: () => {
        set({ clientFilters: defaultClientFilters })
      },

      // ========================================
      // Lead Filter Actions
      // ========================================

      setLeadFilter: (key, value) => {
        set((state) => ({
          leadFilters: {
            ...state.leadFilters,
            [key]: value,
          },
        }))
      },

      resetLeadFilters: () => {
        set({ leadFilters: defaultLeadFilters })
      },

      // ========================================
      // UI State Actions
      // ========================================

      toggleSidebar: () => {
        set((state) => ({
          ui: {
            ...state.ui,
            sidebarCollapsed: !state.ui.sidebarCollapsed,
          },
        }))
      },

      setExpandedLeadId: (id) => {
        set((state) => ({
          ui: {
            ...state.ui,
            expandedLeadId: id,
          },
        }))
      },

      setSelectedClientId: (id) => {
        set((state) => ({
          ui: {
            ...state.ui,
            selectedClientId: id,
          },
        }))
      },

      setReportEditorTab: (tab) => {
        set((state) => ({
          ui: {
            ...state.ui,
            reportEditorTab: tab,
          },
        }))
      },

      setIntakeStep: (step) => {
        set((state) => ({
          ui: {
            ...state.ui,
            intakeCurrentStep: step,
          },
        }))
      },

      nextIntakeStep: () => {
        set((state) => ({
          ui: {
            ...state.ui,
            intakeCurrentStep: Math.min(state.ui.intakeCurrentStep + 1, 5),
          },
        }))
      },

      prevIntakeStep: () => {
        set((state) => ({
          ui: {
            ...state.ui,
            intakeCurrentStep: Math.max(state.ui.intakeCurrentStep - 1, 0),
          },
        }))
      },
    }),
    {
      name: 'gbp-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist filter preferences and sidebar state
      partialize: (state) => ({
        clientFilters: state.clientFilters,
        leadFilters: state.leadFilters,
        ui: {
          sidebarCollapsed: state.ui.sidebarCollapsed,
        },
      }),
    }
  )
)

// ============================================================================
// Selectors - Memoized selectors for better performance
// ============================================================================

// Client filter selectors
export const selectClientFilters = (state: GBPStoreState) => state.clientFilters
export const selectClientStatus = (state: GBPStoreState) => state.clientFilters.status
export const selectClientSearch = (state: GBPStoreState) => state.clientFilters.search

// Lead filter selectors
export const selectLeadFilters = (state: GBPStoreState) => state.leadFilters
export const selectLeadStatus = (state: GBPStoreState) => state.leadFilters.status
export const selectLeadSource = (state: GBPStoreState) => state.leadFilters.source

// UI state selectors
export const selectUI = (state: GBPStoreState) => state.ui
export const selectSidebarCollapsed = (state: GBPStoreState) => state.ui.sidebarCollapsed
export const selectExpandedLeadId = (state: GBPStoreState) => state.ui.expandedLeadId
export const selectReportEditorTab = (state: GBPStoreState) => state.ui.reportEditorTab
export const selectIntakeStep = (state: GBPStoreState) => state.ui.intakeCurrentStep
