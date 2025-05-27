import React, { useState, memo, useMemo, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, QrCode, Wallet } from 'lucide-react';
import { useAccount } from '@/context/WagmiProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the crypto widgets for better performance
const SendCryptoWidget = React.lazy(() => import('./SendCryptoWidget').then(module => ({ default: module.SendCryptoWidget })));
const ReceiveCryptoWidget = React.lazy(() => import('./ReceiveCryptoWidget').then(module => ({ default: module.ReceiveCryptoWidget })));

interface WalletActionsPanelProps {
  horizontal?: boolean;
}

// Loading skeleton for crypto widgets
const CryptoWidgetSkeleton = memo(() => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-32" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-24" />
  </div>
));

export const WalletActionsPanel = memo(({ horizontal = false }: WalletActionsPanelProps) => {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('send');

  // Memoize the not connected alert
  const notConnectedAlert = useMemo(() => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Please connect your wallet to access send and receive functions.
      </AlertDescription>
    </Alert>
  ), []);

  // Memoize tab triggers
  const tabTriggers = useMemo(() => (
    <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
      <TabsTrigger value="send" className="flex items-center gap-2">
        <Send className="h-4 w-4" />
        Send
      </TabsTrigger>
      <TabsTrigger value="receive" className="flex items-center gap-2">
        <QrCode className="h-4 w-4" />
        Receive
      </TabsTrigger>
    </TabsList>
  ), []);

  // Memoize desktop layout tab triggers
  const desktopTabTriggers = useMemo(() => (
    <TabsList className="grid w-full grid-cols-2 mb-6">
      <TabsTrigger value="send" className="flex items-center gap-2">
        <Send className="h-4 w-4" />
        Send
      </TabsTrigger>
      <TabsTrigger value="receive" className="flex items-center gap-2">
        <QrCode className="h-4 w-4" />
        Receive
      </TabsTrigger>
    </TabsList>
  ), []);

  // Memoize send widget content
  const sendWidgetContent = useMemo(() => (
    <Suspense fallback={<CryptoWidgetSkeleton />}>
      <SendCryptoWidget />
    </Suspense>
  ), []);

  // Memoize receive widget content
  const receiveWidgetContent = useMemo(() => (
    <Suspense fallback={<CryptoWidgetSkeleton />}>
      <ReceiveCryptoWidget />
    </Suspense>
  ), []);

  if (horizontal) {
    return (
      <Card className="w-full portfolio-card wallet-actions-horizontal portfolio-section-extended">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Actions
          </CardTitle>
          <CardDescription>Send and receive cryptocurrency</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile/Tablet: Show tabs */}
          <div className="lg:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {tabTriggers}
              <TabsContent value="send" className="mt-0">
                {isConnected ? sendWidgetContent : notConnectedAlert}
              </TabsContent>
              <TabsContent value="receive" className="mt-0">
                {isConnected ? receiveWidgetContent : notConnectedAlert}
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop: Show side by side */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Crypto
                </h3>
                {isConnected ? sendWidgetContent : notConnectedAlert}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Receive Crypto
                </h3>
                {isConnected ? receiveWidgetContent : notConnectedAlert}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vertical layout (original)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Actions
        </CardTitle>
        <CardDescription>Send and receive cryptocurrency</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {desktopTabTriggers}
          <TabsContent value="send" className="mt-0">
            {isConnected ? sendWidgetContent : notConnectedAlert}
          </TabsContent>
          <TabsContent value="receive" className="mt-0">
            {isConnected ? receiveWidgetContent : notConnectedAlert}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
});

WalletActionsPanel.displayName = 'WalletActionsPanel'; 