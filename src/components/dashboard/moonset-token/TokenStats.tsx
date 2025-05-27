import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, DollarSign, BarChart3, Droplets, TrendingUp as Growth } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatLargeNumber } from "@/lib/format-utils";
import { tokenConfig } from "@/config/tokenConfig";

interface TokenStatsProps {
  tokenStats: {
    price: number;
    priceChange: number;
    volume: number;
    liquidity: number;
    marketCap: number;
    loading: boolean;
  };
}

export const TokenStats = ({ tokenStats }: TokenStatsProps) => {
  const stats = [
    {
      icon: DollarSign,
      label: "Current Price",
      value: tokenConfig.isLaunched ? formatCurrency(tokenStats.price) : "Not Listed",
      subValue: tokenConfig.isLaunched ? `${tokenStats.priceChange >= 0 ? '+' : ''}${tokenStats.priceChange.toFixed(2)}%` : "Awaiting Launch",
      trend: tokenStats.priceChange >= 0 ? "up" : "down",
      color: tokenStats.priceChange >= 0 ? "text-green-600" : "text-red-600"
    },
    {
      icon: BarChart3,
      label: "24h Volume",
      value: tokenConfig.isLaunched ? formatLargeNumber(tokenStats.volume) : "Coming Soon",
      subValue: tokenConfig.isLaunched ? "Trading Volume" : "After Launch",
      trend: "neutral",
      color: "text-muted-foreground"
    },
    {
      icon: Droplets,
      label: "Total Liquidity",
      value: tokenConfig.isLaunched ? formatLargeNumber(tokenStats.liquidity) : "TBD",
      subValue: tokenConfig.isLaunched ? "Available TVL" : "Post-Launch",
      trend: "neutral",
      color: "text-muted-foreground"
    },
    {
      icon: Growth,
      label: "Market Cap",
      value: tokenConfig.isLaunched ? formatLargeNumber(tokenStats.marketCap) : "Launching Soon",
      subValue: tokenConfig.isLaunched ? "Total Value" : "Calculate on Launch",
      trend: "neutral",
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="p-4 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors">
              
              {/* Icon and Trend Indicator */}
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-background rounded-md">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                
                {stat.trend !== "neutral" && tokenConfig.isLaunched && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                    stat.trend === "up" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {stat.label}
              </h3>
              
              {/* Value */}
              <div className="space-y-1">
                {tokenStats.loading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <p className="text-lg font-semibold text-foreground">
                    {stat.value}
                  </p>
                )}
                
                {tokenStats.loading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <p className={`text-xs font-medium ${stat.color}`}>
                    {stat.subValue}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Additional Info Bar for Pre-Launch */}
      {!tokenConfig.isLaunched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-4 p-3 bg-muted/50 border rounded-lg"
        >
          <div className="flex items-center justify-center gap-2 text-center">
            <Growth className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              Live statistics will be available once MOONSET launches on Uniswap
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
