import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Info, 
  ShoppingCart, 
  Receipt, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  ExternalLink,
  Copy
} from 'lucide-react';
import { Button } from '@/design-system/components/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAccount, useConnect } from '@/context/WagmiProvider';
import { cn } from '@/lib/utils';
import { UniswapIntegration } from './UniswapIntegration';
import { TransactionTracker } from './TransactionTracker';

interface IDOStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface IDOStepGuideProps {
  onStepChange?: (step: number) => void;
  initialStep?: number;
}

export const IDOStepGuide = ({ onStepChange, initialStep = 1 }: IDOStepGuideProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});
  
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  // Update parent component when step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // Auto-complete wallet step when connected
  useEffect(() => {
    if (isConnected && !completedSteps.includes(1)) {
      setCompletedSteps(prev => [...prev, 1]);
      setErrors(prev => ({ ...prev, 1: '' }));
    }
  }, [isConnected, completedSteps]);

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
    setErrors(prev => ({ ...prev, [stepId]: '' }));
  };

  const handleStepError = (stepId: number, error: string) => {
    setErrors(prev => ({ ...prev, [stepId]: error }));
  };

  const canProceedToStep = (stepId: number) => {
    // Step 1 can always be accessed
    if (stepId === 1) return true;
    // Other steps require previous steps to be completed
    return completedSteps.includes(stepId - 1);
  };

  const goToStep = (stepId: number) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step 1: Wallet Connection
  const WalletConnectionStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Wallet className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground">
          Connect your Web3 wallet to participate in the MOONSET IDO
        </p>
      </div>

      {!isConnected ? (
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              You'll need a Web3 wallet like MetaMask, WalletConnect, or Coinbase Wallet to participate.
            </AlertDescription>
          </Alert>

          <div className="grid gap-3">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                variant="outline"
                className="justify-start h-12"
                onClick={() => connect({ connector })}
              >
                <Wallet className="h-4 w-4 mr-3" />
                Connect with {connector.name}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              Wallet connected successfully! Address: {address?.slice(0, 6)}...{address?.slice(-4)}
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Connected Wallet</p>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(address || '')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Step 2: Token Information
  const TokenInformationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Info className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">MOONSET Token Information</h3>
        <p className="text-muted-foreground">
          Review the token details before making your purchase
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Token Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Token Name</p>
                <p className="font-medium">MOONSET</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Symbol</p>
                <p className="font-medium">MOONSET</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="font-medium">$0.0045</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Supply</p>
                <p className="font-medium">1,000,000,000</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">IDO Progress</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Progress value={67} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                $6.7M raised of $10M target
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium">Investment Risk</p>
                <p className="text-sm text-muted-foreground">
                  Cryptocurrency investments carry high risk. Only invest what you can afford to lose.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Token Utility</p>
                <p className="text-sm text-muted-foreground">
                  MOONSET tokens provide governance rights and access to platform features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => handleStepComplete(2)}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Read Full Whitepaper
          </Button>
        </div>
      </div>
    </div>
  );

  // Step 3: Purchase Interface
  const PurchaseInterfaceStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Purchase MOONSET Tokens</h3>
        <p className="text-muted-foreground">
          Use the Uniswap widget below to swap ETH for MOONSET tokens
        </p>
      </div>

      {/* Uniswap Integration */}
      <UniswapIntegration
        onSwapStart={() => {
          console.log('Swap started');
        }}
        onSwapSuccess={(txHash) => {
          console.log('Swap successful:', txHash);
          handleStepComplete(3);
        }}
        onSwapError={(error) => {
          console.error('Swap error:', error);
          handleStepError(3, error);
        }}
      />
    </div>
  );

  // Step 4: Transaction Confirmation
  const TransactionConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Receipt className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Transaction Status</h3>
        <p className="text-muted-foreground">
          Track your transaction progress and view details
        </p>
      </div>

      {/* Transaction Tracker */}
      <TransactionTracker
        status="confirmed" // This would be dynamic based on actual transaction state
        onRetry={() => {
          console.log('Retrying transaction');
          // Reset to step 3 to retry
          setCurrentStep(3);
        }}
        onContinue={() => {
          console.log('Transaction completed, continuing...');
          handleStepComplete(4);
        }}
        onViewOnExplorer={(hash) => {
          console.log('Opening Etherscan for:', hash);
          window.open(`https://etherscan.io/tx/${hash}`, '_blank');
        }}
      />
    </div>
  );

  const steps: IDOStep[] = [
    {
      id: 1,
      title: 'Connect Wallet',
      description: 'Connect your Web3 wallet',
      icon: <Wallet className="h-5 w-5" />,
      component: <WalletConnectionStep />
    },
    {
      id: 2,
      title: 'Token Information',
      description: 'Review MOONSET details',
      icon: <Info className="h-5 w-5" />,
      component: <TokenInformationStep />
    },
    {
      id: 3,
      title: 'Purchase Tokens',
      description: 'Buy MOONSET via Uniswap',
      icon: <ShoppingCart className="h-5 w-5" />,
      component: <PurchaseInterfaceStep />
    },
    {
      id: 4,
      title: 'Confirmation',
      description: 'Confirm your transaction',
      icon: <Receipt className="h-5 w-5" />,
      component: <TransactionConfirmationStep />
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>IDO Participation Guide</CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}: {currentStepData?.title}
              </CardDescription>
            </div>
            <Badge variant="outline">
              {Math.round((completedSteps.length / steps.length) * 100)}% Complete
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress 
              value={(completedSteps.length / steps.length) * 100} 
              className="h-2"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Step Navigation */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => goToStep(step.id)}
            disabled={!canProceedToStep(step.id)}
            className={cn(
              "p-3 rounded-lg border text-left transition-all",
              currentStep === step.id && "border-primary bg-primary/10",
              completedSteps.includes(step.id) && "border-green-500 bg-green-50 dark:bg-green-950",
              !canProceedToStep(step.id) && "opacity-50 cursor-not-allowed",
              canProceedToStep(step.id) && currentStep !== step.id && "hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                step.icon
              )}
              <span className="font-medium text-sm">{step.title}</span>
            </div>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStepData?.component}
            </motion.div>
          </AnimatePresence>

          {/* Error Display */}
          {errors[currentStep] && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors[currentStep]}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length || !canProceedToStep(currentStep + 1)}
          className="gap-2"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 