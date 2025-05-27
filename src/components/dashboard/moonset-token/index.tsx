// Professional Moonset Token View - Main Container Component

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import { RefreshCw, AlertTriangle, Loader2 } from 'lucide-react';
import { useAccount } from '@/context/WagmiProvider';
import { useTheme } from '@/context/ThemeContext';

// Import new IDO layout components
import { IDOLayout } from './layout/IDOLayout';
import { IDOHeader } from './layout/IDOHeader';
import { IDOSidebar } from './layout/IDOSidebar';
import { IDOActivitySidebar } from './layout/IDOActivitySidebar';

// Import new IDO feature components
import { IDOStepGuide } from './components/IDOStepGuide';
import { TokenInfoTable } from './components/TokenInfoTable';
import { IDOInfoSections } from './components/IDOInfoSections';

// Import dashboard footer
import { DashboardFooter } from '../DashboardFooter';

import { Button } from '@/design-system/components/base';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

/**
 * IDO State Management Context
 */
interface IDOState {
  currentStep: number;
  walletConnected: boolean;
  transactionHash?: string;
  transactionStatus?: 'pending' | 'confirming' | 'confirmed' | 'failed' | 'cancelled';
}

const IDOStateContext = React.createContext<{
  state: IDOState;
  setState: React.Dispatch<React.SetStateAction<IDOState>>;
} | null>(null);

/**
 * Error fallback component with IDO-specific styling
 */
function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'max-w-md w-full rounded-xl p-8 border text-center space-y-4',
          isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
        )}
      >
        <AlertTriangle className={`w-12 h-12 mx-auto ${isDark ? 'text-red-400' : 'text-red-500'}`} />
        
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            IDO Interface Error
          </h3>
          <p className={`text-sm mt-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {error.message || 'An unexpected error occurred while loading the MOONSET IDO interface.'}
          </p>
        </div>

        <Button 
          onClick={resetErrorBoundary}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reload IDO Interface
        </Button>
      </motion.div>
    </div>
  );
}

/**
 * Loading skeleton for the IDO interface
 */
function IDOLoadingSkeleton() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen">
      <IDOLayout
        header={
          <div className="px-6 py-4">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
                  <div className="space-y-2">
                    <div className={`h-6 w-32 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
                    <div className={`h-4 w-48 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
                  </div>
                </div>
                <div className={`h-10 w-32 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
              </div>
            </div>
          </div>
        }
        sidebar={
          <div className="p-6 space-y-4">
            <div className={`h-6 w-24 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-16 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
              </div>
            ))}
          </div>
        }
        rightPanel={
          <div className="p-6 space-y-4">
            <div className={`h-6 w-24 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
            <div className={`h-64 animate-pulse rounded ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
          </div>
        }
        footer={<DashboardFooter />}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <div>
                <h3 className="font-medium">Loading MOONSET IDO</h3>
                <p className="text-sm text-muted-foreground">
                  Preparing the IDO interface...
                </p>
              </div>
            </div>
          </div>
        </div>
      </IDOLayout>
    </div>
  );
}

/**
 * Main IDO Dashboard Content
 */
function IDODashboardContent() {
  const { isConnected } = useAccount();
  const [idoState, setIdoState] = useState<IDOState>({
    currentStep: 1,
    walletConnected: isConnected,
    transactionHash: undefined,
    transactionStatus: undefined
  });

  // Update wallet connection state when it changes
  React.useEffect(() => {
    setIdoState(prev => ({
      ...prev,
      walletConnected: isConnected
    }));
  }, [isConnected]);

  const handleStepChange = (step: number) => {
    setIdoState(prev => ({
      ...prev,
      currentStep: step
    }));
  };

  const handleTransactionUpdate = (hash: string, status: IDOState['transactionStatus']) => {
    setIdoState(prev => ({
      ...prev,
      transactionHash: hash,
      transactionStatus: status
    }));
  };

  return (
    <IDOStateContext.Provider value={{ state: idoState, setState: setIdoState }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <IDOLayout
          header={
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <IDOHeader />
            </motion.div>
          }
          sidebar={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <IDOSidebar 
                currentStep={idoState.currentStep}
                onStepClick={handleStepChange}
              />
            </motion.div>
          }
          rightPanel={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <IDOActivitySidebar />
            </motion.div>
          }
          footer={<DashboardFooter />}
        >
          {/* Main IDO Content */}
          <div className="space-y-8">
            {/* Step-by-Step IDO Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <IDOStepGuide
                onStepChange={handleStepChange}
                initialStep={idoState.currentStep}
              />
            </motion.div>

            {/* Token Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <TokenInfoTable />
            </motion.div>

            {/* IDO Information Sections (Timeline & FAQ) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <IDOInfoSections />
            </motion.div>
          </div>
        </IDOLayout>
      </motion.div>
    </IDOStateContext.Provider>
  );
}

/**
 * Hook to use IDO state context
 */
export const useIDOState = () => {
  const context = React.useContext(IDOStateContext);
  if (!context) {
    throw new Error('useIDOState must be used within IDOStateContext');
  }
  return context;
};

/**
 * Main exported component with error boundary and suspense
 */
export default function MoonsetTokenView() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<IDOLoadingSkeleton />}>
        <IDODashboardContent />
      </Suspense>
    </ErrorBoundary>
  );
} 