import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, DollarSign, Target, Activity } from 'lucide-react';
import { formatCurrency } from '@/lib/format-utils';

interface TokenStat {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

interface RecentActivity {
  id: string;
  type: 'purchase' | 'swap' | 'liquidity';
  amount: string;
  user: string;
  timestamp: string;
}

export const IDOActivitySidebar = () => {
  const tokenStats: TokenStat[] = [
    {
      label: 'Current Price',
      value: '$0.0045',
      change: '+12.5%',
      changeType: 'positive',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      label: 'Market Cap',
      value: '$4.5M',
      change: '+8.2%',
      changeType: 'positive',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      label: 'Total Holders',
      value: '2,847',
      change: '+156',
      changeType: 'positive',
      icon: <Users className="h-4 w-4" />
    },
    {
      label: 'IDO Progress',
      value: '67%',
      change: 'Target: $10M',
      changeType: 'neutral',
      icon: <Target className="h-4 w-4" />
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'purchase',
      amount: '50,000 MOONSET',
      user: '0x1234...5678',
      timestamp: '2 min ago'
    },
    {
      id: '2',
      type: 'swap',
      amount: '25,000 MOONSET',
      user: '0x9876...4321',
      timestamp: '5 min ago'
    },
    {
      id: '3',
      type: 'liquidity',
      amount: '100,000 MOONSET',
      user: '0x5555...9999',
      timestamp: '8 min ago'
    },
    {
      id: '4',
      type: 'purchase',
      amount: '75,000 MOONSET',
      user: '0x1111...2222',
      timestamp: '12 min ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <DollarSign className="h-3 w-3 text-green-500" />;
      case 'swap':
        return <TrendingUp className="h-3 w-3 text-blue-500" />;
      case 'liquidity':
        return <Activity className="h-3 w-3 text-purple-500" />;
      default:
        return <Activity className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Statistics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Token Stats</h3>
        </div>
        
        <div className="space-y-4">
          {tokenStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {stat.icon}
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">{stat.value}</div>
                {stat.change && (
                  <div className={`text-xs ${getChangeColor(stat.changeType)}`}>
                    {stat.change}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* IDO Timeline */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">IDO Timeline</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Start Date</span>
            <span className="text-sm font-medium">Dec 15, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">End Date</span>
            <span className="text-sm font-medium">Jan 15, 2025</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Time Left</span>
            <span className="text-sm font-medium text-primary">23d 14h 32m</span>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>67%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '67%' }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {activity.amount}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  by {activity.user}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button className="w-full mt-3 text-sm text-primary hover:text-primary/80 transition-colors">
          View All Activity
        </button>
      </div>

      {/* Quick Links */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Resources</h3>
        <div className="space-y-2">
          <a 
            href="#" 
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            📄 Whitepaper
          </a>
          <a 
            href="#" 
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            🔗 Smart Contract
          </a>
          <a 
            href="#" 
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            📊 Analytics
          </a>
          <a 
            href="#" 
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            💬 Community
          </a>
        </div>
      </div>
    </div>
  );
}; 