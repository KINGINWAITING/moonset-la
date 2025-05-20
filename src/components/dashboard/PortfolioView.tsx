
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/context/Web3Context";
import { WalletConnectButton } from "../dashboard/moonset-token/WalletConnectButton";
import { PortfolioSummary } from "./portfolio/PortfolioSummary";
import { TransactionsList } from "./portfolio/TransactionsList";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { DateRangePicker } from "./DateRangePicker";
import { useTheme } from "@/context/ThemeContext";

export const PortfolioView = () => {
  const { session } = useAuth();
  const { account, connected } = useWeb3();
  const { isLoading, totalValue, chartData, walletPortfolio, recentTransactions } = usePortfolioData(session.user?.id);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const COLORS = ['#4ADE80', '#A259FF', '#FFBB28', '#FF8042', '#1EAEDB'];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`p-6 md:p-8 ${isDark ? "bg-black text-white" : "bg-white text-black"} min-h-screen transition-colors`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, {session.user?.username || 'User'}</h1>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>Here's a look at your performance and analytics.</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <DateRangePicker />
            <WalletConnectButton />
          </div>
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
      </div>
    </motion.div>
  );
};
