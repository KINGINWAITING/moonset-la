
import { motion } from "framer-motion";
import { WalletMinimal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CryptoPortfolio } from "@/types/supabase";

interface PortfolioSummaryProps {
  totalValue: number;
  chartData: Array<{ name: string; value: number }>;
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
  COLORS
}: PortfolioSummaryProps) => {
  return (
    <Card className="bg-[#0A0A0A] border border-gray-800 col-span-full">
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>
          {connected 
            ? `Wallet: ${account?.substring(0, 6)}...${account?.substring(account!.length - 4)}`
            : "Connect your wallet to view your assets"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-400 mb-1">Total Value</p>
              <h2 className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</h2>
            </div>
            
            <div className="bg-gray-800/30 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <WalletMinimal className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Assets</h3>
              </div>
              <p className="text-xl font-bold">
                {connected ? walletPortfolio.length : 0}
              </p>
              <p className="text-sm text-gray-400">Different cryptocurrencies</p>
            </div>
          </div>
          
          <div className="flex-1 mt-6 md:mt-0">
            {walletPortfolio.length > 0 ? (
              <ChartContainer 
                config={{
                  bitcoin: { color: COLORS[0] },
                  ethereum: { color: COLORS[1] },
                  ripple: { color: COLORS[2] },
                  litecoin: { color: COLORS[3] },
                  cardano: { color: COLORS[4] },
                }}
                className="h-56"
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-56 flex items-center justify-center">
                <p className="text-gray-400">
                  {connected ? "No wallet assets to display" : "Connect your wallet to see your assets"}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
