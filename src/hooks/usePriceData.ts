
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
        
        let dataPeriod = 86400000; // Default to 24 hours (24h)
        let dataPoints = 48; // Default number of data points for 24h (one every 30 min)
        
        switch(timeframe) {
          case "1h":
            dataPeriod = 3600000; // 1 hour
            dataPoints = 60; // One point per minute
            break;
          case "7d":
            dataPeriod = 604800000; // 7 days
            dataPoints = 84; // One point every 2 hours
            break;
          case "30d":
            dataPeriod = 2592000000; // 30 days
            dataPoints = 90; // One point every 8 hours
            break;
          default: // 24h
            dataPeriod = 86400000; // 24 hours
            dataPoints = 48; // One point every 30 minutes
        }
        
        const startTime = now - dataPeriod;
        
        // Generate more detailed sample data
        const sampleData = Array(dataPoints).fill(0).map((_, i) => {
          const time = new Date(startTime + (i * (dataPeriod / dataPoints)));
          
          // Create realistic price movements with some randomness but also trends
          const basePrice = 2000;
          const trend = Math.sin(i / (dataPoints / 6)) * 100; // Create a wave pattern
          const noise = (Math.random() - 0.5) * 80; // Add some noise
          
          return {
            timestamp: timeframe === "1h" 
              ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : timeframe === "24h"
                ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : time.toLocaleDateString([], { month: 'short', day: 'numeric' }),
            price: basePrice + trend + noise,
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
