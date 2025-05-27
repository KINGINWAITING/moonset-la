// Professional Token Header Component

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink, Copy, TrendingUp, TrendingDown, Clock, Globe, Users } from 'lucide-react';
import { TokenHeaderProps } from '../types/token.types';
import { formatPrice, formatPercentage, getPercentageColor } from '../utils/tokenApi';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from '@/context/ThemeContext';
import { MoonLogo } from '@/components/navigation/MoonLogo';
import { tokenConfig } from '@/config/tokenConfig';
import { toast } from 'sonner';
import clsx from 'clsx';

// Enhanced Loading skeleton component
const TokenHeaderSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={clsx(
      'rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300',
      isDark ? 'bg-gray-900/60 border-gray-800/50' : 'bg-white/60 border-gray-200/50'
    )}>
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className={clsx(
            'w-20 h-20 rounded-2xl animate-pulse ring-4 ring-opacity-20',
            isDark ? 'bg-gray-800 ring-gray-700' : 'bg-gray-300 ring-gray-400'
          )} />
          <div className="space-y-3">
            <div className={clsx(
              'h-8 w-40 animate-pulse rounded-lg',
              isDark ? 'bg-gray-800' : 'bg-gray-300'
            )} />
            <div className={clsx(
              'h-5 w-32 animate-pulse rounded-md',
              isDark ? 'bg-gray-800' : 'bg-gray-300'
            )} />
            <div className={clsx(
              'h-4 w-28 animate-pulse rounded-md',
              isDark ? 'bg-gray-800' : 'bg-gray-300'
            )} />
          </div>
        </div>
        <div className="text-right space-y-3">
          <div className={clsx(
            'h-10 w-36 animate-pulse rounded-lg ml-auto',
            isDark ? 'bg-gray-800' : 'bg-gray-300'
          )} />
          <div className={clsx(
            'h-6 w-28 animate-pulse rounded-md ml-auto',
            isDark ? 'bg-gray-800' : 'bg-gray-300'
          )} />
        </div>
      </div>
      
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-3">
            <div className={clsx(
              'h-4 w-20 animate-pulse rounded',
              isDark ? 'bg-gray-800' : 'bg-gray-300'
            )} />
            <div className={clsx(
              'h-6 w-24 animate-pulse rounded',
              isDark ? 'bg-gray-800' : 'bg-gray-300'
            )} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced animated price change indicator
const PriceChangeIndicator = ({ change, className }: { change: number; className?: string }) => {
  const isPositive = change > 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        'flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm',
        isPositive 
          ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
          : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
        className
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{formatPercentage(change)}</span>
    </motion.div>
  );
};

// Enhanced copy to clipboard utility
const copyToClipboard = async (text: string, successMessage: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch (error) {
    toast.error('Failed to copy to clipboard');
  }
};

// Professional stat card component
const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  delay = 0,
  gradient = false 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string | React.ReactNode; 
  delay?: number;
  gradient?: boolean;
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={clsx(
        'group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105',
        gradient 
          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20' 
          : isDark 
            ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70' 
            : 'bg-white/50 border border-gray-200/50 hover:bg-white/70',
        'backdrop-blur-sm'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={clsx(
            'p-3 rounded-xl',
            gradient 
              ? 'bg-gradient-to-br from-primary/20 to-secondary/20' 
              : isDark 
                ? 'bg-gray-700/50' 
                : 'bg-gray-100/50'
          )}
        >
          <Icon className={clsx(
            'w-6 h-6',
            gradient ? 'text-primary' : isDark ? 'text-gray-300' : 'text-gray-600'
          )} />
        </motion.div>
      </div>
      
      <div className="space-y-1">
        <p className={clsx(
          'text-sm font-medium',
          isDark ? 'text-gray-400' : 'text-gray-600'
        )}>
          {label}
        </p>
        <div className={clsx(
          'text-xl font-bold',
          isDark ? 'text-white' : 'text-gray-900'
        )}>
          {value}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className={clsx(
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
        'bg-gradient-to-br from-primary/5 to-secondary/5'
      )} />
    </motion.div>
  );
};

export function TokenHeader({ token, price, loading, error }: TokenHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Show skeleton while loading
  if (loading) {
    return <TokenHeaderSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
          'rounded-2xl p-8 border backdrop-blur-sm',
          isDark ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50/80 border-red-200/50'
        )}
      >
        <div className="text-center space-y-4">
          <div className={clsx(
            'w-16 h-16 mx-auto rounded-full flex items-center justify-center',
            isDark ? 'bg-red-800/30' : 'bg-red-100'
          )}>
            <Clock className={clsx(
              'w-8 h-8',
              isDark ? 'text-red-400' : 'text-red-600'
            )} />
          </div>
          <div>
            <h3 className={clsx(
              'text-lg font-semibold mb-2',
              isDark ? 'text-red-400' : 'text-red-700'
            )}>
              Token Information Unavailable
            </h3>
            <p className={clsx(
              'text-sm',
              isDark ? 'text-red-300' : 'text-red-600'
            )}>
              {error}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const isPositiveChange = (price.change24hPercent || 0) > 0;
  const isPreLaunch = !tokenConfig.isLaunched;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(
        'rounded-2xl p-8 backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl',
        isDark 
          ? 'bg-gray-900/60 border-gray-800/50 hover:bg-gray-900/70 hover:border-gray-700/50' 
          : 'bg-white/60 border-gray-200/50 hover:bg-white/70 hover:border-gray-300/50',
        'relative overflow-hidden'
      )}
    >
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      {/* Main Header Section */}
      <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
        {/* Token Identity Section */}
        <div className="flex items-center space-x-6">
          {/* Enhanced Token Logo */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={clsx(
                'w-20 h-20 rounded-2xl ring-4 flex items-center justify-center transition-all duration-300',
                'bg-gradient-to-br from-primary to-secondary ring-primary/20 hover:ring-primary/40',
                'shadow-lg hover:shadow-xl hover:shadow-primary/20'
              )}
            >
              <MoonLogo 
                className="w-42 h-42 filter drop-shadow-[0_0_18px_rgba(139,69,255,0.8)]" 
                animated={true}
              />
            </motion.div>
            
            {/* Status indicators */}
            {token.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3, type: "spring", stiffness: 200 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center ring-4 ring-white dark:ring-gray-900 shadow-lg"
              >
                <Shield className="w-4 h-4 text-white" />
              </motion.div>
            )}
            
            {isPreLaunch && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3, type: "spring", stiffness: 200 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center ring-4 ring-white dark:ring-gray-900 shadow-lg"
              >
                <Clock className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          {/* Token Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center space-x-3"
              >
                <h1 className={clsx(
                  'text-3xl lg:text-4xl font-bold tracking-tight',
                  isDark ? 'text-white' : 'text-gray-900'
                )}>
                  {token.name}
                </h1>
                <Badge 
                  variant="outline" 
                  className="text-sm font-mono px-3 py-1 border-2"
                >
                  {token.symbol}
                </Badge>
              </motion.div>
              
              {isPreLaunch && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-4 py-2 text-sm">
                    🚀 Launching Soon
                  </Badge>
                </motion.div>
              )}
            </div>
            
            {/* Contract and links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => copyToClipboard(token.contractAddress, 'Contract address copied!')}
                className={clsx(
                  'group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200',
                  'font-mono text-sm border backdrop-blur-sm hover:scale-105',
                  isDark 
                    ? 'text-gray-300 hover:text-white bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 bg-white/50 border-gray-300 hover:bg-white/70'
                )}
              >
                <span>{`${token.contractAddress.slice(0, 8)}...${token.contractAddress.slice(-6)}`}</span>
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              
              {token.website && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(token.website, '_blank')}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Price Display */}
        <div className="text-center lg:text-right">
          <motion.div
            key={price.current} // Re-animate on price change
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className={clsx(
              'text-4xl lg:text-5xl font-bold tracking-tight',
              isDark ? 'text-white' : 'text-gray-900'
            )}>
              {isPreLaunch ? (
                <span className="text-2xl lg:text-3xl text-primary">Price TBA</span>
              ) : (
                formatPrice(price.current)
              )}
            </div>
            
            {!isPreLaunch && (
              <div className="flex items-center justify-center lg:justify-end space-x-3">
                <PriceChangeIndicator change={price.change24hPercent || 0} />
                <Badge variant="secondary" className="text-xs">
                  24H
                </Badge>
              </div>
            )}
            
            <p className={clsx(
              'text-sm',
              isDark ? 'text-gray-400' : 'text-gray-500'
            )}>
              {isPreLaunch 
                ? 'Launching on Uniswap Soon' 
                : `Updated ${price.lastUpdated.toLocaleTimeString()}`
              }
            </p>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Supply"
          value={parseInt(tokenConfig.totalSupply).toLocaleString()}
          delay={0.2}
        />
        
        <StatCard
          icon={Globe}
          label="Network"
          value="Ethereum"
          delay={0.25}
        />
        
        <StatCard
          icon={Shield}
          label="Decimals"
          value={tokenConfig.decimals}
          delay={0.3}
        />
        
        <StatCard
          icon={isPreLaunch ? Clock : TrendingUp}
          label="Status"
          value={
            <div className="flex items-center space-x-2">
              <div className={clsx(
                'w-3 h-3 rounded-full animate-pulse',
                isPreLaunch ? 'bg-blue-500' : 'bg-green-500'
              )} />
              <span className={clsx(
                'text-sm font-semibold',
                isPreLaunch 
                  ? (isDark ? 'text-blue-400' : 'text-blue-600')
                  : (isDark ? 'text-green-400' : 'text-green-600')
              )}>
                {isPreLaunch ? 'Coming Soon' : 'Live Trading'}
              </span>
            </div>
          }
          delay={0.35}
          gradient={!isPreLaunch}
        />
      </div>

      {/* Enhanced Token Description */}
      {token.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className={clsx(
            'mt-8 pt-8 border-t',
            isDark ? 'border-gray-800/50' : 'border-gray-200/50'
          )}
        >
          <div className={clsx(
            'p-6 rounded-xl backdrop-blur-sm',
            isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'
          )}>
            <h3 className={clsx(
              'text-lg font-semibold mb-3 flex items-center space-x-2',
              isDark ? 'text-white' : 'text-gray-900'
            )}>
              <MoonLogo className="w-15 h-15 filter drop-shadow-[0_0_6px_rgba(124,58,237,0.6)]" animated={true} />
              <span>About {token.symbol}</span>
            </h3>
            <p className={clsx(
              'text-base leading-relaxed',
              isDark ? 'text-gray-300' : 'text-gray-700'
            )}>
              {token.description}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 