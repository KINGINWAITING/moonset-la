
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { supabase } from "@/integrations/supabase/client";
import { CryptoPortfolio } from "@/types/supabase";
import { useWeb3 } from "@/context/Web3Context";

export const usePortfolioData = (userId: string | undefined) => {
  const { account, connected, provider } = useWeb3();
  const [portfolio, setPortfolio] = useState<CryptoPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState<string>("0");

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!userId) return;
      
      try {
        const { data, error } = await supabase
          .from('crypto_portfolio')
          .select('*')
          .eq('user_id', userId);
          
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
  }, [userId]);

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
      user_id: userId || "",
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
  
  // Recent transactions using wallet data
  const recentTransactions = walletPortfolio.slice(0, 5);

  return {
    portfolio,
    isLoading,
    walletPortfolio,
    totalValue,
    chartData,
    recentTransactions,
  };
};
