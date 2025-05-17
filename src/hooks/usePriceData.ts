
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { tokenConfig } from "@/config/tokenConfig";

interface PriceData {
  timestamp: string;
  price: number;
}

interface TokenStats {
  price: number;
  priceChange: number;
  volume: number;
  liquidity: number;
  marketCap: number;
  loading: boolean;
}

export const usePriceData = (timeframe: string = "24h") => {
  const { toast } = useToast();
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [tokenStats, setTokenStats] = useState<TokenStats>({
    price: 0,
    priceChange: 0,
    volume: 0,
    liquidity: 0,
    marketCap: 0,
    loading: true
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

  return { priceData, tokenStats };
};
