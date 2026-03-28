'use client'

/**
 * Providers - Combined provider component for the application
 * Wraps the app with all necessary context providers in the correct order
 */

import { type ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Root providers component that combines all context providers
 * Order matters: outer providers can be accessed by inner providers
 *
 * Provider Stack (outer to inner):
 * 1. QueryProvider - TanStack Query for data fetching
 * 2. ThemeProvider - Theme/dark mode management
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}

export default Providers
