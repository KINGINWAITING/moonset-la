import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  Copy, 
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Wallet,
  Receipt,
  Info,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/design-system/components/base';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/**
 * Transaction status types
 */
type TransactionStatus = 
  | 'pending'
  | 'confirming'
  | 'confirmed'
  | 'failed'
  | 'cancelled';

/**
 * Transaction step interface
 */
interface TransactionStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  estimatedTime?: string;
}

/**
 * Transaction details interface
 */
interface TransactionDetails {
  hash?: string;
  blockNumber?: number;
  gasUsed?: string;
  gasPrice?: string;
  fromAddress?: string;
  toAddress?: string;
  value?: string;
  tokenAmount?: string;
  timestamp?: number;
}

interface TransactionTrackerProps {
  transactionHash?: string;
  status?: TransactionStatus;
  details?: TransactionDetails;
  onRetry?: () => void;
  onViewOnExplorer?: (hash: string) => void;
  onContinue?: () => void;
  className?: string;
}

/**
 * Mock transaction steps for demonstration
 */
const getTransactionSteps = (status: TransactionStatus): TransactionStep[] => {
  const baseSteps: TransactionStep[] = [
    {
      id: 'initiate',
      title: 'Transaction Initiated',
      description: 'Your swap transaction has been submitted to the network',
      status: 'completed',
      estimatedTime: '~1 min'
    },
    {
      id: 'pending',
      title: 'Pending Confirmation',
      description: 'Waiting for network confirmation',
      status: status === 'pending' ? 'active' : status === 'failed' || status === 'cancelled' ? 'failed' : 'completed',
      estimatedTime: '~2-5 min'
    },
    {
      id: 'confirming',
      title: 'Confirming Transaction',
      description: 'Transaction is being confirmed by the network',
      status: status === 'confirming' ? 'active' : status === 'confirmed' ? 'completed' : status === 'failed' || status === 'cancelled' ? 'failed' : 'pending',
      estimatedTime: '~1-3 min'
    },
    {
      id: 'completed',
      title: 'Transaction Completed',
      description: 'Your MOONSET tokens have been successfully received',
      status: status === 'confirmed' ? 'completed' : status === 'failed' || status === 'cancelled' ? 'failed' : 'pending',
      estimatedTime: 'Complete'
    }
  ];

  return baseSteps;
};

export const TransactionTracker = ({
  transactionHash = '0x1234567890abcdef1234567890abcdef12345678',
  status = 'pending',
  details = {
    fromAddress: '0x742d35Cc6634C0532925a3b8D4C9db96',
    toAddress: '0x1234567890123456789012345678901234567890',
    value: '1.0 ETH',
    tokenAmount: '222,222 MOONSET',
    gasUsed: '21,000',
    gasPrice: '20 gwei',
    timestamp: Date.now()
  },
  onRetry,
  onViewOnExplorer,
  onContinue,
  className = ""
}: TransactionTrackerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const steps = getTransactionSteps(status);

  // Simulate progress updates
  useEffect(() => {
    if (status === 'pending' || status === 'confirming') {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Update progress based on status
        if (status === 'pending') {
          setProgress(prev => Math.min(prev + 2, 40));
        } else if (status === 'confirming') {
          setProgress(prev => Math.min(prev + 3, 80));
        }
      }, 1000);

      return () => clearInterval(interval);
    } else if (status === 'confirmed') {
      setProgress(100);
    } else if (status === 'failed' || status === 'cancelled') {
      setProgress(0);
    }
  }, [status]);

  // Update current step based on status
  useEffect(() => {
    switch (status) {
      case 'pending':
        setCurrentStep(1);
        break;
      case 'confirming':
        setCurrentStep(2);
        break;
      case 'confirmed':
        setCurrentStep(3);
        break;
      case 'failed':
      case 'cancelled':
        setCurrentStep(1);
        break;
      default:
        setCurrentStep(0);
    }
  }, [status]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openEtherscan = (hash: string) => {
    onViewOnExplorer?.(hash) || window.open(`https://etherscan.io/tx/${hash}`, '_blank');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'failed':
      case 'cancelled':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Loader2 className="h-8 w-8 text-primary animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600';
      case 'failed':
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-primary';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'pending':
        return 'Transaction submitted and waiting for confirmation...';
      case 'confirming':
        return 'Transaction is being confirmed by the network...';
      case 'confirmed':
        return 'Transaction completed successfully!';
      case 'failed':
        return 'Transaction failed. Please try again.';
      case 'cancelled':
        return 'Transaction was cancelled.';
      default:
        return 'Processing transaction...';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon()}
              <div>
                <CardTitle className={cn("text-xl", getStatusColor())}>
                  {status === 'confirmed' ? 'Transaction Successful' : 
                   status === 'failed' || status === 'cancelled' ? 'Transaction Failed' : 
                   'Transaction in Progress'}
                </CardTitle>
                <CardDescription className="mt-1">
                  {getStatusMessage()}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={status === 'confirmed' ? 'default' : status === 'failed' || status === 'cancelled' ? 'destructive' : 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              {(status === 'pending' || status === 'confirming') && (
                <p className="text-sm text-muted-foreground mt-1">
                  Time elapsed: {formatTime(timeElapsed)}
                </p>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {(status === 'pending' || status === 'confirming') && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Transaction Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transaction Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border transition-all",
                  step.status === 'active' && "border-primary bg-primary/5",
                  step.status === 'completed' && "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20",
                  step.status === 'failed' && "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
                )}
              >
                {/* Step Icon */}
                <div className="flex-shrink-0 mt-1">
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : step.status === 'active' ? (
                    <Clock className="h-5 w-5 text-primary" />
                  ) : step.status === 'failed' ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{step.title}</h4>
                    {step.estimatedTime && (
                      <span className="text-sm text-muted-foreground">{step.estimatedTime}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Transaction Hash */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Transaction Hash</p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="flex-1 text-sm font-mono">{transactionHash}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transactionHash)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEtherscan(transactionHash)}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Transaction Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-mono text-sm">{formatAddress(details.fromAddress || '')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-mono text-sm">{formatAddress(details.toAddress || '')}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="font-semibold">{details.value}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tokens Received</p>
                  <p className="font-semibold text-green-600">{details.tokenAmount}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Gas Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Gas Used</p>
                <p className="text-sm">{details.gasUsed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gas Price</p>
                <p className="text-sm">{details.gasPrice}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        {status === 'confirmed' && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              <div className="space-y-2">
                <p className="font-medium">Congratulations! Your MOONSET tokens have been successfully acquired.</p>
                <p className="text-sm">
                  You can now view your tokens in your wallet or start participating in governance and staking.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {(status === 'failed' || status === 'cancelled') && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">
                  {status === 'failed' ? 'Transaction failed' : 'Transaction was cancelled'}
                </p>
                <p className="text-sm">
                  {status === 'failed' 
                    ? 'This could be due to insufficient gas, network congestion, or slippage. Please try again.'
                    : 'You cancelled the transaction. You can try again when ready.'
                  }
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {(status === 'failed' || status === 'cancelled') && onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => openEtherscan(transactionHash)}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View on Etherscan
          </Button>

          {status === 'confirmed' && onContinue && (
            <Button onClick={onContinue} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Next Steps */}
        {status === 'confirmed' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Wallet className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">View Your Tokens</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your wallet to see your new MOONSET tokens
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Start Staking</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn rewards by staking your MOONSET tokens
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Receipt className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Participate in Governance</h4>
                    <p className="text-sm text-muted-foreground">
                      Use your tokens to vote on platform decisions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}; 