
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-utils";
import { CustomTooltip } from "../moonset-token/CustomTooltip";
import { CryptoPortfolio } from "@/types/supabase";

interface PortfolioSummaryProps {
  totalValue: number;
  chartData: { name: string; value: number }[];
  walletPortfolio: CryptoPortfolio[];
  connected: boolean;
  account: string | null;
  COLORS: string[];
}

export const PortfolioSummary = ({
  totalValue,
  chartData,
  walletPortfolio,
  connected,
  account,
  COLORS,
}: PortfolioSummaryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Sample percentage change
  const percentChange = 2.34;
  const isPositive = percentChange >= 0;
  
  return (
    <div className="md:col-span-2 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Total Value Card */}
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">SPENT THIS MONTH</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{formatCurrency(totalValue)}</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">24HR CHANGE</span>
                <span className={cn(
                  "font-medium",
                  isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {isPositive ? "+" : ""}{percentChange}%
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">VOLUME (24H)</span>
                <span className="font-medium">$84.42B</span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">MARKET CAP</span>
                <span className="font-medium">$804.42B</span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">AVG MONTHLY GROWING</span>
                <span className="font-medium">$804.42B</span>
              </div>
            </div>
            
            <Button className="mt-6 w-full rounded-full bg-black text-white hover:bg-black/90 flex items-center gap-2" variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </CardContent>
        </Card>
        
        {/* Chart Card */}
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {connected && account && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="font-medium text-sm">Total</div>
                  <div className="font-bold text-xl">{formatCurrency(totalValue)}</div>
                </div>
              )}
            </div>
            
            <div className="mt-4 space-y-2">
              {walletPortfolio.slice(0, 2).map((crypto, index) => (
                <div key={crypto.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs font-medium">{crypto.cryptocurrency}</span>
                  </div>
                  <span className="text-xs font-medium">
                    ${(Number(crypto.amount) * Number(crypto.purchase_price)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
