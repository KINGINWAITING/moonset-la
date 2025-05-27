// Token API Utilities for fetching real token data

import { TokenInfo, TokenPriceData, TokenMetrics, TokenChartData, TokenApiResponse, ApiError } from '../types/token.types';

// API Configuration
const API_CONFIG = {
  coingecko: {
    baseUrl: 'https://api.coingecko.com/api/v3',
    // Free tier rate limit: 10-30 calls/minute
    rateLimit: 30
  },
  etherscan: {
    baseUrl: 'https://api.etherscan.io/api',
    // Free tier rate limit: 5 calls/second
    rateLimit: 5
  }
};

// Default Moonset token data (fallback)
const MOONSET_TOKEN_INFO: TokenInfo = {
  id: 'moonset',
  symbol: 'MOON',
  name: 'Moonset Token',
  description: 'Moonset is a community-driven token focused on building decentralized applications and tools.',
  contractAddress: '0x1234567890123456789012345678901234567890', // Replace with actual contract
  decimals: 18,
  totalSupply: '1000000000',
  logoUrl: '/moonset-logo.png',
  website: 'https://moonset.io',
  twitter: 'https://twitter.com/moonsettoken',
  telegram: 'https://t.me/moonsettoken',
  coingeckoId: 'moonset-token',
  verified: true
};

// Cache implementation
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttlMs: number = 60000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttlMs
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new SimpleCache();

// Rate limiting
class RateLimiter {
  private requests: number[] = [];
  
  constructor(private maxRequests: number, private windowMs: number = 60000) {}

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }
}

const rateLimiter = new RateLimiter(25); // Conservative limit

// HTTP utility with error handling
async function fetchWithRetry(url: string, retries: number = 2): Promise<any> {
  if (!rateLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded. Please wait before making more requests.');
  }

  for (let i = 0; i <= retries; i++) {
    try {
      rateLimiter.recordRequest();
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

// Format and validate token data
function formatTokenInfo(data: any): TokenInfo {
  return {
    id: data.id || MOONSET_TOKEN_INFO.id,
    symbol: (data.symbol || MOONSET_TOKEN_INFO.symbol).toUpperCase(),
    name: data.name || MOONSET_TOKEN_INFO.name,
    description: data.description?.en || MOONSET_TOKEN_INFO.description,
    contractAddress: data.contract_address || MOONSET_TOKEN_INFO.contractAddress,
    decimals: data.detail_platforms?.ethereum?.decimal_place || MOONSET_TOKEN_INFO.decimals,
    totalSupply: data.market_data?.total_supply?.toString() || MOONSET_TOKEN_INFO.totalSupply,
    logoUrl: data.image?.large || data.image?.small || MOONSET_TOKEN_INFO.logoUrl,
    website: data.links?.homepage?.[0] || MOONSET_TOKEN_INFO.website,
    twitter: data.links?.twitter_screen_name ? `https://twitter.com/${data.links.twitter_screen_name}` : MOONSET_TOKEN_INFO.twitter,
    telegram: data.links?.telegram_channel_identifier ? `https://t.me/${data.links.telegram_channel_identifier}` : MOONSET_TOKEN_INFO.telegram,
    coingeckoId: data.id || MOONSET_TOKEN_INFO.coingeckoId,
    verified: data.community_score > 0 || MOONSET_TOKEN_INFO.verified
  };
}

function formatPriceData(data: any): TokenPriceData {
  const currentPrice = data.market_data?.current_price?.usd || 0;
  const change24h = data.market_data?.price_change_24h || 0;
  const change24hPercent = data.market_data?.price_change_percentage_24h || 0;

  return {
    current: currentPrice,
    currency: 'USD',
    change24h,
    change24hPercent,
    change7d: data.market_data?.price_change_7d,
    change7dPercent: data.market_data?.price_change_percentage_7d,
    change1h: data.market_data?.price_change_1h,
    change1hPercent: data.market_data?.price_change_percentage_1h,
    high24h: data.market_data?.high_24h?.usd,
    low24h: data.market_data?.low_24h?.usd,
    lastUpdated: new Date(data.last_updated || Date.now())
  };
}

function formatMetrics(data: any): TokenMetrics {
  return {
    marketCap: data.market_data?.market_cap?.usd,
    volume24h: data.market_data?.total_volume?.usd,
    volumeChange24h: data.market_data?.volume_change_24h,
    liquidityUsd: data.market_data?.total_value_locked?.usd,
    holders: data.community_data?.reddit_subscribers,
    circulatingSupply: data.market_data?.circulating_supply,
    totalSupply: data.market_data?.total_supply,
    fullyDilutedMarketCap: data.market_data?.fully_diluted_valuation?.usd,
    allTimeHigh: data.market_data?.ath?.usd,
    allTimeLow: data.market_data?.atl?.usd,
    athDate: data.market_data?.ath_date?.usd ? new Date(data.market_data.ath_date.usd) : undefined,
    atlDate: data.market_data?.atl_date?.usd ? new Date(data.market_data.atl_date.usd) : undefined
  };
}

// Main API functions
export async function fetchTokenInfo(tokenId: string = 'ethereum'): Promise<TokenInfo> {
  const cacheKey = `token-info-${tokenId}`;
  const cached = cache.get<TokenInfo>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const url = `${API_CONFIG.coingecko.baseUrl}/coins/${tokenId}`;
    const data = await fetchWithRetry(url);
    const tokenInfo = formatTokenInfo(data);
    
    cache.set(cacheKey, tokenInfo, 300000); // Cache for 5 minutes
    return tokenInfo;
  } catch (error) {
    console.warn('Failed to fetch token info, using fallback:', error);
    return MOONSET_TOKEN_INFO;
  }
}

export async function fetchTokenPrice(tokenId: string = 'ethereum'): Promise<TokenPriceData> {
  const cacheKey = `token-price-${tokenId}`;
  const cached = cache.get<TokenPriceData>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const url = `${API_CONFIG.coingecko.baseUrl}/coins/${tokenId}`;
    const data = await fetchWithRetry(url);
    const priceData = formatPriceData(data);
    
    cache.set(cacheKey, priceData, 30000); // Cache for 30 seconds
    return priceData;
  } catch (error) {
    console.warn('Failed to fetch token price, using fallback:', error);
    return {
      current: 0,
      currency: 'USD',
      change24h: 0,
      change24hPercent: 0,
      lastUpdated: new Date()
    };
  }
}

export async function fetchTokenMetrics(tokenId: string = 'ethereum'): Promise<TokenMetrics> {
  const cacheKey = `token-metrics-${tokenId}`;
  const cached = cache.get<TokenMetrics>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const url = `${API_CONFIG.coingecko.baseUrl}/coins/${tokenId}`;
    const data = await fetchWithRetry(url);
    const metrics = formatMetrics(data);
    
    cache.set(cacheKey, metrics, 120000); // Cache for 2 minutes
    return metrics;
  } catch (error) {
    console.warn('Failed to fetch token metrics, using fallback:', error);
    return {};
  }
}

export async function fetchTokenChart(
  tokenId: string = 'ethereum', 
  days: number = 7
): Promise<TokenChartData[]> {
  const cacheKey = `token-chart-${tokenId}-${days}`;
  const cached = cache.get<TokenChartData[]>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const url = `${API_CONFIG.coingecko.baseUrl}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`;
    const data = await fetchWithRetry(url);
    
    const chartData: TokenChartData[] = data.prices?.map((price: [number, number], index: number) => ({
      timestamp: price[0],
      price: price[1],
      volume: data.total_volumes?.[index]?.[1]
    })) || [];
    
    cache.set(cacheKey, chartData, 180000); // Cache for 3 minutes
    return chartData;
  } catch (error) {
    console.warn('Failed to fetch chart data, using fallback:', error);
    return [];
  }
}

// Combined fetch function for efficiency
export async function fetchCompleteTokenData(tokenId: string = 'ethereum'): Promise<TokenApiResponse> {
  try {
    const [token, price, metrics, chart] = await Promise.allSettled([
      fetchTokenInfo(tokenId),
      fetchTokenPrice(tokenId),
      fetchTokenMetrics(tokenId),
      fetchTokenChart(tokenId)
    ]);

    return {
      token: token.status === 'fulfilled' ? token.value : MOONSET_TOKEN_INFO,
      price: price.status === 'fulfilled' ? price.value : {
        current: 0,
        currency: 'USD',
        change24h: 0,
        change24hPercent: 0,
        lastUpdated: new Date()
      },
      metrics: metrics.status === 'fulfilled' ? metrics.value : {},
      chart: chart.status === 'fulfilled' ? chart.value : []
    };
  } catch (error) {
    return {
      token: MOONSET_TOKEN_INFO,
      price: {
        current: 0,
        currency: 'USD',
        change24h: 0,
        change24hPercent: 0,
        lastUpdated: new Date()
      },
      metrics: {},
      chart: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Utility functions
export function formatPrice(price: number, currency: string = 'USD'): string {
  if (price === 0) return '$0.00';
  
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 1000) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
}

export function formatMarketCap(value: number | undefined): string {
  if (!value) return 'N/A';
  
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
}

export function formatPercentage(value: number | undefined): string {
  if (value === undefined || value === null) return '0.00%';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function getPercentageColor(value: number | undefined): 'success' | 'error' | 'neutral' {
  if (value === undefined || value === null || value === 0) return 'neutral';
  return value > 0 ? 'success' : 'error';
} 