
import React from 'react';
import { SwapWidget as UniswapWidget } from "@uniswap/widgets";
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

// Fix for global is not defined
if (typeof window !== 'undefined' && typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

export const SwapWidget = ({ tokenAddress }: SwapWidgetProps) => {
  // Ensure global is defined in the window scope
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // This makes "global" available to the widget and its dependencies
      (window as any).global = window;
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
        <div className="h-[550px]">
          {/* Using the widget without Web3ReactProvider */}
          <div className="rounded-lg overflow-hidden">
            <UniswapWidget 
              theme={darkTheme}
              width="100%"
              defaultOutputTokenAddress={tokenAddress}
              convenienceFee={0}
              className="!bg-[#121212] rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
