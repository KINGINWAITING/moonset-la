import React from 'react';
import { 
  Wallet,
  DollarSign,
  Activity,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/format-utils';
import { WalletConnectButton } from '../moonset-token/WalletConnectButton';

interface PortfolioSidebarProps {
  totalValue?: number;
  totalChange?: number;
  isPositive?: boolean;
  connected?: boolean;
  account?: string | null;
  onSendClick?: () => void;
  onReceiveClick?: () => void;
}

export const PortfolioSidebar = ({ 
  totalValue = 0, 
  totalChange = 0, 
  isPositive = true, 
  connected = false, 
  account = null, 
  onSendClick, 
  onReceiveClick 
}: PortfolioSidebarProps) => {
  // Safe formatting with fallbacks
  const safeFormatCurrency = (value: number | undefined) => {
    return formatCurrency(value || 0);
  };

  const safeToFixed = (value: number | undefined, decimals: number = 2) => {
    return (value || 0).toFixed(decimals);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Connection */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Wallet Connection
        </h3>
        <WalletConnectButton />
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Portfolio Summary
        </h3>
        
        <div className="space-y-3">
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Total Value
              </span>
            </div>
            <p className="text-xl font-semibold text-foreground">
              {safeFormatCurrency(totalValue)}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                24h Change
              </span>
            </div>
            <p className={cn(
              "text-xl font-semibold",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {isPositive ? '+' : ''}{safeToFixed(totalChange)}%
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Wallet Actions
        </h3>
        
        <div className="space-y-2">
          <button 
            onClick={onSendClick}
            disabled={!connected}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TrendingUp className="h-4 w-4" />
            Send Crypto
          </button>
          <button 
            onClick={onReceiveClick}
            disabled={!connected}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="h-4 w-4" />
            Receive Crypto
          </button>
        </div>
      </div>

      {/* Wallet Status */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Wallet Status
        </h3>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className={`h-4 w-4 ${connected ? 'text-green-600' : 'text-gray-400'}`} />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {connected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          <p className="text-sm text-foreground font-mono">
            {connected && account ? `${account.slice(0, 8)}...${account.slice(-6)}` : 'No wallet connected'}
          </p>
        </div>
      </div>
    </div>
  );
}; 