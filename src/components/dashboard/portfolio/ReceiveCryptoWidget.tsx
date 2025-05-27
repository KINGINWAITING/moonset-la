import React, { useState, memo, useMemo, useCallback } from 'react';
import { useAccount } from '@/context/WagmiProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Copy, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReceiveCryptoWidgetProps {
  onClose?: () => void;
}

export const ReceiveCryptoWidget = memo(({ onClose }: ReceiveCryptoWidgetProps) => {
  const { address: account, isConnected } = useAccount();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Memoize copy handler to prevent unnecessary re-renders
  const handleCopyAddress = useCallback(async () => {
    if (!account) return;
    
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  }, [account, toast]);

  // Memoize close handler
  const handleCloseClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Memoize QR code URL to prevent unnecessary re-computation
  const qrCodeUrl = useMemo(() => {
    if (!account) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${account}`;
  }, [account]);

  // Memoize not connected alert
  const notConnectedAlert = useMemo(() => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Please connect your wallet to view your receiving address.
      </AlertDescription>
    </Alert>
  ), []);

  // Memoize copy button content
  const copyButtonContent = useMemo(() => {
    if (copied) {
      return (
        <>
          <CheckCircle className="h-4 w-4" />
          Copied!
        </>
      );
    }
    return (
      <>
        <Copy className="h-4 w-4" />
        Copy
      </>
    );
  }, [copied]);

  // Memoize QR code section
  const qrCodeSection = useMemo(() => {
    if (!account) return null;
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg border">
          <img
            src={qrCodeUrl}
            alt="Wallet Address QR Code"
            className="w-48 h-48"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Scan this QR code to get your wallet address
        </p>
      </div>
    );
  }, [account, qrCodeUrl]);

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Receive Crypto
          </CardTitle>
          <CardDescription>Share this address to receive cryptocurrency</CardDescription>
        </CardHeader>
        <CardContent>
          {notConnectedAlert}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Receive Crypto
        </CardTitle>
        <CardDescription>Share this address to receive cryptocurrency</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wallet Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Your Wallet Address</Label>
          <div className="flex gap-2">
            <Input
              id="address"
              value={account || ''}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAddress}
              className={`flex items-center gap-2 transition-colors ${
                copied ? 'bg-green-50 border-green-200 text-green-700' : ''
              }`}
            >
              {copyButtonContent}
            </Button>
          </div>
        </div>

        {/* QR Code */}
        {qrCodeSection}

        {/* Important Notice */}
        <div className="space-y-2">
          <Label>Important Notice</Label>
          <Alert className="h-fit">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-semibold text-sm">Security Tips:</p>
                <ul className="text-xs space-y-1 ml-2 list-disc">
                  <li>Only send Ethereum and ERC-20 tokens</li>
                  <li>Always verify the address</li>
                  <li>Test with small amounts first</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Action Buttons */}
        {onClose && (
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={handleCloseClick}>
              Close
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

ReceiveCryptoWidget.displayName = 'ReceiveCryptoWidget'; 