/**
 * TanStack Query Configuration
 *
 * Centralized configuration for TanStack Query client.
 * This configuration can be customized based on environment or requirements.
 */

import type { QueryClientConfig } from '@tanstack/react-query';

/**
 * Default query options - Performance Optimized
 *
 * Changes from original:
 * - staleTime: 1 min → 5 min (reduce unnecessary refetches)
 * - retry: 1 → 0 (fail fast, don't wait for retries)
 * - Added cacheTime: 10 min (keep data in cache longer)
 */
const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes (was 1 minute)
  gcTime: 10 * 60 * 1000, // 10 minutes - formerly cacheTime in v4
  retry: 0, // Don't retry failed requests (was 1)
  refetchOnWindowFocus: false,
  refetchOnMount: false, // Don't refetch on component mount if data exists
  refetchOnReconnect: false, // Don't refetch on network reconnect
} as const;

/**
 * Default mutation options
 */
const defaultMutationOptions = {
  retry: 0,
} as const;

/**
 * Get QueryClient configuration
 *
 * @param overrides - Optional configuration overrides
 * @returns QueryClient configuration
 */
export function getQueryClientConfig(
  overrides?: Partial<QueryClientConfig>
): QueryClientConfig {
  return {
    defaultOptions: {
      queries: defaultQueryOptions,
      mutations: defaultMutationOptions,
    },
    ...overrides,
  };
}

/**
 * Query configuration constants
 */
export const QUERY_CONFIG = {
  /** Default stale time for queries (5 minutes) */
  DEFAULT_STALE_TIME: defaultQueryOptions.staleTime,
  /** Default garbage collection time (10 minutes) */
  DEFAULT_GC_TIME: defaultQueryOptions.gcTime,
  /** Default retry count for queries */
  DEFAULT_RETRY: defaultQueryOptions.retry,
  /** Whether to refetch on window focus */
  REFETCH_ON_WINDOW_FOCUS: defaultQueryOptions.refetchOnWindowFocus,
  /** Whether to refetch on mount */
  REFETCH_ON_MOUNT: defaultQueryOptions.refetchOnMount,
  /** Whether to refetch on reconnect */
  REFETCH_ON_RECONNECT: defaultQueryOptions.refetchOnReconnect,
  /** Default retry count for mutations */
  DEFAULT_MUTATION_RETRY: defaultMutationOptions.retry,
} as const;
