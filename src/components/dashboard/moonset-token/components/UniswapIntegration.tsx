import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  RefreshCw, 
  ExternalLink, 
  Info, 
  CheckCircle,
  Loader2,
  Settings,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/design-system/components/base';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAccount } from '@/context/WagmiProvider';
import { useTheme } from '@/context/ThemeContext';

// Import Uniswap Widget (this would be the actual import in production)
// import { SwapWidget } from '@uniswap/widgets';
// import '@uniswap/widgets/fonts.css';

/**
 * Widget configuration interface
 */
interface WidgetConfig {
  defaultInputTokenAddress?: string;
  defaultOutputTokenAddress?: string;
  defaultInputAmount?: string;
  width?: number | string;
  theme?: any;
  tokenList?: any[];
  provider?: any;
  jsonRpcUrlMap?: Record<number, string[]>;
}

/**
 * Error types for widget integration
 */
type WidgetError = 
  | 'NETWORK_ERROR'
  | 'PROVIDER_ERROR'
  | 'TOKEN_NOT_FOUND'
  | 'INSUFFICIENT_LIQUIDITY'
  | 'WIDGET_LOAD_ERROR'
  | 'UNKNOWN_ERROR';

interface UniswapIntegrationProps {
  className?: string;
  onSwapSuccess?: (txHash: string) => void;
  onSwapError?: (error: string) => void;
  onSwapStart?: () => void;
}

/**
 * MOONSET token configuration
 */
const MOONSET_TOKEN = {
  name: 'MOONSET',
  address: '0x1234567890123456789012345678901234567890', // Replace with actual contract address
  symbol: 'MOONSET',
  decimals: 18,
  chainId: 1,
  logoURI: '/tokens/moonset.png' // Replace with actual logo URI
};

/**
 * Custom token list for the widget
 */
const MOONSET_TOKEN_LIST = [
  MOONSET_TOKEN,
  {
    name: 'Ethereum',
    address: 'NATIVE',
    symbol: 'ETH',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  },
  {
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
  },
  {
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    decimals: 6,
    chainId: 1,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png'
  }
];

export const UniswapIntegration = ({ 
  className = "",
  onSwapSuccess,
  onSwapError,
  onSwapStart
}: UniswapIntegrationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<WidgetError | null>(null);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const { address, isConnected } = useAccount();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  /**
   * Widget configuration based on theme and user preferences
   */
  const widgetConfig: WidgetConfig = {
    defaultInputTokenAddress: 'NATIVE', // ETH as default input
    defaultOutputTokenAddress: MOONSET_TOKEN.address, // MOONSET as default output
    width: '100%',
    tokenList: MOONSET_TOKEN_LIST,
    theme: {
      primary: isDark ? '#FFFFFF' : '#000000',
      secondary: isDark ? '#888D9B' : '#565A69',
      interactive: '#FF007A',
      container: isDark ? '#1A1A1A' : '#FFFFFF',
      module: isDark ? '#2A2A2A' : '#F7F8FA',
      accent: '#FF007A',
      outline: isDark ? '#40444F' : '#DEE2E6',
      dialog: isDark ? '#1A1A1A' : '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      borderRadius: 0.75,
      tokenColorExtraction: false
    },
    jsonRpcUrlMap: {
      1: [
        'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Replace with actual Infura project ID
        'https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_KEY' // Replace with actual Alchemy key
      ]
    }
  };

  /**
   * Initialize the widget
   */
  const initializeWidget = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate widget initialization (replace with actual Uniswap widget initialization)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if MOONSET token exists in the token list
      const tokenExists = MOONSET_TOKEN_LIST.some(token => 
        token.address.toLowerCase() === MOONSET_TOKEN.address.toLowerCase()
      );
      
      if (!tokenExists) {
        throw new Error('TOKEN_NOT_FOUND');
      }

      setIsWidgetReady(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Widget initialization error:', err);
      setError(err.message as WidgetError || 'WIDGET_LOAD_ERROR');
      setIsLoading(false);
    }
  }, []);

  /**
   * Retry widget initialization
   */
  const retryInitialization = () => {
    setRetryCount(prev => prev + 1);
    initializeWidget();
  };

  /**
   * Handle widget errors
   */
  const getErrorMessage = (errorType: WidgetError): string => {
    switch (errorType) {
      case 'NETWORK_ERROR':
        return 'Network connection error. Please check your internet connection and try again.';
      case 'PROVIDER_ERROR':
        return 'Wallet provider error. Please ensure your wallet is properly connected.';
      case 'TOKEN_NOT_FOUND':
        return 'MOONSET token not found. Please ensure the token contract is deployed.';
      case 'INSUFFICIENT_LIQUIDITY':
        return 'Insufficient liquidity for this trade. Try a smaller amount.';
      case 'WIDGET_LOAD_ERROR':
        return 'Failed to load the trading widget. Please refresh and try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  /**
   * Initialize widget on component mount
   */
  useEffect(() => {
    initializeWidget();
  }, [initializeWidget]);

  /**
   * Mock Uniswap Widget Component (replace with actual SwapWidget)
   */
  const MockUniswapWidget = () => (
    <div className="w-full h-[400px] bg-background border rounded-lg p-6">
      <div className="space-y-4">
        {/* Widget Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Swap</h3>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Input Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm text-muted-foreground">Balance: 2.5 ETH</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">ETH</span>
              </div>
              <span className="font-medium">ETH</span>
            </div>
            <input 
              type="text" 
              placeholder="0.0" 
              className="flex-1 bg-transparent text-right text-xl font-medium outline-none"
              defaultValue="1.0"
            />
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" className="rounded-full">
            <TrendingUp className="h-4 w-4 rotate-90" />
          </Button>
        </div>

        {/* Output Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">To</span>
            <span className="text-sm text-muted-foreground">Balance: 0 MOONSET</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">MS</span>
              </div>
              <span className="font-medium">MOONSET</span>
            </div>
            <input 
              type="text" 
              placeholder="0.0" 
              className="flex-1 bg-transparent text-right text-xl font-medium outline-none"
              value="222,222"
              readOnly
            />
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rate</span>
            <span>1 ETH = 222,222 MOONSET</span>
          </div>
        </div>

        {/* Swap Button */}
        <Button 
          className="w-full h-12 text-lg font-medium"
          disabled={!isConnected}
          onClick={() => {
            onSwapStart?.();
            // Simulate swap process
            setTimeout(() => {
              onSwapSuccess?.('0x1234567890abcdef...');
            }, 3000);
          }}
        >
          {isConnected ? 'Swap' : 'Connect Wallet to Swap'}
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center">
              <h3 className="font-medium">Loading Uniswap Widget</h3>
              <p className="text-sm text-muted-foreground">
                Initializing trading interface...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mb-4">
              {getErrorMessage(error)}
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={retryInitialization}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry {retryCount > 0 && `(${retryCount})`}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://app.uniswap.org', '_blank')}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open Uniswap App
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Widget Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="font-medium">Trading Widget Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Live Prices
          </Badge>
          <Badge variant="outline">
            Ethereum Mainnet
          </Badge>
        </div>
      </div>

      {/* Important Information */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p>
              <strong>Trading MOONSET tokens:</strong> Make sure you have enough ETH for gas fees. 
              Current network fees are approximately $15-30.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">Slippage: 0.5%</Badge>
              <Badge variant="secondary">Min. received: ~220,000 MOONSET</Badge>
              <Badge variant="secondary">Price impact: &lt;0.1%</Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Uniswap Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Swap ETH for MOONSET
          </CardTitle>
          <CardDescription>
            Powered by Uniswap Protocol - Decentralized trading with the best prices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Replace MockUniswapWidget with actual SwapWidget in production */}
            <MockUniswapWidget />
            
            {/* Actual Uniswap Widget implementation would be: */}
            {/*
            <SwapWidget
              {...widgetConfig}
              provider={provider}
              onSwapStart={onSwapStart}
              onSwapSuccess={(txHash) => onSwapSuccess?.(txHash)}
              onSwapError={(error) => onSwapError?.(error.message)}
            />
            */}
          </motion.div>
        </CardContent>
      </Card>

      {/* Trading Information */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">24h Volume</p>
              <p className="font-semibold">$2.4M</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Liquidity</p>
              <p className="font-semibold">$8.7M</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Fee Tier</p>
              <p className="font-semibold">0.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Links */}
      <div className="flex justify-center gap-4 text-sm">
        <Button variant="ghost" size="sm" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View on Etherscan
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Uniswap Analytics
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          Trading Guide
        </Button>
      </div>
    </div>
  );
}; 