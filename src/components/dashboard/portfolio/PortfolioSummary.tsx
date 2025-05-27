import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { Download, TrendingUp, TrendingDown, BarChart3, DollarSign, Wallet, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, StatsCard } from "@/design-system/components/base";
import { Button } from "@/design-system/components/base";
import { formatCurrency } from "@/lib/format-utils";
import { CustomTooltip } from "../moonset-token/CustomTooltip";
import { CryptoPortfolio } from "@/types/supabase";

interface PortfolioSummaryProps {
  totalValue: number;
  chartData: any[];
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
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  // Calculate portfolio metrics
  const totalChange = walletPortfolio.reduce((sum, item) => sum + ((Number(item.amount) || 0) * (Number(item.purchase_price) || 0) * 0.0234), 0);
  const totalChangePercent = totalValue > 0 ? (totalChange / totalValue) * 100 : 0;
  const totalVolume = walletPortfolio.reduce((sum, item) => sum + ((Number(item.amount) || 0) * (Number(item.purchase_price) || 0) * 84420), 0);
  const totalGrowth = 12.5; // Mock growth percentage

  return (
    <div className="space-y-12">
      {/* Portfolio Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
      >
        <StatsCard
          title="Portfolio Value"
          value={formatCurrency(totalValue)}
          icon={<DollarSign className="w-5 h-5" />}
          trend={{ value: 2.34, isPositive: true }}
          description="Total portfolio value"
        />
        
        <StatsCard
          title="24h Change"
          value={`${totalChangePercent >= 0 ? '+' : ''}${totalChangePercent.toFixed(2)}%`}
          icon={totalChangePercent >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          trend={{ value: Math.abs(totalChangePercent), isPositive: totalChangePercent >= 0 }}
          description="Performance today"
        />
        
        <StatsCard
          title="Volume (24h)"
          value={formatCurrency(totalVolume)}
          icon={<Activity className="w-5 h-5" />}
          trend={{ value: 15.2, isPositive: true }}
          description="24h trading activity"
        />
        
        <StatsCard
          title="Monthly Growth"
          value={`+${totalGrowth}%`}
          icon={<BarChart3 className="w-5 h-5" />}
          trend={{ value: totalGrowth, isPositive: true }}
          description="Performance trend"
        />
      </motion.div>

      {/* Main Portfolio Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <Card variant="glass-elevated" size="xl" className="overflow-hidden relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-60" />
          
          <CardHeader className="relative pb-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4">
                <CardTitle className="text-3xl font-bold flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 shadow-lg"
                  >
                    <BarChart3 className="w-7 h-7 text-primary" />
                  </motion.div>
                  Portfolio Overview
                </CardTitle>
                <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
                  Comprehensive analysis of your portfolio performance, asset allocation, and market insights
                </p>
              </div>
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {connected && account && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      <Wallet className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-emerald-600">Wallet Connected</p>
                      <p className="text-sm text-emerald-600/80 font-mono tracking-wider">
                        {account.slice(0, 8)}...{account.slice(-6)}
                      </p>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="lg"
                    leftIcon={<Download className="w-5 h-5" />}
                    className="px-6 py-3 rounded-xl border-2"
                  >
                    Download Report
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative pt-0 px-12 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
              {/* Portfolio Value Section */}
              <div className="lg:col-span-2 space-y-12">
                <div className="text-center lg:text-left space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-text-tertiary uppercase tracking-[0.2em] letter-spacing-wide">
                      Total Portfolio Value
                    </p>
                    <motion.h2 
                      className="text-6xl lg:text-7xl font-black text-text-primary leading-none tracking-tight"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {formatCurrency(totalValue)}
                    </motion.h2>
                  </div>
                  
                  <motion.div 
                    className={cn(
                      "inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-base font-bold shadow-lg",
                      totalChangePercent >= 0 
                        ? "bg-emerald-500/10 text-emerald-600 border-2 border-emerald-500/20" 
                        : "bg-red-500/10 text-red-600 border-2 border-red-500/20"
                    )}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {totalChangePercent >= 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span>
                      {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}% (24h)
                    </span>
                  </motion.div>
                </div>

                {/* Portfolio Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="group space-y-4 p-8 rounded-2xl bg-glass-bg/20 border border-glass-border/50 hover:bg-glass-bg/40 hover:border-glass-border transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">Volume (24h)</p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-text-primary leading-tight">
                      {formatCurrency(totalVolume)}
                    </p>
                    <p className="text-sm text-text-tertiary font-medium">Total trading volume</p>
                  </div>
                  
                  <div className="group space-y-4 p-8 rounded-2xl bg-glass-bg/20 border border-glass-border/50 hover:bg-glass-bg/40 hover:border-glass-border transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">Market Cap</p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-text-primary leading-tight">
                      {formatCurrency(totalVolume * 1000)}
                    </p>
                    <p className="text-sm text-text-tertiary font-medium">Total market value</p>
                  </div>
                </div>
              </div>

              {/* Asset Allocation Chart */}
              <div className="lg:col-span-1 space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-text-primary">Asset Allocation</h3>
                  <p className="text-base text-text-secondary leading-relaxed">Portfolio distribution and performance by cryptocurrency</p>
                </div>
                
                <div className="relative">
                  {chartData.length > 0 ? (
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={140}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <motion.div 
                      className="h-80 flex items-center justify-center border-2 border-dashed border-glass-border/50 rounded-2xl bg-glass-bg/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center space-y-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto">
                          <BarChart3 className="w-8 h-8 text-primary" />
                        </div>
                        <div className="space-y-3">
                          <p className="text-lg font-bold text-text-secondary">No Assets Found</p>
                          <p className="text-base text-text-tertiary max-w-sm leading-relaxed">
                            Connect your wallet or add cryptocurrency holdings to view your portfolio allocation and insights
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Asset Legend */}
                {chartData.length > 0 && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-text-secondary uppercase tracking-[0.1em]">
                      Holdings Breakdown
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {chartData.slice(0, 3).map((item, index) => (
                        <motion.div
                          key={item.name}
                          className="group flex items-center justify-between p-6 rounded-2xl bg-glass-bg/20 border border-glass-border/50 hover:bg-glass-bg/40 hover:border-glass-border hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                        >
                          <div className="flex items-center gap-5">
                            <div 
                              className="w-6 h-6 rounded-full shadow-md border-2 border-white/20"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-base font-bold text-text-primary">{item.name}</span>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-lg font-bold text-text-primary">
                              {formatCurrency(item.value)}
                            </p>
                            <p className="text-sm text-text-tertiary font-semibold">
                              {((item.value / totalValue) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
