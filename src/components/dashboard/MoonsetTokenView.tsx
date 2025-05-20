
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { tokenConfig } from "@/config/tokenConfig";
import { TokenStats } from "./moonset-token/TokenStats";
import { PriceChart } from "./moonset-token/PriceChart";
import { SwapWidget } from "./moonset-token/SwapWidget";
import { usePriceData } from "@/hooks/usePriceData";
import { useTheme } from "@/context/ThemeContext";

export const MoonsetTokenView = () => {
  const [timeframe, setTimeframe] = useState("24h");
  const { priceData, tokenStats } = usePriceData(timeframe);
  const { theme } = useTheme();

  return (
    <div className={`p-6 max-w-7xl mx-auto ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <h1 className="text-3xl font-bold mb-6">
        {tokenConfig.symbol} <span className="text-primary">Token</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Token stats and chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price stats */}
          <TokenStats tokenStats={tokenStats} />
          
          {/* Price chart */}
          <PriceChart 
            priceData={priceData} 
            loading={tokenStats.loading}
            onTimeframeChange={setTimeframe}
          />
        </div>

        {/* Right column - Swap widget */}
        <div>
          <SwapWidget tokenAddress={tokenConfig.address} />
        </div>
      </div>
    </div>
  );
};
