
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

interface PriceChartProps {
  priceData: Array<{timestamp: string; price: number}>;
  loading: boolean;
  onTimeframeChange?: (timeframe: string) => void;
}

export const PriceChart = ({ priceData, loading, onTimeframeChange }: PriceChartProps) => {
  const handleTabChange = (value: string) => {
    if (onTimeframeChange) {
      onTimeframeChange(value);
    }
  };

  return (
    <Card className="bg-[#121212] border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Chart</CardTitle>
          <Tabs defaultValue="24h" className="w-auto" onValueChange={handleTabChange}>
            <TabsList className="bg-[#1B1B1B]">
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
          <div className="w-full h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ChartContainer 
            className="h-80" 
            config={{
              price: { 
                theme: { 
                  light: '#E0E0E0', // Add light theme color
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
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fill: '#888' }}
                  tickLine={{ stroke: '#444' }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fill: '#888' }}
                  tickLine={{ stroke: '#444' }}
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
