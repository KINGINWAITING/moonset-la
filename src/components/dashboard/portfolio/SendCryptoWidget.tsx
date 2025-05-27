import React, { useState, memo, useMemo, useCallback } from 'react';
import { parseEther, isAddress } from 'viem';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from '@/context/WagmiProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/format-utils';

interface SendCryptoWidgetProps {
  onClose?: () => void;
}

export const SendCryptoWidget = memo(({ onClose }: SendCryptoWidgetProps) => {
  const { address: account, isConnected } = useAccount();
  const { sendTransaction, data: hash, isPending, error: sendError } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [error, setError] = useState<string | null>(null);

  // Memoize available tokens to prevent unnecessary re-renders
  const availableTokens = useMemo(() => [
    { symbol: 'ETH', name: 'Ethereum', decimals: 18 }
  ], []);

  // Memoize validation function
  const validateAddress = useCallback((address: string) => {
    return isAddress(address);
  }, []);

  // Memoize form validation
  const formValidation = useMemo(() => {
    const errors: string[] = [];
    
    if (!isConnected || !account) {
      errors.push('Please connect your wallet first');
    }
    
    if (!recipient || !amount) {
      errors.push('Please fill in all fields');
    }
    
    if (recipient && !validateAddress(recipient)) {
      errors.push('Invalid recipient address');
    }
    
    if (amount && parseFloat(amount) <= 0) {
      errors.push('Amount must be greater than 0');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }, [isConnected, account, recipient, amount, validateAddress]);

  // Memoize button state
  const buttonState = useMemo(() => {
    const isDisabled = isPending || isConfirming || !formValidation.isValid;
    const buttonText = isPending ? 'Sending...' : isConfirming ? 'Confirming...' : `Send ${selectedToken}`;
    const showLoader = isPending || isConfirming;
    
    return { isDisabled, buttonText, showLoader };
  }, [isPending, isConfirming, formValidation.isValid, selectedToken]);

  // Optimized send handler with useCallback
  const handleSend = useCallback(async () => {
    if (!formValidation.isValid) {
      setError(formValidation.errors[0]);
      return;
    }

    setError(null);

    try {
      // For ETH transactions
      if (selectedToken === 'ETH') {
        sendTransaction({
          to: recipient as `0x${string}`,
          value: parseEther(amount)
        });
        
        // Reset form on successful send
        setRecipient('');
        setAmount('');
      }
    } catch (err: any) {
      console.error('Transaction failed:', err);
      setError(err.message || 'Transaction failed');
    }
  }, [formValidation, selectedToken, recipient, amount, sendTransaction]);

  // Memoize input handlers to prevent unnecessary re-renders
  const handleRecipientChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
    if (error) setError(null); // Clear error when user starts typing
  }, [error]);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    if (error) setError(null); // Clear error when user starts typing
  }, [error]);

  const handleTokenChange = useCallback((value: string) => {
    setSelectedToken(value);
  }, []);

  const handleCloseClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Memoize not connected alert
  const notConnectedAlert = useMemo(() => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Please connect your wallet to send cryptocurrency.
      </AlertDescription>
    </Alert>
  ), []);

  // Memoize error alert
  const errorAlert = useMemo(() => {
    if (!error && !sendError) return null;
    
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error || sendError?.message}</AlertDescription>
      </Alert>
    );
  }, [error, sendError]);

  // Memoize success alert
  const successAlert = useMemo(() => {
    if (!hash) return null;
    
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-700 dark:text-green-300">
          {isConfirming ? 'Confirming transaction...' : isSuccess ? 'Transaction confirmed!' : 'Transaction sent!'}
          <div className="mt-2">
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View on Etherscan
            </a>
          </div>
        </AlertDescription>
      </Alert>
    );
  }, [hash, isConfirming, isSuccess]);

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Crypto
          </CardTitle>
          <CardDescription>Send cryptocurrency from your wallet</CardDescription>
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
          <Send className="h-5 w-5" />
          Send Crypto
        </CardTitle>
        <CardDescription>Send cryptocurrency from your wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token Selection and Amount - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="token">Token</Label>
            <Select value={selectedToken} onValueChange={handleTokenChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {availableTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol} - {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({selectedToken})</Label>
            <Input
              id="amount"
              type="number"
              step="0.000001"
              placeholder="0.0"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
        </div>

        {/* Recipient Address - Full Width */}
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={handleRecipientChange}
            className="font-mono text-sm"
          />
        </div>

        {/* Error Display */}
        {errorAlert}

        {/* Success Display */}
        {successAlert}

        {/* Action Buttons - Horizontal Layout */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleSend}
            disabled={buttonState.isDisabled}
            className="flex-1"
          >
            {buttonState.showLoader ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {buttonState.buttonText}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {buttonState.buttonText}
              </>
            )}
          </Button>
          {onClose && (
            <Button variant="outline" onClick={handleCloseClick} className="flex-shrink-0">
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

SendCryptoWidget.displayName = 'SendCryptoWidget'; 