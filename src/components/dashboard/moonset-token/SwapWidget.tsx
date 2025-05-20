
import React, { useEffect } from 'react';
import { SwapWidget as UniswapWidget } from "@uniswap/widgets";
import { WalletConnectButton } from './WalletConnectButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeb3 } from '@/context/Web3Context';
import { useTheme } from '@/context/ThemeContext';

// Define supported chains (mainnet, goerli, etc)
const MAINNET_CHAIN_ID = 1;
const jsonRpcUrlMap = {
  [MAINNET_CHAIN_ID]: [
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // Public Infura endpoint
  ],
};

// Define token list URL - using a single URL instead of an array
const TOKEN_LIST = 'https://tokens.coingecko.com/uniswap/all.json'; // Using CoinGecko's token list

interface SwapWidgetProps {
  tokenAddress: string;
}

export const SwapWidget = ({ tokenAddress }: SwapWidgetProps) => {
  const { provider, account, chainId } = useWeb3();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Ensure required globals are available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Make global available
      (window as any).global = window;
      
      // Setup Buffer for IPFS operations
      (window as any).Buffer = window.Buffer || require("buffer").Buffer;
      
      console.log('SwapWidget mounted, provider:', provider ? 'Connected' : 'Not connected');
      console.log('Account:', account);
      console.log('Chain ID:', chainId);
    }
  }, [provider, account, chainId]);

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
            <UniswapWidget 
              width="100%"
              defaultOutputTokenAddress={tokenAddress}
              convenienceFee={0}
              className="rounded-lg overflow-hidden"
              provider={provider}
              jsonRpcUrlMap={jsonRpcUrlMap}
              tokenList={TOKEN_LIST}
              defaultChainId={chainId || MAINNET_CHAIN_ID}
            />
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
