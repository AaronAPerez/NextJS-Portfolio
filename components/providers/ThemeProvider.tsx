'use client'

/**
 * ThemeProvider - Provides theme context and dark mode functionality
 * Uses Zustand for state management with localStorage persistence
 * Handles system theme detection and manual theme switching
 */

import { useEffect, createContext, useContext, type ReactNode } from 'react'
import { useThemeStore, type Theme } from '@/lib/stores'

// ============================================================================
// Context
// ============================================================================

interface ThemeContextValue {
  /** Current theme setting ('light', 'dark', or 'system') */
  theme: Theme
  /** Resolved theme based on system preference when theme is 'system' */
  resolvedTheme: 'light' | 'dark'
  /** Whether dark mode is currently active */
  isDarkMode: boolean
  /** Set the theme preference */
  setTheme: (theme: Theme) => void
  /** Toggle between light and dark themes */
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ============================================================================
// Provider Component
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode
  /** Default theme to use if no preference is stored */
  defaultTheme?: Theme
  /** Force a specific theme (useful for previews) */
  forcedTheme?: 'light' | 'dark'
  /** Disable transitions during theme changes to prevent flash */
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  forcedTheme,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  // Get state and actions from Zustand store
  const theme = useThemeStore((state) => state.theme)
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const initializeTheme = useThemeStore((state) => state.initializeTheme)

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  // Apply forced theme if specified
  useEffect(() => {
    if (forcedTheme) {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(forcedTheme)
      document.documentElement.style.colorScheme = forcedTheme
    }
  }, [forcedTheme])

  // Handle theme changes with optional transition disabling
  useEffect(() => {
    if (disableTransitionOnChange) {
      // Temporarily disable transitions
      const css = document.createElement('style')
      css.type = 'text/css'
      css.appendChild(
        document.createTextNode(
          `* {
            -webkit-transition: none !important;
            -moz-transition: none !important;
            -o-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
          }`
        )
      )
      document.head.appendChild(css)

      // Re-enable transitions after a tick
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.head.removeChild(css)
        })
      })
    }
  }, [resolvedTheme, disableTransitionOnChange])

  // Context value
  const value: ThemeContextValue = {
    theme,
    resolvedTheme: forcedTheme || resolvedTheme,
    isDarkMode: (forcedTheme || resolvedTheme) === 'dark',
    setTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access theme context
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

// ============================================================================
// Theme Toggle Component
// ============================================================================

interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string
  /** Size of the toggle button */
  size?: 'sm' | 'md' | 'lg'
  /** Show label text */
  showLabel?: boolean
}

/**
 * Theme toggle button component
 * Displays sun/moon icon based on current theme
 */
export function ThemeToggle({
  className = '',
  size = 'md',
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme()

  // Size classes
  const sizeClasses = {
    sm: 'p-1.5 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-300
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for dark mode (click to switch to light) */}
      {resolvedTheme === 'dark' ? (
        <svg
          className={iconSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        /* Moon icon for light mode (click to switch to dark) */
        <svg
          className={iconSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      {showLabel && (
        <span className="sr-only sm:not-sr-only">
          {resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode
        </span>
      )}
    </button>
  )
}

// ============================================================================
// Theme Selector Component (for settings pages)
// ============================================================================

interface ThemeSelectorProps {
  /** Additional CSS classes */
  className?: string
}

/**
 * Theme selector with radio buttons for all theme options
 */
export function ThemeSelector({ className = '' }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme()

  const options: { value: Theme; label: string; description: string }[] = [
    {
      value: 'light',
      label: 'Light',
      description: 'Always use light mode',
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Always use dark mode',
    },
    {
      value: 'system',
      label: 'System',
      description: 'Follow system preference',
    },
  ]

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Theme
      </label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
              ${
                theme === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            {/* Theme preview icon */}
            <div
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${
                  option.value === 'light'
                    ? 'bg-white border border-gray-200'
                    : option.value === 'dark'
                    ? 'bg-gray-900 border border-gray-700'
                    : 'bg-gradient-to-r from-white to-gray-900 border border-gray-400'
                }
              `}
            >
              {option.value === 'light' && (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {option.value === 'dark' && (
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
              {option.value === 'system' && (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <span
              className={`
                text-sm font-medium
                ${theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
              `}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
