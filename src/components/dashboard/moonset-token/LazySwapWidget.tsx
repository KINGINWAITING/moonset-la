import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletConnectButton } from './WalletConnectButton';
import { useAccount, useChainId } from '@/context/WagmiProvider';
import { useTheme } from '@/context/ThemeContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ExternalLink, Clock, Zap, Rocket, Sparkles, Star, Shield, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tokenConfig } from '@/config/tokenConfig';

// MOONSET-specific fallback swap component
const FallbackSwapWidget = ({ tokenAddress, isDark }: { tokenAddress: string, isDark: boolean }) => {
  const handleTradeClick = () => {
    if (!tokenConfig.isLaunched) {
      alert("MOONSET token is not yet launched on Uniswap. Stay tuned for the official launch announcement!");
      return;
    }
    
    const uniswapUrl = `${tokenConfig.uniswapUrl}${tokenAddress}`;
    window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg p-6 flex flex-col items-center justify-center`}>
      <div className="text-center">
        <div className="mb-4">
          <div className={`p-3 rounded-full mx-auto w-fit ${isDark ? "bg-gradient-to-br from-purple-900/50 to-blue-900/50" : "bg-gradient-to-br from-purple-100 to-blue-100"}`}>
            <Rocket className={`w-12 h-12 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
          </div>
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
          {tokenConfig.isLaunched ? "Trade MOONSET on Uniswap" : "Get Ready for MOONSET"}
        </h3>
        <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {tokenConfig.isLaunched 
            ? "Trade MOONSET tokens on the official Uniswap platform"
            : "Prepare to be among the first to get MOONSET tokens"
          }
        </p>
        
        {/* Launch status indicator for pre-launch */}
        {!tokenConfig.isLaunched && (
          <div className={`mb-4 p-3 rounded-lg border-2 border-dashed ${isDark ? "border-purple-800 bg-purple-900/20" : "border-purple-300 bg-purple-50"}`}>
            <Clock className={`w-5 h-5 mx-auto mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
            <p className={`text-sm font-medium ${isDark ? "text-purple-300" : "text-purple-700"}`}>
              MOONSET Launch Coming Soon
            </p>
            <p className={`text-xs mt-1 ${isDark ? "text-purple-400" : "text-purple-600"}`}>
              Connect your wallet to be ready
            </p>
          </div>
        )}
        
        {/* Action Button */}
        <Button
          onClick={handleTradeClick}
          disabled={!tokenConfig.isLaunched}
          className={`flex items-center gap-2 mb-3 w-full ${
            tokenConfig.isLaunched 
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white cursor-not-allowed"
          }`}
        >
          {tokenConfig.isLaunched ? (
            <>
              <ExternalLink className="w-4 h-4" />
              Trade MOONSET
            </>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              Launching Soon
            </>
          )}
        </Button>
        
        <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} space-y-1`}>
          {tokenConfig.isLaunched ? (
            <>
              <p>✓ Official Uniswap interface</p>
              <p>✓ MOONSET token automatically pre-selected</p>
              <p>✓ Always up-to-date with latest features</p>
            </>
          ) : (
            <>
              <p>• Be among the first to get MOONSET</p>
              <p>• Join the Axis Mundi ecosystem early</p>
              <p>• Secure trading on Uniswap when live</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Define a placeholder component for the swap widget
const SwapWidget = ({ tokenAddress }: { tokenAddress: string }) => {
  const { address: account, isConnected } = useAccount();
  const chainId = useChainId();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [SwapWidgetCore, setSwapWidgetCore] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [autoFallbackTimer, setAutoFallbackTimer] = useState<NodeJS.Timeout | null>(null);
  const [showEmbeddedOption, setShowEmbeddedOption] = useState(true);

  // Load the widget when connected
  useEffect(() => {
    if (isConnected && account && !SwapWidgetCore && !isLoading && !useFallback && showEmbeddedOption && tokenConfig.isLaunched) {
      setIsLoading(true);
      setError(null);
      
      // Reduced timer - quick fallback for better UX
      const fallbackTimer = setTimeout(() => {
        setUseFallback(true);
        setIsLoading(false);
        setError("Embedded widget has compatibility issues. Using external mode for reliable MOONSET trading.");
      }, 10000); // Reduced to 10 seconds
      
      setAutoFallbackTimer(fallbackTimer);
      
      // Use dynamic import to load the widget only when needed
      import('./SwapWidgetCore')
        .then(module => {
          clearTimeout(fallbackTimer);
          setAutoFallbackTimer(null);
          setSwapWidgetCore(() => module.default);
          setIsLoading(false);
        })
        .catch(err => {
          clearTimeout(fallbackTimer);
          setAutoFallbackTimer(null);
          console.error("Failed to load swap widget:", err);
          
          // Determine error type and response
          let errorMessage = "Embedded widget failed to load.";
          if (err.message.includes('reflexbox') || err.message.includes('Box')) {
            errorMessage = "Widget dependency issue detected (reflexbox).";
          } else if (err.message.includes('prop-types')) {
            errorMessage = "Widget dependency issue detected (prop-types).";
          } else if (err.message.includes('shallowequal')) {
            errorMessage = "Widget dependency issue detected (shallowequal).";
          }
          
          setError(errorMessage + " External mode provides the same MOONSET trading functionality.");
          setIsLoading(false);
          
          // Auto-switch to fallback after 1 failed attempt for better UX
          if (retryCount >= 0) {
            setTimeout(() => {
              setUseFallback(true);
            }, 2000); // 2 second delay before auto-switch
          }
        });
    }
  }, [isConnected, account, SwapWidgetCore, isLoading, useFallback, retryCount, showEmbeddedOption]);

  // Reset widget if wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      if (autoFallbackTimer) {
        clearTimeout(autoFallbackTimer);
        setAutoFallbackTimer(null);
      }
      setSwapWidgetCore(null);
      setError(null);
      setIsLoading(false);
      setUseFallback(false);
      setRetryCount(0);
      setShowEmbeddedOption(true);
    }
  }, [isConnected, autoFallbackTimer]);

  // Check for unsupported networks
  const isUnsupportedNetwork = chainId && chainId !== 1 && chainId !== 11155111; // Mainnet and Sepolia only

  const handleRetry = () => {
    if (autoFallbackTimer) {
      clearTimeout(autoFallbackTimer);
      setAutoFallbackTimer(null);
    }
    setError(null);
    setIsLoading(false);
    setSwapWidgetCore(null);
    setRetryCount(prev => prev + 1);
  };

  const handleUseFallback = () => {
    if (autoFallbackTimer) {
      clearTimeout(autoFallbackTimer);
      setAutoFallbackTimer(null);
    }
    setUseFallback(true);
    setError(null);
    setIsLoading(false);
  };

  const handleTryEmbedded = () => {
    setUseFallback(false);
    setError(null);
    setShowEmbeddedOption(true);
    setRetryCount(0);
  };

  return (
    <Card className={`h-full ${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
      <CardHeader>
        <CardTitle className={`${isDark ? "text-white" : "text-gray-900"} flex items-center space-x-2`}>
          <Rocket className="w-5 h-5 text-primary" />
          <span>Get MOONSET</span>
          {!tokenConfig.isLaunched && (
            <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Coming Soon
            </Badge>
          )}
          {useFallback && tokenConfig.isLaunched && (
            <span className="ml-2 text-xs font-normal px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
              <Star className="w-3 h-3 inline mr-1" />
              Recommended
            </span>
          )}
        </CardTitle>
        <CardDescription className={isDark ? "text-gray-400" : "text-gray-500"}>
          {!tokenConfig.isLaunched 
            ? "Be ready to get MOONSET tokens when we launch"
            : useFallback 
              ? "Trade MOONSET on the official Uniswap platform" 
              : "Embedded MOONSET trading interface"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WalletConnectButton />
        
        {/* Network warning */}
        {isConnected && isUnsupportedNetwork && (
          <Alert className="mt-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-700 dark:text-orange-300">
              For the best MOONSET trading experience, please switch to Ethereum Mainnet or Sepolia.
              Current network ID: {chainId}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Pre-launch preparation notice */}
        {isConnected && !tokenConfig.isLaunched && (
          <Alert className="mt-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
            <Rocket className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              <div className="space-y-1">
                <p className="font-semibold">Wallet Connected - Ready for MOONSET Launch!</p>
                <p className="text-sm">
                  You're all set to be among the first to get MOONSET tokens. We'll update this page when the token goes live on Uniswap.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Mode selection - only show when token is launched */}
        {isConnected && !isLoading && !error && !SwapWidgetCore && tokenConfig.isLaunched && (
          <Alert className="mt-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
            <Zap className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 dark:text-blue-300 text-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Choose your MOONSET trading experience:</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleUseFallback}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs px-3 py-1"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Uniswap Platform (Recommended)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleTryEmbedded}
                    className="text-xs px-3 py-1 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900"
                  >
                    Try Quick Swap
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Auto-fallback notification - only when token is launched */}
        {isLoading && autoFallbackTimer && tokenConfig.isLaunched && (
          <Alert className="mt-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
            <Clock className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-700 dark:text-orange-300 text-sm">
              <div className="flex items-center justify-between">
                <span>Loading embedded MOONSET widget... Switching to external mode in 10s if issues occur.</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUseFallback}
                  className="ml-2 text-xs px-2 py-1 h-6 border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-600 dark:text-orange-300 dark:hover:bg-orange-900"
                >
                  Use External Now
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="h-[520px] rounded-lg overflow-hidden mt-4">
          {!isConnected ? (
            <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4 transition-colors`}>
              <div>
                <div className="mb-4">
                  <Wallet className={`w-16 h-16 mx-auto ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                </div>
                <p className={`mb-2 font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Connect Your Wallet
                </p>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Connect your wallet to {tokenConfig.isLaunched ? "start trading MOONSET tokens" : "prepare for MOONSET launch"}
                </p>
              </div>
            </div>
          ) : useFallback ? (
            <FallbackSwapWidget tokenAddress={tokenAddress} isDark={isDark} />
          ) : !tokenConfig.isLaunched ? (
            <FallbackSwapWidget tokenAddress={tokenAddress} isDark={isDark} />
          ) : isLoading ? (
            <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4`}>
              <div>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Loading embedded MOONSET interface...
                </p>
                <p className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  Trying compatibility fixes
                </p>
              </div>
            </div>
          ) : error ? (
            <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4`}>
              <div>
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <p className="text-orange-600 dark:text-orange-400 mb-2 font-medium">Embedded Widget Issue</p>
                <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {error}
                </p>
                <div className="space-y-2">
                  <button 
                    onClick={handleUseFallback}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors text-sm block w-full"
                  >
                    <ExternalLink className="w-4 h-4 inline mr-2" />
                    Use Uniswap Platform
                  </button>
                  <button 
                    onClick={handleRetry}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Retry Embedded
                  </button>
                </div>
                <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  Uniswap platform provides the same MOONSET functionality with better reliability
                </p>
              </div>
            </div>
          ) : SwapWidgetCore ? (
            <div className="h-full">
              <SwapWidgetCore provider={null} tokenAddress={tokenAddress} />
            </div>
          ) : (
            <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4`}>
              <div>
                <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Choose your MOONSET trading mode above
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapWidget;
