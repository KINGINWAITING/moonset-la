import React, { memo, useMemo, useCallback, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAccount } from "@/context/WagmiProvider";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { PortfolioLayout } from "./portfolio/PortfolioLayout";
import { PortfolioHeader } from "./portfolio/PortfolioHeader";
import { PortfolioSidebar } from "./portfolio/PortfolioSidebar";
import { DashboardFooter } from "./DashboardFooter";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceMonitor, useMemoryCleanup } from "@/utils/performance";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy load heavy components for better performance
const HoldingsTable = React.lazy(() => import("./portfolio/HoldingsTable").then(module => ({ default: module.HoldingsTable })));
const TransactionsList = React.lazy(() => import("./portfolio/TransactionsList").then(module => ({ default: module.TransactionsList })));
const ActivitySidebar = React.lazy(() => import("./portfolio/ActivitySidebar").then(module => ({ default: module.ActivitySidebar })));
const WalletActionsPanel = React.lazy(() => import("./portfolio/WalletActionsPanel").then(module => ({ default: module.WalletActionsPanel })));

// Loading skeleton components
const TableSkeleton = memo(() => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
));

const WalletActionsSkeleton = memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
));

const PortfolioViewContent = memo(() => {
  const { user } = useAuth();
  const { address, isConnected } = useAccount();
  
  // Performance monitoring
  const { markStart, markEnd, logMetrics } = usePerformanceMonitor('PortfolioView');
  useMemoryCleanup([address]);
  
  // Fix: Move usePortfolioData outside of useMemo to follow hooks rules
  markStart('data-fetch');
  const portfolioData = usePortfolioData(user?.id);
  markEnd('data-fetch');

  const { 
    walletPortfolio, 
    totalValue, 
    isLoading, 
    error,
    recentTransactions 
  } = portfolioData;

  // Memoize calculated values
  const portfolioStats = useMemo(() => {
    const change24h = walletPortfolio.reduce((acc, holding) => acc + (holding.change24h || 0), 0);
    const isPositive = change24h >= 0;
    
    return {
      totalValue: totalValue || 0,
      change24h,
      isPositive,
      changePercentage: totalValue > 0 ? (change24h / totalValue) * 100 : 0
    };
  }, [walletPortfolio, totalValue]);

  // Memoize sidebar content with proper props
  const sidebarContent = useMemo(() => (
    <PortfolioSidebar 
      totalValue={portfolioStats.totalValue}
      totalChange={portfolioStats.changePercentage}
      isPositive={portfolioStats.isPositive}
      connected={isConnected}
      account={address}
      onSendClick={() => {/* TODO: Implement send functionality */}}
      onReceiveClick={() => {/* TODO: Implement receive functionality */}}
    />
  ), [portfolioStats, isConnected, address]);

  // Memoize header content
  const headerContent = useMemo(() => (
    <PortfolioHeader />
  ), []);

  // Memoize footer content
  const footerContent = useMemo(() => (
    <DashboardFooter />
  ), []);

  // Memoize right panel content with lazy loading
  const rightPanelContent = useMemo(() => (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <ActivitySidebar />
    </Suspense>
  ), []);

  // Callback for handling portfolio refresh
  const handleRefresh = useCallback(() => {
    // Trigger portfolio data refresh
    window.location.reload();
  }, []);

  if (error) {
    return (
      <PortfolioLayout
        header={headerContent}
        sidebar={sidebarContent}
        footer={footerContent}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading portfolio data</p>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </PortfolioLayout>
    );
  }

  return (
    <PortfolioLayout
      header={headerContent}
      sidebar={sidebarContent}
      rightPanel={rightPanelContent}
      footer={footerContent}
    >
      <div className="space-y-8 pb-8 portfolio-section-extended">
        {/* Portfolio Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card portfolio-card">
            <div className="text-sm text-muted-foreground mb-1">Total Value</div>
            <div className="text-2xl font-semibold text-foreground">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-border bg-card portfolio-card">
            <div className="text-sm text-muted-foreground mb-1">24h Change</div>
            <div className={`text-2xl font-semibold ${portfolioStats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.isPositive ? '+' : ''}${Math.abs(portfolioStats.change24h).toLocaleString()}
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-border bg-card portfolio-card">
            <div className="text-sm text-muted-foreground mb-1">24h Change %</div>
            <div className={`text-2xl font-semibold ${portfolioStats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.isPositive ? '+' : ''}{portfolioStats.changePercentage.toFixed(2)}%
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-border bg-card portfolio-card">
            <div className="text-sm text-muted-foreground mb-1">Assets</div>
            <div className="text-2xl font-semibold text-foreground">
              {walletPortfolio.length}
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden portfolio-card portfolio-section-extended">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Holdings</h2>
            <p className="text-sm text-muted-foreground mt-1">Your cryptocurrency portfolio</p>
          </div>
          <div className="portfolio-table-container">
            <Suspense fallback={<TableSkeleton />}>
              <HoldingsTable 
                holdings={walletPortfolio}
                isLoading={isLoading}
                totalValue={portfolioStats.totalValue}
              />
            </Suspense>
          </div>
        </div>

        {/* Wallet Actions Panel - Horizontal Layout */}
        <div className="portfolio-section-extended">
          <Suspense fallback={<WalletActionsSkeleton />}>
            <WalletActionsPanel horizontal={true} />
          </Suspense>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-lg border border-border bg-card overflow-hidden portfolio-card portfolio-section-extended">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground mt-1">Your latest transaction history</p>
          </div>
          <div className="portfolio-table-container">
            <Suspense fallback={<TableSkeleton />}>
              <TransactionsList 
                transactions={recentTransactions}
                isLoading={isLoading}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </PortfolioLayout>
  );
});

PortfolioViewContent.displayName = 'PortfolioViewContent';

const PortfolioView = memo(() => {
  return (
    <ErrorBoundary>
      <PortfolioViewContent />
    </ErrorBoundary>
  );
});

PortfolioView.displayName = 'PortfolioView';

export { PortfolioView };
