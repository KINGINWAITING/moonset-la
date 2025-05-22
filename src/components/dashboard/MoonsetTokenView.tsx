
import { useState } from "react";
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
  const isDark = theme === "dark";

  return (
    <div className={`p-6 max-w-7xl mx-auto ${isDark ? "bg-black text-white" : "bg-white text-gray-900"} transition-colors duration-300`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
        {tokenConfig.symbol} <span className="text-primary">Token</span>
      </h1>
      
      {/* Token stats at top */}
      <div className="mb-6">
        <TokenStats tokenStats={tokenStats} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Larger Price chart */}
        <div className="lg:col-span-2">
          <PriceChart 
            priceData={priceData} 
            loading={tokenStats.loading}
            onTimeframeChange={setTimeframe}
            height={400} // Increased height for larger chart
          />
        </div>

        {/* Swap widget */}
        <div>
          <SwapWidget tokenAddress={tokenConfig.address} />
        </div>
      </div>
    </div>
  );
};

// For lazy loading
export default MoonsetTokenView;
