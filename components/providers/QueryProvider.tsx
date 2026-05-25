'use client'

/**
 * QueryProvider - TanStack Query provider for data fetching
 * Provides caching, automatic refetching, and error handling
 */

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// ============================================================================
// Query Client Configuration
// ============================================================================

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 60 seconds
        staleTime: 60 * 1000,
        // Keep unused data in cache for 5 minutes
        gcTime: 5 * 60 * 1000,
        // Retry failed queries up to 3 times
        retry: 3,
        // Exponential backoff for retries
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus for fresh data
        refetchOnWindowFocus: true,
        // Don't refetch on reconnect by default
        refetchOnReconnect: 'always',
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
      },
    },
  })
}

// Browser query client singleton
let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new query client
    return makeQueryClient()
  } else {
    // Browser: create a singleton query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient()
    }
    return browserQueryClient
  }
}

// ============================================================================
// Provider Component
// ============================================================================

interface QueryProviderProps {
  children: ReactNode
  /** Show React Query Devtools in development */
  showDevtools?: boolean
}

/**
 * QueryProvider wraps the application with TanStack Query context
 * Provides data fetching, caching, and synchronization capabilities
 */
export function QueryProvider({
  children,
  showDevtools = process.env.NODE_ENV === 'development',
}: QueryProviderProps) {
  // Use singleton pattern for query client
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  )
}

// ============================================================================
// Re-export useful utilities
// ============================================================================

export { useQueryClient, useIsFetching, useIsMutating } from '@tanstack/react-query'
