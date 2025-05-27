import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CryptoPortfolio } from "@/types/supabase";
import { useAccount, useBalance } from "@/context/WagmiProvider";

export const usePortfolioData = (userId: string | undefined) => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [portfolio, setPortfolio] = useState<CryptoPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('crypto_portfolio')
          .select('*')
          .eq('user_id', userId);
          
        if (fetchError) {
          throw fetchError;
        }
        
        // Convert database rows to CryptoPortfolio type
        const portfolioData = data?.map(item => ({
          id: item.id,
          cryptocurrency: item.cryptocurrency,
          amount: item.amount.toString(),
          purchase_price: item.purchase_price.toString(),
          user_id: item.user_id,
          purchase_date: item.purchase_date || undefined,
          change24h: 0 // Default value for 24h change
        })) || [];
        
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch portfolio data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolio();
  }, [userId]);

  // Fetch wallet balance
  // Wallet balance is now handled by the useBalance hook

  // Create wallet-based portfolio data
  const walletPortfolio: CryptoPortfolio[] = isConnected && address 
    ? [
        {
          id: "wallet-eth",
          cryptocurrency: "ETH",
          amount: balance ? balance.formatted : "0",
          purchase_price: "1",
          user_id: userId || "",
          purchase_date: new Date().toISOString(),
          change24h: 0 // Default value for 24h change
        },
        ...portfolio
      ] 
    : portfolio;
  
  // Calculate portfolio statistics from wallet data
  const totalValue = walletPortfolio.reduce((sum, item) => {
    const amount = Number(item.amount) || 0;
    const price = Number(item.purchase_price) || 0;
    return sum + (amount * price);
  }, 0);
  
  // Chart data from wallet
  const chartData = walletPortfolio.map(crypto => ({
    name: crypto.cryptocurrency,
    value: (Number(crypto.amount) || 0) * (Number(crypto.purchase_price) || 0)
  }));
  
  // Recent transactions using wallet data
  const recentTransactions = walletPortfolio.slice(0, 5);

  return {
    portfolio,
    isLoading,
    error,
    walletPortfolio,
    totalValue,
    chartData,
    recentTransactions,
  };
};
