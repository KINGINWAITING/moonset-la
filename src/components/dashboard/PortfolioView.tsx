
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, TrendingUp, TrendingDown, WalletMinimal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { CryptoPortfolio } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useWeb3 } from "@/context/Web3Context";
import { ethers } from "ethers";
import { WalletConnectButton } from "../dashboard/moonset-token/WalletConnectButton";

export const PortfolioView = () => {
  const { session } = useAuth();
  const { account, connected, provider } = useWeb3();
  const [portfolio, setPortfolio] = useState<CryptoPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState<string>("0");
  
  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!session.user) return;
      
      try {
        const { data, error } = await supabase
          .from('crypto_portfolio')
          .select('*')
          .eq('user_id', session.user.id);
          
        if (error) {
          throw error;
        }
        
        setPortfolio(data || []);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolio();
  }, [session.user]);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (connected && provider && account) {
        try {
          const balance = await provider.getBalance(account);
          setWalletBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error("Error fetching wallet balance:", error);
        }
      }
    };

    fetchWalletBalance();
  }, [connected, provider, account]);

  // Create wallet-based portfolio data
  const walletPortfolio = connected && account ? [
    {
      id: 1,
      cryptocurrency: "ETH",
      amount: walletBalance,
      purchase_price: "1",
      user_id: session.user?.id || "",
      purchase_date: new Date().toISOString(),
    },
    ...portfolio
  ] : portfolio;
  
  // Calculate portfolio statistics from wallet data
  const totalValue = walletPortfolio.reduce((sum, item) => {
    return sum + (Number(item.amount) * Number(item.purchase_price));
  }, 0);
  
  // Chart data from wallet
  const chartData = walletPortfolio.map(crypto => ({
    name: crypto.cryptocurrency,
    value: Number(crypto.amount) * Number(crypto.purchase_price)
  }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];
  
  // Recent transactions using wallet data
  const recentTransactions = walletPortfolio.slice(0, 5);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Portfolio Dashboard</h1>
          <p className="text-gray-400">View and manage your cryptocurrency assets</p>
        </div>
        <Button className="mt-4 md:mt-0 button-gradient">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      {/* Wallet Connect Button */}
      <div className="mb-6">
        <WalletConnectButton />
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Portfolio Summary Card */}
          <Card className="bg-[#0A0A0A] border border-gray-800 col-span-full">
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
              <CardDescription>
                {connected 
                  ? `Wallet: ${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                        <h3 className="font-medium">Profit/Loss</h3>
                      </div>
                      <p className="text-xl font-bold text-green-500">+$1,234.56</p>
                      <p className="text-sm text-gray-400">+12.34%</p>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <WalletMinimal className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="font-medium">Assets</h3>
                      </div>
                      <p className="text-xl font-bold">
                        {connected ? walletPortfolio.length : portfolio.length}
                      </p>
                      <p className="text-sm text-gray-400">Different cryptocurrencies</p>
                    </div>
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
          
          {/* Recent Transactions */}
          <Card className="bg-[#0A0A0A] border border-gray-800 col-span-full">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest cryptocurrency transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-2 font-medium">Asset</th>
                        <th className="pb-2 font-medium">Amount</th>
                        <th className="pb-2 font-medium">Price</th>
                        <th className="pb-2 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((tx, index) => (
                        <tr key={tx.id || `wallet-tx-${index}`} className="border-b border-gray-800">
                          <td className="py-4 flex items-center">
                            <div className="w-8 h-8 bg-gray-800 rounded-full mr-2"></div>
                            <div>
                              <p className="font-medium">{tx.cryptocurrency}</p>
                              <p className="text-sm text-gray-400">
                                {tx.cryptocurrency === "ETH" && connected ? "Wallet" : "Buy"}
                              </p>
                            </div>
                          </td>
                          <td className="py-4">
                            {Number(tx.amount).toFixed(4)} {tx.cryptocurrency}
                          </td>
                          <td className="py-4">${Number(tx.purchase_price).toFixed(2)}</td>
                          <td className="py-4 text-gray-400">
                            {new Date(tx.purchase_date || '').toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    {connected ? "No wallet transactions" : "Connect your wallet to view transactions"}
                  </p>
                  <Button className="mt-4 button-gradient">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

