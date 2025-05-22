
import React, { lazy, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletConnectButton } from './WalletConnectButton';
import { useWeb3 } from '@/context/Web3Context';
import { useTheme } from '@/context/ThemeContext';

// Lazy load the heavy Uniswap widget component
const SwapWidgetCore = lazy(() => import('./SwapWidgetCore').catch(() => ({
  default: () => <div>Failed to load swap widget</div>
})));

interface SwapWidgetProps {
  tokenAddress: string;
}

export const SwapWidget = ({ tokenAddress }: SwapWidgetProps) => {
  const { provider, account } = useWeb3();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
            <Suspense fallback={
              <div className={`flex items-center justify-center h-full ${isDark ? "bg-[#1B1B1B]" : "bg-gray-50"} rounded-lg text-center p-4`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            }>
              <SwapWidgetCore provider={provider} tokenAddress={tokenAddress} />
            </Suspense>
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
