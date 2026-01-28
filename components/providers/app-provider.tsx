'use client';

import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getQueryClientConfig } from '@/configs/query.config';

/**
 * Memoized children component to prevent unnecessary re-renders
 * Only re-renders when children prop actually changes
 */
const MemoizedChildren = memo(({ children }: { children: ReactNode }) => {
  return <>{children}</>;
});

MemoizedChildren.displayName = 'MemoizedChildren';

/**
 * Creates an optimized QueryClient without global error subscriptions
 *
 * Why remove subscriptions?
 * - Errors are already handled at HTTP client level
 * - Reduces overhead from subscribing to all query/mutation events
 * - Per-query/mutation error handling is more explicit and performant
 */
function createOptimizedQueryClient(): QueryClient {
  return new QueryClient(getQueryClientConfig());
}

export function AppProviders({ children }: Readonly<{ children: ReactNode }>) {
  // Memoize QueryClient to prevent recreation on every render
  // Using optimized version without global error subscriptions
  const queryClient = useMemo(() => createOptimizedQueryClient(), []);

  // Theme config is now imported from config file - no need to memoize

  return (
    <QueryClientProvider client={queryClient}>
      <MemoizedChildren>{children}</MemoizedChildren>
    </QueryClientProvider>
  );
}
