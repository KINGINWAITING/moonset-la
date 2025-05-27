// Custom hooks for token data management using React Query

import { useQuery, useQueries } from '@tanstack/react-query';
import { 
  TokenInfo, 
  TokenPriceData, 
  TokenMetrics, 
  TokenChartData, 
  TokenApiResponse 
} from '../types/token.types';
import { 
  fetchTokenInfo, 
  fetchTokenPrice, 
  fetchTokenMetrics, 
  fetchTokenChart,
  fetchCompleteTokenData 
} from '../utils/tokenApi';

// Query keys for consistent caching
export const queryKeys = {
  token: (id: string) => ['token', id] as const,
  tokenPrice: (id: string) => ['token', 'price', id] as const,
  tokenMetrics: (id: string) => ['token', 'metrics', id] as const,
  tokenChart: (id: string, days: number) => ['token', 'chart', id, days] as const,
  tokenComplete: (id: string) => ['token', 'complete', id] as const,
};

// Hook for token basic information
export function useTokenInfo(tokenId: string = 'ethereum') {
  return useQuery({
    queryKey: queryKeys.token(tokenId),
    queryFn: () => fetchTokenInfo(tokenId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
}

// Hook for real-time token price data
export function useTokenPrice(tokenId: string = 'ethereum') {
  return useQuery({
    queryKey: queryKeys.tokenPrice(tokenId),
    queryFn: () => fetchTokenPrice(tokenId),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
}

// Hook for token market metrics
export function useTokenMetrics(tokenId: string = 'ethereum') {
  return useQuery({
    queryKey: queryKeys.tokenMetrics(tokenId),
    queryFn: () => fetchTokenMetrics(tokenId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 20000),
    refetchOnWindowFocus: false,
  });
}

// Hook for token price chart data
export function useTokenChart(tokenId: string = 'ethereum', days: number = 7) {
  return useQuery({
    queryKey: queryKeys.tokenChart(tokenId, days),
    queryFn: () => fetchTokenChart(tokenId, days),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 15000),
    refetchOnWindowFocus: false,
    enabled: days > 0, // Only fetch if days is valid
  });
}

// Hook for complete token data (optimized for initial load)
export function useCompleteTokenData(tokenId: string = 'ethereum') {
  return useQuery({
    queryKey: queryKeys.tokenComplete(tokenId),
    queryFn: () => fetchCompleteTokenData(tokenId),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 20000),
    refetchOnWindowFocus: false,
  });
}

// Hook for multiple chart timeframes
export function useTokenChartMultiple(tokenId: string = 'ethereum') {
  const timeframes = [
    { label: '24H', days: 1 },
    { label: '7D', days: 7 },
    { label: '30D', days: 30 },
    { label: '90D', days: 90 }
  ];

  const queries = useQueries({
    queries: timeframes.map(timeframe => ({
      queryKey: queryKeys.tokenChart(tokenId, timeframe.days),
      queryFn: () => fetchTokenChart(tokenId, timeframe.days),
      staleTime: 3 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      enabled: true,
    }))
  });

  return timeframes.map((timeframe, index) => ({
    ...timeframe,
    ...queries[index],
  }));
}

// Combined hook for dashboard overview
export function useTokenDashboard(tokenId: string = 'ethereum') {
  const tokenInfo = useTokenInfo(tokenId);
  const tokenPrice = useTokenPrice(tokenId);
  const tokenMetrics = useTokenMetrics(tokenId);
  const tokenChart = useTokenChart(tokenId, 7); // Default to 7 days

  const isLoading = tokenInfo.isLoading || tokenPrice.isLoading || tokenMetrics.isLoading || tokenChart.isLoading;
  const isError = tokenInfo.isError || tokenPrice.isError || tokenMetrics.isError || tokenChart.isError;
  const error = tokenInfo.error || tokenPrice.error || tokenMetrics.error || tokenChart.error;

  // Calculate overall loading state
  const loadingStates = {
    info: tokenInfo.isLoading,
    price: tokenPrice.isLoading,
    metrics: tokenMetrics.isLoading,
    chart: tokenChart.isLoading,
  };

  // Calculate data freshness
  const lastUpdated = Math.min(
    tokenInfo.dataUpdatedAt || 0,
    tokenPrice.dataUpdatedAt || 0,
    tokenMetrics.dataUpdatedAt || 0,
    tokenChart.dataUpdatedAt || 0
  );

  return {
    // Individual data
    token: tokenInfo.data,
    price: tokenPrice.data,
    metrics: tokenMetrics.data,
    chart: tokenChart.data,
    
    // Combined states
    isLoading,
    isError,
    error,
    loadingStates,
    lastUpdated: lastUpdated ? new Date(lastUpdated) : null,
    
    // Individual loading states for granular control
    tokenInfo,
    tokenPrice,
    tokenMetrics,
    tokenChart,
    
    // Refetch functions
    refetchAll: () => {
      tokenInfo.refetch();
      tokenPrice.refetch();
      tokenMetrics.refetch();
      tokenChart.refetch();
    },
    
    refetchPrice: tokenPrice.refetch,
    refetchMetrics: tokenMetrics.refetch,
    refetchChart: tokenChart.refetch,
  };
}

// Hook for price updates with animation support
export function useAnimatedPrice(tokenId: string = 'ethereum') {
  const { data: currentPrice, ...priceQuery } = useTokenPrice(tokenId);
  
  return {
    currentPrice,
    ...priceQuery,
    // Helper for animation classes
    getPriceChangeClass: () => {
      if (!currentPrice?.change24hPercent) return '';
      return currentPrice.change24hPercent > 0 ? 'text-green-500' : 'text-red-500';
    },
    
    // Helper for price trend
    getPriceTrend: (): 'up' | 'down' | 'neutral' => {
      if (!currentPrice?.change24hPercent) return 'neutral';
      return currentPrice.change24hPercent > 0 ? 'up' : 'down';
    }
  };
}

// Hook for error boundary integration
export function useTokenErrorState(tokenId: string = 'ethereum') {
  const queries = useTokenDashboard(tokenId);
  
  const errors = [
    queries.tokenInfo.error,
    queries.tokenPrice.error,
    queries.tokenMetrics.error,
    queries.tokenChart.error,
  ].filter(Boolean);

  const hasErrors = errors.length > 0;
  const criticalError = queries.tokenInfo.isError; // Token info is critical
  
  return {
    hasErrors,
    criticalError,
    errors,
    errorCount: errors.length,
    
    // Recovery actions
    retryAll: queries.refetchAll,
    retryPrice: queries.refetchPrice,
    
    // Error messages for UI
    getErrorMessage: () => {
      if (criticalError) {
        return 'Unable to load token information. Please try again.';
      }
      if (queries.tokenPrice.isError) {
        return 'Price data temporarily unavailable.';
      }
      if (queries.tokenMetrics.isError) {
        return 'Market metrics temporarily unavailable.';
      }
      if (queries.tokenChart.isError) {
        return 'Chart data temporarily unavailable.';
      }
      return 'Some data temporarily unavailable.';
    }
  };
}

// Hook for performance monitoring
export function useTokenPerformance(tokenId: string = 'ethereum') {
  const queries = useTokenDashboard(tokenId);
  
  return {
    // Loading performance
    loadTimes: {
      info: queries.tokenInfo.dataUpdatedAt ? queries.tokenInfo.dataUpdatedAt - (queries.tokenInfo.fetchedAt || 0) : 0,
      price: queries.tokenPrice.dataUpdatedAt ? queries.tokenPrice.dataUpdatedAt - (queries.tokenPrice.fetchedAt || 0) : 0,
      metrics: queries.tokenMetrics.dataUpdatedAt ? queries.tokenMetrics.dataUpdatedAt - (queries.tokenMetrics.fetchedAt || 0) : 0,
      chart: queries.tokenChart.dataUpdatedAt ? queries.tokenChart.dataUpdatedAt - (queries.tokenChart.fetchedAt || 0) : 0,
    },
    
    // Cache hit rates
    cacheStates: {
      info: queries.tokenInfo.status,
      price: queries.tokenPrice.status,
      metrics: queries.tokenMetrics.status,
      chart: queries.tokenChart.status,
    },
    
    // Overall performance score
    performanceScore: () => {
      const totalQueries = 4;
      const successfulQueries = [
        queries.tokenInfo.isSuccess,
        queries.tokenPrice.isSuccess,
        queries.tokenMetrics.isSuccess,
        queries.tokenChart.isSuccess,
      ].filter(Boolean).length;
      
      return (successfulQueries / totalQueries) * 100;
    }
  };
} 