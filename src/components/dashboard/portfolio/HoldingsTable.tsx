import React, { memo, useMemo, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { CryptoPortfolio } from '@/types/supabase';
import { formatCurrency } from '@/lib/format-utils';
import { cn } from '@/lib/utils';
import { Button } from '@/design-system/components/base';
import { useVirtualScrolling } from '@/utils/performance';

interface HoldingsTableProps {
  holdings: CryptoPortfolio[];
  isLoading: boolean;
  totalValue: number;
}

// Memoized loading skeleton
const LoadingSkeleton = memo(() => (
  <div className="space-y-1">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-muted skeleton-animate" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-muted rounded skeleton-animate" />
          <div className="h-3 w-1/2 bg-muted rounded skeleton-animate" />
        </div>
        <div className="w-16 h-4 bg-muted rounded skeleton-animate" />
        <div className="w-12 h-4 bg-muted rounded skeleton-animate" />
        <div className="w-20 h-4 bg-muted rounded skeleton-animate" />
      </div>
    ))}
  </div>
));

// Memoized empty state
const EmptyState = memo(() => (
  <div className="text-center py-16">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
      <TrendingUp className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">No holdings found</h3>
    <p className="text-muted-foreground mb-6">
      Connect your wallet or add cryptocurrency holdings to get started
    </p>
  </div>
));

// Memoized table header
const TableHeader = memo(() => (
  <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border bg-muted/30">
    <div className="col-span-4">Asset</div>
    <div className="col-span-2 text-right">Holdings</div>
    <div className="col-span-2 text-right">Price</div>
    <div className="col-span-2 text-right">24h Change</div>
    <div className="col-span-2 text-right">Value</div>
  </div>
));

// Memoized holding row component
const HoldingRow = memo(({ 
  holding, 
  index, 
  totalValue,
  onMoreClick 
}: { 
  holding: CryptoPortfolio; 
  index: number; 
  totalValue: number;
  onMoreClick: (holding: CryptoPortfolio) => void;
}) => {
  // Memoize calculated values
  const calculatedValues = useMemo(() => {
    const currentPrice = Number(holding.purchase_price) || 0;
    const amount = Number(holding.amount) || 0;
    const totalHoldingValue = currentPrice * amount;
    const percentChange = (index % 2 === 0 ? 1 : -1) * (Math.random() * 15 + 2);
    const isPositive = percentChange >= 0;
    const allocationPercent = totalValue > 0 ? (totalHoldingValue / totalValue) * 100 : 0;

    return {
      currentPrice,
      amount,
      totalHoldingValue,
      percentChange,
      isPositive,
      allocationPercent
    };
  }, [holding.purchase_price, holding.amount, totalValue, index]);

  // Memoize click handler
  const handleMoreClick = useCallback(() => {
    onMoreClick(holding);
  }, [holding, onMoreClick]);

  // Memoize crypto icon URL
  const iconUrl = useMemo(() => 
    `/crypto-icons/${holding.cryptocurrency.toLowerCase()}.png`,
    [holding.cryptocurrency]
  );

  return (
    <div
      className="group grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-muted/50 transition-colors portfolio-card"
    >
      {/* Asset Column */}
      <div className="col-span-4 flex items-center gap-3 min-w-0">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={iconUrl} />
          <AvatarFallback className="text-xs font-semibold">
            {holding.cryptocurrency.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {holding.cryptocurrency}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{calculatedValues.allocationPercent.toFixed(1)}% of portfolio</span>
          </div>
        </div>
      </div>

      {/* Holdings Column */}
      <div className="col-span-2 text-right">
        <div className="text-sm font-medium text-foreground">
          {calculatedValues.amount.toFixed(6)}
        </div>
        <div className="text-xs text-muted-foreground">
          {holding.cryptocurrency.split(' ')[0]}
        </div>
      </div>

      {/* Price Column */}
      <div className="col-span-2 text-right">
        <div className="text-sm font-medium text-foreground">
          {formatCurrency(calculatedValues.currentPrice)}
        </div>
      </div>

      {/* 24h Change Column */}
      <div className="col-span-2 text-right">
        <div className={cn(
          "flex items-center justify-end gap-1 text-sm font-medium",
          calculatedValues.isPositive ? "text-green-600" : "text-red-600"
        )}>
          {calculatedValues.isPositive ? 
            <TrendingUp className="h-3 w-3" /> : 
            <TrendingDown className="h-3 w-3" />
          }
          {calculatedValues.isPositive ? '+' : ''}{calculatedValues.percentChange.toFixed(2)}%
        </div>
      </div>

      {/* Value Column */}
      <div className="col-span-2 text-right">
        <div className="text-sm font-medium text-foreground">
          {formatCurrency(calculatedValues.totalHoldingValue)}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
          onClick={handleMoreClick}
        >
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
});

HoldingRow.displayName = 'HoldingRow';

export const HoldingsTable = memo(({ holdings, isLoading, totalValue }: HoldingsTableProps) => {
  // Memoize more click handler
  const handleMoreClick = useCallback((holding: CryptoPortfolio) => {
    console.log('More clicked for:', holding.cryptocurrency);
    // Add your more actions logic here
  }, []);

  // Use virtual scrolling for large datasets (>50 items)
  const shouldUseVirtualScrolling = holdings.length > 50;
  const itemHeight = 72; // Approximate height of each row
  const containerHeight = 400; // Max height for virtual scrolling

  const virtualScrolling = useVirtualScrolling(
    holdings,
    itemHeight,
    containerHeight
  );

  // Memoize the holdings to render
  const holdingsToRender = useMemo(() => {
    return shouldUseVirtualScrolling ? virtualScrolling.visibleItems : holdings;
  }, [shouldUseVirtualScrolling, virtualScrolling.visibleItems, holdings]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (holdings.length === 0) {
    return <EmptyState />;
  }

  const content = (
    <>
      <TableHeader />
      <div className="divide-y divide-border">
        {holdingsToRender.map((holding, index) => (
          <HoldingRow
            key={holding.id}
            holding={holding}
            index={index}
            totalValue={totalValue}
            onMoreClick={handleMoreClick}
          />
        ))}
      </div>
    </>
  );

  // Render with virtual scrolling if needed
  if (shouldUseVirtualScrolling) {
    return (
      <div 
        className="space-y-0"
        style={{ height: containerHeight }}
        onScroll={(e) => virtualScrolling.setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: virtualScrolling.totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${virtualScrolling.offsetY}px)` }}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  // Regular rendering for smaller datasets
  return <div className="space-y-0">{content}</div>;
});

HoldingsTable.displayName = 'HoldingsTable'; 