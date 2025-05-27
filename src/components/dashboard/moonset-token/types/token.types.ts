// Token Types and Interfaces for Moonset Token Page

export interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
  description?: string;
  contractAddress: string;
  decimals: number;
  totalSupply?: string;
  logoUrl?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  coingeckoId?: string;
  verified: boolean;
}

export interface TokenPriceData {
  current: number;
  currency: string;
  change24h: number;
  change24hPercent: number;
  change7d?: number;
  change7dPercent?: number;
  change1h?: number;
  change1hPercent?: number;
  high24h?: number;
  low24h?: number;
  lastUpdated: Date;
}

export interface TokenMetrics {
  marketCap?: number;
  volume24h?: number;
  volumeChange24h?: number;
  liquidityUsd?: number;
  holders?: number;
  circulatingSupply?: number;
  totalSupply?: number;
  fullyDilutedMarketCap?: number;
  allTimeHigh?: number;
  allTimeLow?: number;
  athDate?: Date;
  atlDate?: Date;
}

export interface TokenChartData {
  timestamp: number;
  price: number;
  volume?: number;
}

export interface TokenApiResponse {
  token: TokenInfo;
  price: TokenPriceData;
  metrics: TokenMetrics;
  chart?: TokenChartData[];
  error?: string;
}

export interface TradingMode {
  id: 'external' | 'embedded';
  name: string;
  description: string;
  recommended: boolean;
  features: string[];
  icon: React.ComponentType<any>;
}

export interface WalletConnectionState {
  connected: boolean;
  account?: string;
  chainId?: number;
  provider?: any;
  isConnecting: boolean;
  error?: string;
}

export interface NetworkInfo {
  chainId: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  supported: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
  lastUpdated?: Date;
}

export interface TokenHeaderProps {
  token: TokenInfo;
  price: TokenPriceData;
  loading: boolean;
  error?: string;
}

export interface TokenMetricsProps {
  metrics: TokenMetrics;
  loading: boolean;
  error?: string;
}

export interface TokenChartProps {
  data: TokenChartData[];
  loading: boolean;
  error?: string;
  timeframe: '1h' | '24h' | '7d' | '30d';
  onTimeframeChange: (timeframe: '1h' | '24h' | '7d' | '30d') => void;
}

export interface TradingInterfaceProps {
  tokenAddress: string;
  token: TokenInfo;
  walletState: WalletConnectionState;
  onModeChange?: (mode: TradingMode) => void;
}

export interface TokenDescriptionProps {
  token: TokenInfo;
  loading: boolean;
  error?: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ComponentError {
  component: string;
  error: Error;
  errorInfo?: any;
}

// API Configuration
export interface ApiConfig {
  coingecko: {
    baseUrl: string;
    apiKey?: string;
  };
  etherscan: {
    baseUrl: string;
    apiKey?: string;
  };
  rateLimit: {
    requestsPerMinute: number;
    retryAttempts: number;
  };
}

// Theme and styling types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  neutral: string;
}

export interface ComponentVariant {
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'outline' | 'ghost' | 'destructive';
}

// Utility types
export type LoadingStateFor<T> = {
  [K in keyof T]: LoadingState;
};

export type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>; 