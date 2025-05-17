
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend 
} from "recharts";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

// Token for display (ETH for now, this can be changed later)
const TOKEN_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
const TOKEN_SYMBOL = "ETH";

// Web3 Provider for Uniswap Widget
function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

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
  borderRadius: 0.8,
};

export const MoonsetTokenView = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState("24h");
  const [priceData, setPriceData] = useState<any[]>([]);
  const [tokenStats, setTokenStats] = useState({
    price: 0,
    priceChange: 0,
    volume: 0,
    liquidity: 0,
    marketCap: 0,
    loading: true
  });
  
  // Injected connector for Metamask
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
  });

  // Fetch price data from Uniswap
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        // Simulate fetching price data
        // In a real implementation, you would use the Uniswap SDK or API
        const now = Date.now();
        const oneDayAgo = now - 86400000; // 24 hours ago
        
        // Generate sample data for now - replace with real API call
        const sampleData = Array(24).fill(0).map((_, i) => {
          const time = new Date(oneDayAgo + (i * 3600000));
          return {
            timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: 2000 + Math.random() * 200, // Sample ETH price around $2000
          };
        });
        
        setPriceData(sampleData);
        
        // Set token stats
        const currentPrice = sampleData[sampleData.length - 1].price;
        const previousPrice = sampleData[0].price;
        const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
        
        setTokenStats({
          price: currentPrice,
          priceChange,
          volume: 1250000 + Math.random() * 500000,
          liquidity: 2500000 + Math.random() * 1000000,
          marketCap: 175000000 + Math.random() * 50000000,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching price data:", error);
        toast({
          title: "Error",
          description: "Failed to load price data",
          variant: "destructive"
        });
      }
    };

    fetchPriceData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      fetchPriceData();
    }, 60000);

    return () => clearInterval(interval);
  }, [toast, timeframe]);

  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {TOKEN_SYMBOL} <span className="text-primary">Token</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Token stats and chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-[#121212] border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>Price</CardDescription>
              </CardHeader>
              <CardContent>
                {tokenStats.loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <p className="text-2xl font-bold">{formatCurrency(tokenStats.price)}</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-[#121212] border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>24h Change</CardDescription>
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
            
            <Card className="bg-[#121212] border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>24h Volume</CardDescription>
              </CardHeader>
              <CardContent>
                {tokenStats.loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <p className="text-2xl font-bold">{formatLargeNumber(tokenStats.volume)}</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-[#121212] border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>TVL</CardDescription>
              </CardHeader>
              <CardContent>
                {tokenStats.loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <p className="text-2xl font-bold">{formatLargeNumber(tokenStats.liquidity)}</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Price chart */}
          <Card className="bg-[#121212] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Price Chart</CardTitle>
                <Tabs defaultValue="24h" className="w-auto">
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
              {tokenStats.loading ? (
                <div className="w-full h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ChartContainer 
                  className="h-80" 
                  config={{
                    price: { theme: { dark: '#4ADE80' } }
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
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
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
        </div>

        {/* Right column - Swap widget */}
        <div>
          <Card className="h-full bg-[#121212] border-gray-800">
            <CardHeader>
              <CardTitle>Swap Tokens</CardTitle>
              <CardDescription>Trade tokens directly on Uniswap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[550px]">
                <Web3ReactProvider getLibrary={getLibrary}>
                  <SwapWidget 
                    theme={darkTheme}
                    width="100%"
                    defaultOutputTokenAddress={TOKEN_ADDRESS}
                    convenienceFee={0}
                    className="!bg-[#121212] rounded-lg overflow-hidden"
                  />
                </Web3ReactProvider>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1B1B1B] p-3 border border-gray-800 rounded-md shadow-lg">
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-lg font-semibold text-primary">
          ${Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};
