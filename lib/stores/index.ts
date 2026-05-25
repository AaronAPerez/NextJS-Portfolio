/**
 * Store Exports - Central export point for all Zustand stores
 * Import from here for cleaner imports throughout the application
 */

// Theme store for light/dark mode management
export {
  useThemeStore,
  selectTheme,
  selectResolvedTheme,
  selectIsDarkMode,
  type Theme,
} from './theme-store'

// GBP store for GBP Optimization feature state
export {
  useGBPStore,
  // Client filter selectors
  selectClientFilters,
  selectClientStatus,
  selectClientSearch,
  // Lead filter selectors
  selectLeadFilters,
  selectLeadStatus,
  selectLeadSource,
  // UI state selectors
  selectUI,
  selectSidebarCollapsed,
  selectExpandedLeadId,
  selectReportEditorTab,
  selectIntakeStep,
  // Types
  type ClientStatus,
  type LeadStatus,
  type LeadSource,
} from './gbp-store'
