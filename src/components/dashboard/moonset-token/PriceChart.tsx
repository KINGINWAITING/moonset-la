
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useTheme } from "@/context/ThemeContext";

interface PriceChartProps {
  priceData: Array<{timestamp: string; price: number}>;
  loading: boolean;
  onTimeframeChange?: (timeframe: string) => void;
  height?: number; // New prop for customizable height
}

export const PriceChart = ({ 
  priceData, 
  loading, 
  onTimeframeChange,
  height = 320 // Default height if not provided
}: PriceChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const handleTabChange = (value: string) => {
    if (onTimeframeChange) {
      onTimeframeChange(value);
    }
  };

  return (
    <Card className={`${isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"} transition-colors`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={isDark ? "text-white" : "text-gray-900"}>Price Chart</CardTitle>
          <Tabs defaultValue="24h" className="w-auto" onValueChange={handleTabChange}>
            <TabsList className={isDark ? "bg-[#1B1B1B]" : "bg-gray-100"}>
              <TabsTrigger value="1h">1H</TabsTrigger>
              <TabsTrigger value="24h">24H</TabsTrigger>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className={`w-full flex items-center justify-center`} style={{ height: `${height}px` }}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ChartContainer 
            className="w-full" 
            style={{ height: `${height}px` }}
            config={{
              price: { 
                theme: { 
                  light: '#4ADE80', // Use the same green for light theme 
                  dark: '#4ADE80' 
                } 
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDark ? "#333" : "#e5e5e5"} 
                />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fill: isDark ? '#888' : '#555' }}
                  tickLine={{ stroke: isDark ? '#444' : '#e0e0e0' }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fill: isDark ? '#888' : '#555' }}
                  tickLine={{ stroke: isDark ? '#444' : '#e0e0e0' }}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4ADE80"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
