import React, { useEffect, useState } from 'react';
import { useAccount, useChainId } from '@/context/WagmiProvider';
import { useTheme } from '@/context/ThemeContext';

// Define supported chains
const MAINNET_CHAIN_ID = 1;
const SEPOLIA_CHAIN_ID = 11155111;

// Updated token lists - using official Uniswap token lists
const TOKEN_LISTS = [
  'https://tokens.uniswap.org',
  'https://tokens.coingecko.com/uniswap/all.json'
];

interface SwapWidgetCoreProps {
  provider: any;
  tokenAddress: string;
}

const SwapWidgetCore = ({ provider, tokenAddress }: SwapWidgetCoreProps) => {
  const { address: account } = useAccount();
  const chainId = useChainId();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [UniswapWidget, setUniswapWidget] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Enhanced setup browser globals and load widget
  useEffect(() => {
    const setupAndLoad = async () => {
      if (typeof window === 'undefined') {
        setError('Window object not available');
        setIsLoading(false);
        return;
      }

      const debug: string[] = [];
      
      // Set a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        debug.push('✗ Loading timeout - taking too long');
        setDebugInfo([...debug]);
        setError('Widget loading timed out. This often happens due to module compatibility issues.');
        setIsLoading(false);
      }, 15000); // 15 second timeout
      
      setTimeoutId(timeout);
      
      try {
        // Setup global variables for Uniswap widget compatibility
        debug.push('Setting up global variables...');
        
        // Ensure global is available
        if (!(window as any).global) {
          (window as any).global = window;
          debug.push('✓ Global variable set');
        }

        // Setup Buffer polyfill
        if (!(window as any).Buffer) {
          try {
            // Try multiple ways to get Buffer
            let BufferLib;
            try {
              BufferLib = await import('buffer');
              (window as any).Buffer = BufferLib.Buffer;
              debug.push('✓ Buffer polyfill loaded via import');
            } catch (e) {
              try {
                BufferLib = require('buffer');
                (window as any).Buffer = BufferLib.Buffer;
                debug.push('✓ Buffer polyfill loaded via require');
              } catch (e2) {
                debug.push('⚠ Buffer polyfill failed to load');
              }
            }
          } catch (e) {
            debug.push('⚠ Buffer setup failed: ' + (e as Error).message);
          }
        } else {
          debug.push('✓ Buffer already available');
        }

        // Setup process polyfill
        if (!(window as any).process) {
          (window as any).process = {
            env: {},
            browser: true,
            version: 'v18.0.0',
            platform: 'browser'
          };
          debug.push('✓ Process polyfill set');
        } else {
          debug.push('✓ Process already available');
        }

        setDebugInfo([...debug]);

        // Attempt to load the Uniswap widget with enhanced error handling
        debug.push('Attempting to load Uniswap widget...');
        
        const widgetModule = await import("@uniswap/widgets").catch(importError => {
          debug.push(`✗ Import failed: ${importError.message}`);
          
          // Check for specific error types
          if (importError.message.includes('Buffer')) {
            debug.push('Buffer-related error detected');
          }
          if (importError.message.includes('process')) {
            debug.push('Process-related error detected');
          }
          if (importError.message.includes('prop-types')) {
            debug.push('Prop-types module compatibility issue');
          }
          if (importError.message.includes('default')) {
            debug.push('Default export issue - likely CommonJS/ES module mismatch');
          }
          
          throw importError;
        });
        
        if (widgetModule && widgetModule.SwapWidget) {
          // Clear the timeout since we succeeded
          clearTimeout(timeout);
          setTimeoutId(null);
          
          setUniswapWidget(() => widgetModule.SwapWidget);
          debug.push('✓ Uniswap widget loaded successfully');
          setDebugInfo([...debug]);
          setIsLoading(false);
        } else {
          debug.push('✗ Widget module loaded but SwapWidget not found');
          setDebugInfo([...debug]);
          clearTimeout(timeout);
          setError("Uniswap widget component not found in module");
          setIsLoading(false);
        }
        
      } catch (err: any) {
        // Clear the timeout since we have an error
        clearTimeout(timeout);
        setTimeoutId(null);
        
        debug.push(`✗ Final error: ${err.message || err.toString()}`);
        setDebugInfo([...debug]);
        console.error("Detailed error loading Uniswap widget:", err);
        setError(`Failed to load Uniswap widget: ${err.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    setupAndLoad();

    // Cleanup timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-2"></div>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Loading swap widget...</p>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            This may take up to 15 seconds
          </p>
          {debugInfo.length > 0 && (
            <div className="mt-2 text-xs text-left max-w-xs max-h-32 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className={`${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  {info}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-500 mb-2 font-medium">Error Loading Widget</p>
          <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {error}
          </p>
          
          {/* Debug information */}
          {debugInfo.length > 0 && (
            <details className="mb-4 text-left">
              <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                Debug Information
              </summary>
              <div className="mt-2 text-xs space-y-1 bg-gray-100 dark:bg-gray-800 p-2 rounded max-h-32 overflow-y-auto">
                {debugInfo.map((info, index) => (
                  <div key={index} className={`${
                    info.includes('✓') ? 'text-green-600' : 
                    info.includes('✗') ? 'text-red-600' : 
                    info.includes('⚠') ? 'text-yellow-600' : 
                    'text-gray-600'
                  }`}>
                    {info}
                  </div>
                ))}
              </div>
            </details>
          )}
          
          <button 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setDebugInfo([]);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!UniswapWidget) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Widget not available</p>
      </div>
    );
  }

  // Widget configuration
  const widgetConfig = {
    width: "100%",
    theme: isDark ? "dark" : "light",
    tokenList: TOKEN_LISTS,
    defaultOutputTokenAddress: tokenAddress,
    defaultChainId: chainId || MAINNET_CHAIN_ID,
    provider: provider,
    jsonRpcUrlMap: {
      [MAINNET_CHAIN_ID]: [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://eth-mainnet.alchemyapi.io/v2/demo',
        'https://cloudflare-eth.com'
      ],
      [SEPOLIA_CHAIN_ID]: [
        'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      ]
    },
    // Widget styling
    convenienceFee: 0,
    convenienceFeeRecipient: undefined,
    // Enable wallet connection through the widget if needed
    hideConnectionUI: false,
    // Callback functions
    onConnectWallet: () => {
      console.log('Wallet connection requested from widget');
    },
    onError: (error: any) => {
      console.error('Uniswap widget error:', error);
      setError('Transaction failed. Please try again.');
    },
  };

  return (
    <div className="h-full w-full">
      <UniswapWidget {...widgetConfig} />
    </div>
  );
};

export default SwapWidgetCore;
