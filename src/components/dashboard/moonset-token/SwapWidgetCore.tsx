
import React, { useEffect } from 'react';
import { SwapWidget as UniswapWidget } from "@uniswap/widgets";
import { useWeb3 } from '@/context/Web3Context';

// Define supported chains (mainnet, goerli, etc)
const MAINNET_CHAIN_ID = 1;
const jsonRpcUrlMap = {
  [MAINNET_CHAIN_ID]: [
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // Public Infura endpoint
  ],
};

// Define token list URL - using a single URL instead of an array
const TOKEN_LIST = 'https://tokens.coingecko.com/uniswap/all.json'; // Using CoinGecko's token list

interface SwapWidgetCoreProps {
  provider: any;
  tokenAddress: string;
}

const SwapWidgetCore = ({ provider, tokenAddress }: SwapWidgetCoreProps) => {
  const { chainId } = useWeb3();

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
  );
};

export default SwapWidgetCore;
