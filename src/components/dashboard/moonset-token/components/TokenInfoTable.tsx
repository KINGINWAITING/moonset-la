import React from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Coins, 
  Calendar,
  Target,
  Lock,
  Unlock,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/design-system/components/base';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/format-utils';

/**
 * Token information interface for type safety
 */
interface TokenInfo {
  name: string;
  symbol: string;
  contractAddress: string;
  totalSupply: string;
  circulatingSupply: string;
  currentPrice: string;
  marketCap: string;
  holders: string;
  decimals: number;
  network: string;
}

/**
 * Tokenomics distribution interface
 */
interface TokenomicsItem {
  category: string;
  percentage: number;
  amount: string;
  description: string;
  vestingPeriod?: string;
  unlockSchedule?: string;
  color: string;
}

interface TokenInfoTableProps {
  tokenInfo?: TokenInfo;
  tokenomics?: TokenomicsItem[];
  className?: string;
}

/**
 * Default token information for MOONSET
 */
const defaultTokenInfo: TokenInfo = {
  name: 'MOONSET',
  symbol: 'MOONSET',
  contractAddress: '0x1234567890123456789012345678901234567890',
  totalSupply: '1,000,000,000',
  circulatingSupply: '670,000,000',
  currentPrice: '$0.0045',
  marketCap: '$4,500,000',
  holders: '2,847',
  decimals: 18,
  network: 'Ethereum'
};

/**
 * Default tokenomics distribution
 */
const defaultTokenomics: TokenomicsItem[] = [
  {
    category: 'Public Sale (IDO)',
    percentage: 30,
    amount: '300,000,000',
    description: 'Available for public purchase during IDO',
    color: 'bg-blue-500'
  },
  {
    category: 'Team & Advisors',
    percentage: 20,
    amount: '200,000,000',
    description: 'Reserved for team members and advisors',
    vestingPeriod: '24 months',
    unlockSchedule: '6-month cliff, then linear',
    color: 'bg-purple-500'
  },
  {
    category: 'Ecosystem Development',
    percentage: 25,
    amount: '250,000,000',
    description: 'For platform development and partnerships',
    vestingPeriod: '36 months',
    unlockSchedule: 'Linear over 36 months',
    color: 'bg-green-500'
  },
  {
    category: 'Liquidity Pool',
    percentage: 15,
    amount: '150,000,000',
    description: 'DEX liquidity and market making',
    color: 'bg-orange-500'
  },
  {
    category: 'Marketing & Community',
    percentage: 10,
    amount: '100,000,000',
    description: 'Marketing campaigns and community rewards',
    vestingPeriod: '12 months',
    unlockSchedule: 'Quarterly releases',
    color: 'bg-pink-500'
  }
];

export const TokenInfoTable = ({ 
  tokenInfo = defaultTokenInfo, 
  tokenomics = defaultTokenomics,
  className = ""
}: TokenInfoTableProps) => {
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const openEtherscan = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Token Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                Token Information
              </CardTitle>
              <CardDescription>
                Comprehensive details about the MOONSET token
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Basic Token Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Token Name</p>
                <p className="text-lg font-semibold">{tokenInfo.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Symbol</p>
                <p className="text-lg font-semibold">{tokenInfo.symbol}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Network</p>
                <p className="text-lg font-semibold">{tokenInfo.network}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Decimals</p>
                <p className="text-lg font-semibold">{tokenInfo.decimals}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                <p className="text-lg font-semibold text-green-600">{tokenInfo.currentPrice}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
                <p className="text-lg font-semibold">{tokenInfo.marketCap}</p>
              </div>
            </div>

            <Separator />

            {/* Contract Address */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Contract Address</p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="flex-1 text-sm font-mono">{tokenInfo.contractAddress}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(tokenInfo.contractAddress)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEtherscan(tokenInfo.contractAddress)}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Supply Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="font-medium">Total Supply</p>
                </div>
                <p className="text-2xl font-bold">{tokenInfo.totalSupply}</p>
                <p className="text-sm text-muted-foreground">Maximum tokens that will ever exist</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="font-medium">Circulating Supply</p>
                </div>
                <p className="text-2xl font-bold">{tokenInfo.circulatingSupply}</p>
                <p className="text-sm text-muted-foreground">Tokens currently in circulation</p>
                
                {/* Supply Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Circulating</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{tokenInfo.holders}</p>
                <p className="text-sm text-muted-foreground">Token Holders</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">+12.5%</p>
                <p className="text-sm text-muted-foreground">24h Change</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">23d</p>
                <p className="text-sm text-muted-foreground">IDO Time Left</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tokenomics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Tokenomics Distribution
          </CardTitle>
          <CardDescription>
            How MOONSET tokens are allocated across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Tokenomics Chart Placeholder */}
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Tokenomics Chart</p>
                <p className="text-sm text-muted-foreground">
                  Interactive pie chart will be implemented
                </p>
              </div>
            </div>

            {/* Tokenomics Table */}
            <div className="space-y-4">
              {tokenomics.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <div>
                        <h4 className="font-medium">{item.category}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.percentage}%</p>
                      <p className="text-sm text-muted-foreground">{item.amount} tokens</p>
                    </div>
                  </div>

                  {/* Vesting Information */}
                  {(item.vestingPeriod || item.unlockSchedule) && (
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                      {item.vestingPeriod && (
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Vesting: {item.vestingPeriod}</span>
                        </div>
                      )}
                      {item.unlockSchedule && (
                        <div className="flex items-center gap-2">
                          <Unlock className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Unlock: {item.unlockSchedule}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Progress Bar for each category */}
                  <div className="mt-3">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Tokenomics Summary</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The tokenomics are designed to ensure long-term sustainability with proper vesting schedules 
                    for team allocations and sufficient liquidity for trading. The majority of tokens (30%) are 
                    available for public participation through the IDO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 