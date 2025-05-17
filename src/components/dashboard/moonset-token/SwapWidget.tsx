
import React, { useEffect } from 'react';
import { SwapWidget as UniswapWidget } from "@uniswap/widgets";
import { WalletConnectButton } from './WalletConnectButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeb3 } from '@/context/Web3Context';

// Custom Uniswap Widget Theme
const darkTheme = {
  primary: '#4ADE80',
  secondary: '#1B1B1B',
  interactive: '#2D2D2D',
  container: '#121212',
  module: '#1B1B1B',
  accent: '#4ADE80',
  outline: '#343434',
  dialog: '#121212',
  fontFamily: 'Geist',
  borderRadius: {
    xsmall: 0.2,
    small: 0.4,
    medium: 0.6,
    large: 0.8,
    xlarge: 1.0,
    full: 9999
  }
};

interface SwapWidgetProps {
  tokenAddress: string;
}

export const SwapWidget = ({ tokenAddress }: SwapWidgetProps) => {
  const { provider } = useWeb3();

  // Ensure required globals are available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Make global available
      (window as any).global = window;
      
      // Setup Buffer for IPFS operations
      (window as any).Buffer = window.Buffer || require("buffer").Buffer;
    }
  }, []);

  return (
    <Card className="h-full bg-[#121212] border-gray-800">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Trade tokens directly on Uniswap</CardDescription>
      </CardHeader>
      <CardContent>
        <WalletConnectButton />
        
        <div className="h-[520px] rounded-lg overflow-hidden">
          <UniswapWidget 
            theme={darkTheme}
            width="100%"
            defaultOutputTokenAddress={tokenAddress}
            convenienceFee={0}
            className="!bg-[#121212] rounded-lg overflow-hidden"
            provider={provider || undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
};
