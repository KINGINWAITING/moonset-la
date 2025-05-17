
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { WalletConnectButton } from "../dashboard/moonset-token/WalletConnectButton";
import { PortfolioSummary } from "./portfolio/PortfolioSummary";
import { TransactionsList } from "./portfolio/TransactionsList";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export const PortfolioView = () => {
  const { session } = useAuth();
  const { account, connected } = useWeb3();
  const { isLoading, totalValue, chartData, walletPortfolio, recentTransactions } = usePortfolioData(session.user?.id);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];
  
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
          <PortfolioSummary 
            totalValue={totalValue}
            chartData={chartData}
            walletPortfolio={walletPortfolio}
            connected={connected}
            account={account}
            COLORS={COLORS}
          />
          
          {/* Recent Transactions */}
          <TransactionsList 
            recentTransactions={recentTransactions} 
            connected={connected} 
          />
        </div>
      )}
    </motion.div>
  );
};
