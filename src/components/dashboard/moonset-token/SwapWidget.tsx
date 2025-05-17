
import React, { useEffect } from 'react';
import { SwapWidget as UniswapWidget } from "@uniswap/widgets";
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { ethers } from 'ethers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

// Web3 Provider for Uniswap Widget
function getLibrary(provider: any): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(provider);
}

// Fix for global is not defined
if (typeof window !== 'undefined' && typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

// Define connectors array for Web3ReactProvider
const connectors = [
  { supportedChainIds: [1, 3, 4, 5, 42] }
];

export const SwapWidget = ({ tokenAddress }: SwapWidgetProps) => {
  // Initialize window global polyfill on component mount
  useEffect(() => {
    // This is a backup initialization if the vite config solution doesn't work
    if (typeof (window as any).global === 'undefined') {
      (window as any).global = window;
    }
  }, []);

  return (
    <Card className="h-full bg-[#121212] border-gray-800">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Trade tokens directly on Uniswap</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[550px]">
          <Web3ReactProvider getLibrary={getLibrary} connectors={connectors}>
            <UniswapWidget 
              theme={darkTheme}
              width="100%"
              defaultOutputTokenAddress={tokenAddress}
              convenienceFee={0}
              className="!bg-[#121212] rounded-lg overflow-hidden"
            />
          </Web3ReactProvider>
        </div>
      </CardContent>
    </Card>
  );
};
