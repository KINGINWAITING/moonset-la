
import React from 'react';
import { SwapWidget as UniswapWidget } from "@uniswap/widgets";
import { Web3ReactProvider, Web3ReactContextInterface } from '@web3-react/core';
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
  borderRadius: 0.8,
};

interface SwapWidgetProps {
  tokenAddress: string;
}

// Web3 Provider for Uniswap Widget
function getLibrary(provider: any): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(provider);
}

export const SwapWidget = ({ tokenAddress }: SwapWidgetProps) => {
  return (
    <Card className="h-full bg-[#121212] border-gray-800">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Trade tokens directly on Uniswap</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[550px]">
          <Web3ReactProvider getLibrary={getLibrary}>
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
