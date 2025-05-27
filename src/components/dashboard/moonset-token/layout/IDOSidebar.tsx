import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Wallet, Info, ShoppingCart, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IDOStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  icon: React.ReactNode;
}

interface IDOSidebarProps {
  currentStep?: number;
  onStepClick?: (stepId: number) => void;
}

export const IDOSidebar = ({ currentStep = 1, onStepClick }: IDOSidebarProps) => {
  const steps: IDOStep[] = [
    {
      id: 1,
      title: 'Connect Wallet',
      description: 'Connect your Web3 wallet',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
      icon: <Wallet className="h-4 w-4" />
    },
    {
      id: 2,
      title: 'Token Information',
      description: 'Review MOONSET details',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
      icon: <Info className="h-4 w-4" />
    },
    {
      id: 3,
      title: 'Purchase Tokens',
      description: 'Buy MOONSET via Uniswap',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending',
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      id: 4,
      title: 'Confirmation',
      description: 'Transaction complete',
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending',
      icon: <Receipt className="h-4 w-4" />
    }
  ];

  const getStepIcon = (step: IDOStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">IDO Progress</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Step {currentStep} of {steps.length}</span>
          <div className="flex-1 bg-muted rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-4">Steps</h4>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer",
                step.status === 'current' && "bg-primary/10 border border-primary/20",
                step.status === 'completed' && "bg-green-50 dark:bg-green-950/20",
                step.status === 'pending' && "hover:bg-muted/50",
                onStepClick && "cursor-pointer"
              )}
              onClick={() => onStepClick?.(step.id)}
            >
              {/* Step Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getStepIcon(step)}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {step.icon}
                  <h5 className={cn(
                    "font-medium text-sm",
                    step.status === 'current' && "text-primary",
                    step.status === 'completed' && "text-green-600 dark:text-green-400",
                    step.status === 'pending' && "text-muted-foreground"
                  )}>
                    {step.title}
                  </h5>
                </div>
                <p className={cn(
                  "text-xs mt-1",
                  step.status === 'current' && "text-primary/80",
                  step.status === 'completed' && "text-green-600/80 dark:text-green-400/80",
                  step.status === 'pending' && "text-muted-foreground"
                )}>
                  {step.description}
                </p>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[22px] mt-8 w-px h-6 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors">
            View Whitepaper
          </button>
          <button className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors">
            Check Token Contract
          </button>
          <button className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
}; 