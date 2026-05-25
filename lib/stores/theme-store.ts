/**
 * Theme Store - Zustand store for managing application theme (light/dark mode)
 * Provides persistent theme preferences and system theme detection
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ============================================================================
// Types
// ============================================================================

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  // Current theme setting (user preference)
  theme: Theme
  // Resolved theme based on system preference when theme is 'system'
  resolvedTheme: 'light' | 'dark'
  // Actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  // Initialize system theme detection
  initializeTheme: () => void
}

// ============================================================================
// Store
// ============================================================================

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'dark', // Default to dark for initial SSR

      /**
       * Set the theme preference
       */
      setTheme: (theme: Theme) => {
        const resolvedTheme = resolveTheme(theme)
        set({ theme, resolvedTheme })
        applyThemeToDOM(resolvedTheme)
      },

      /**
       * Toggle between light and dark themes
       */
      toggleTheme: () => {
        const { theme } = get()
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark'
        get().setTheme(newTheme)
      },

      /**
       * Initialize theme detection on client side
       * Sets up system preference listener for 'system' theme
       */
      initializeTheme: () => {
        if (typeof window === 'undefined') return

        const { theme } = get()
        const resolvedTheme = resolveTheme(theme)
        set({ resolvedTheme })
        applyThemeToDOM(resolvedTheme)

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
          const { theme } = get()
          if (theme === 'system') {
            const newResolved = resolveTheme('system')
            set({ resolvedTheme: newResolved })
            applyThemeToDOM(newResolved)
          }
        }

        mediaQuery.addEventListener('change', handleChange)
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the theme preference, not the resolved theme
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Resolve the actual theme based on user preference and system settings
 */
function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

/**
 * Apply theme class to document element for CSS variable switching
 */
function applyThemeToDOM(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  // Remove existing theme classes
  root.classList.remove('light', 'dark')

  // Add new theme class
  root.classList.add(theme)

  // Update color-scheme for browser UI elements
  root.style.colorScheme = theme
}

// ============================================================================
// Selectors - Memoized selectors for better performance
// ============================================================================

export const selectTheme = (state: ThemeState) => state.theme
export const selectResolvedTheme = (state: ThemeState) => state.resolvedTheme
export const selectIsDarkMode = (state: ThemeState) => state.resolvedTheme === 'dark'
