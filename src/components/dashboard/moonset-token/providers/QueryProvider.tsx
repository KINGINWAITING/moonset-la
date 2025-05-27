// React Query Provider for Token Data Management

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchCompleteTokenData } from '../utils/tokenApi';

// Create a query client with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 1 * 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime in v5)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Global error handler for queries
queryClient.setQueryDefaults(['token'], {
  // Specific defaults for token-related queries
  staleTime: 2 * 60 * 1000, // 2 minutes for token data
  gcTime: 10 * 60 * 1000, // 10 minutes cache time
});

// Price data needs more frequent updates
queryClient.setQueryDefaults(['token', 'price'], {
  staleTime: 30 * 1000, // 30 seconds
  gcTime: 2 * 60 * 1000, // 2 minutes
  refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
  refetchIntervalInBackground: false,
});

// Chart data can be cached longer
queryClient.setQueryDefaults(['token', 'chart'], {
  staleTime: 3 * 60 * 1000, // 3 minutes
  gcTime: 15 * 60 * 1000, // 15 minutes
});

interface TokenQueryProviderProps {
  children: ReactNode;
}

export function TokenQueryProvider({ children }: TokenQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          position="bottom"
        />
      )}
    </QueryClientProvider>
  );
}

// Export the query client for manual invalidation if needed
export { queryClient };

// Utility functions for cache management
export const tokenQueryUtils = {
  // Invalidate all token data
  invalidateAll: () => {
    queryClient.invalidateQueries({ queryKey: ['token'] });
  },
  
  // Invalidate specific token data
  invalidateToken: (tokenId: string) => {
    queryClient.invalidateQueries({ queryKey: ['token', tokenId] });
  },
  
  // Invalidate price data across all tokens
  invalidateAllPrices: () => {
    queryClient.invalidateQueries({ queryKey: ['token', 'price'] });
  },
  
  // Prefetch token data
  prefetchToken: async (tokenId: string) => {
    // fetchCompleteTokenData is now statically imported at the top

    return queryClient.prefetchQuery({
      queryKey: ['token', 'complete', tokenId],
      queryFn: () => fetchCompleteTokenData(tokenId),
      staleTime: 1 * 60 * 1000,
    });
  },
  
  // Get cached token data without triggering a fetch
  getCachedTokenData: (tokenId: string) => {
    return queryClient.getQueryData(['token', 'complete', tokenId]);
  },
  
  // Clear all token-related cache
  clearCache: () => {
    queryClient.clear();
  },
  
  // Get cache stats
  getCacheStats: () => {
    const queryCache = queryClient.getQueryCache();
    const queries = queryCache.getAll();
    
    const tokenQueries = queries.filter(query => 
      query.queryKey[0] === 'token'
    );
    
    return {
      totalQueries: queries.length,
      tokenQueries: tokenQueries.length,
      activeQueries: queries.filter(query => query.getObserversCount() > 0).length,
      staleQueries: queries.filter(query => query.isStale()).length,
      errorQueries: queries.filter(query => query.state.status === 'error').length,
    };
  },
};

// Hook for accessing query client
export function useTokenQueryClient() {
  return queryClient;
}

// Cache warming utilities
export const cacheWarming = {
  // Warm cache with popular tokens
  warmPopularTokens: async () => {
    const popularTokens = ['ethereum', 'bitcoin', 'uniswap'];
    
    const promises = popularTokens.map(tokenId => 
      tokenQueryUtils.prefetchToken(tokenId).catch(error => 
        console.warn(`Failed to prefetch ${tokenId}:`, error)
      )
    );
    
    await Promise.allSettled(promises);
  },
  
  // Pre-warm cache on app load
  preWarmCache: async () => {
    // Start with ethereum as default
    await tokenQueryUtils.prefetchToken('ethereum').catch(error =>
      console.warn('Failed to pre-warm cache:', error)
    );
  },
};

// Performance monitoring
export const performanceMonitor = {
  // Log query performance metrics
  logPerformanceMetrics: () => {
    const stats = tokenQueryUtils.getCacheStats();
    console.log('Query Cache Performance:', stats);
    
    // Log individual query states
    const queryCache = queryClient.getQueryCache();
    const tokenQueries = queryCache.getAll().filter(query => 
      query.queryKey[0] === 'token'
    );
    
    tokenQueries.forEach(query => {
      console.log(`Query ${query.queryKey.join('.')}:`, {
        status: query.state.status,
        dataUpdatedAt: query.state.dataUpdatedAt,
        isStale: query.isStale(),
        observerCount: query.getObserversCount(),
      });
    });
  },
  
  // Monitor network requests
  getNetworkMetrics: () => {
    const cache = queryClient.getQueryCache();
    const allQueries = cache.getAll();
    
    const networkRequests = allQueries.reduce((acc, query) => {
      if (query.state.fetchStatus === 'fetching') {
        acc.active++;
      }
      if (query.state.status === 'error') {
        acc.errors++;
      }
      if (query.state.status === 'success') {
        acc.successful++;
      }
      return acc;
    }, { active: 0, errors: 0, successful: 0 });
    
    return networkRequests;
  },
}; 