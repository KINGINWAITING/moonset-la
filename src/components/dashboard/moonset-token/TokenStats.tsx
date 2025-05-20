
import { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatLargeNumber } from "@/lib/format-utils";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className={`${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
        <CardHeader className="pb-2">
          <CardDescription className={isDark ? "text-gray-400" : "text-gray-500"}>Price</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenStats.loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {formatCurrency(tokenStats.price)}
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className={`${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
        <CardHeader className="pb-2">
          <CardDescription className={isDark ? "text-gray-400" : "text-gray-500"}>24h Change</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenStats.loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="flex items-center space-x-1">
              {tokenStats.priceChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <p className={`text-2xl font-bold ${tokenStats.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {tokenStats.priceChange.toFixed(2)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className={`${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
        <CardHeader className="pb-2">
          <CardDescription className={isDark ? "text-gray-400" : "text-gray-500"}>24h Volume</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenStats.loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {formatLargeNumber(tokenStats.volume)}
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className={`${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
        <CardHeader className="pb-2">
          <CardDescription className={isDark ? "text-gray-400" : "text-gray-500"}>TVL</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenStats.loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {formatLargeNumber(tokenStats.liquidity)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
