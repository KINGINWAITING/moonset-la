
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletConnectButton } from './WalletConnectButton';
import { useWeb3 } from '@/context/Web3Context';
import { useTheme } from '@/context/ThemeContext';

// Define a placeholder component instead of using Suspense/lazy loading
// This will further reduce memory footprint during builds
const SwapWidget = ({ tokenAddress }: { tokenAddress: string }) => {
  const { provider, account } = useWeb3();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [SwapWidgetCore, setSwapWidgetCore] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only load the widget when it's needed (provider is available)
  useEffect(() => {
    if (provider && !SwapWidgetCore && !isLoading) {
      setIsLoading(true);
      
      // Use dynamic import to load the widget only when needed
      import('./SwapWidgetCore')
        .then(module => {
          setSwapWidgetCore(() => module.default);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to load swap widget:", err);
          setError("Failed to load swap widget");
          setIsLoading(false);
        });
    }
  }, [provider, SwapWidgetCore, isLoading]);

  return (
    <Card className={`h-full ${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
      <CardHeader>
        <CardTitle className={isDark ? "text-white" : "text-gray-900"}>Swap Tokens</CardTitle>
        <CardDescription className={isDark ? "text-gray-400" : "text-gray-500"}>Trade tokens directly on Uniswap</CardDescription>
      </CardHeader>
      <CardContent>
        <WalletConnectButton />
        
        <div className="h-[520px] rounded-lg overflow-hidden mt-4">
          {provider ? (
            <>
              {isLoading && (
                <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4`}>
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
              
              {error && (
                <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4`}>
                  <div className="text-red-500">{error}</div>
                </div>
              )}
              
              {SwapWidgetCore && !isLoading && !error && (
                <SwapWidgetCore provider={provider} tokenAddress={tokenAddress} />
              )}
            </>
          ) : (
            <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4 transition-colors`}>
              <div>
                <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Connect your wallet to use the swap feature</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapWidget;
