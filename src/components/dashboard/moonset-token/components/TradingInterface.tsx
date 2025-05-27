// Enhanced Trading Interface Component

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  Wallet, 
  ArrowUpRight,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  Rocket,
  Star
} from 'lucide-react';
import { TradingInterfaceProps, TradingMode } from '../types/token.types';
import { WalletConnectButton } from '../WalletConnectButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTheme } from '@/context/ThemeContext';
import { tokenConfig } from '@/config/tokenConfig';
import clsx from 'clsx';

// Trading mode definitions for MOONSET
const TRADING_MODES: TradingMode[] = [
  {
    id: 'external',
    name: 'Uniswap Platform',
    description: 'Trade MOONSET on the official Uniswap platform',
    recommended: true,
    features: [
      'Official Uniswap interface',
      'Maximum security & trust',
      'Best liquidity access',
      'Advanced trading features',
      'Real-time MOONSET pricing'
    ],
    icon: ExternalLink
  },
  {
    id: 'embedded',
    name: 'Quick Swap',
    description: 'Fast MOONSET trading widget',
    recommended: false,
    features: [
      'Seamless experience',
      'No page redirects',
      'Quick MOONSET swaps',
      'Basic trading features'
    ],
    icon: Zap
  }
];

// Mode selection card component
const ModeSelectionCard = ({ 
  mode, 
  selected, 
  onSelect, 
  disabled = false 
}: { 
  mode: TradingMode; 
  selected: boolean; 
  onSelect: () => void;
  disabled?: boolean;
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const Icon = mode.icon;

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={clsx(
        'relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer',
        selected
          ? 'border-primary bg-primary/5'
          : isDark 
            ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
            : 'border-gray-200 hover:border-gray-300 bg-gray-50/50',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={!disabled ? onSelect : undefined}
    >
      {/* Recommended badge */}
      {mode.recommended && (
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1">
            <Star className="w-3 h-3 mr-1" />
            Recommended
          </Badge>
        </div>
      )}

      <div className="flex items-start space-x-3">
        <div className={clsx(
          'p-2 rounded-lg',
          selected 
            ? 'bg-primary text-white' 
            : isDark 
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-200 text-gray-600'
        )}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {mode.name}
            </h3>
            {selected && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {mode.description}
          </p>

          <ul className="space-y-1">
            {mode.features.map((feature, index) => (
              <li key={index} className={`text-xs flex items-center space-x-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// External trading component for MOONSET
const ExternalTradingView = ({ token, tokenAddress }: { token: any; tokenAddress: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleTradeClick = () => {
    // When token is not launched, show a message
    if (!tokenConfig.isLaunched) {
      alert("MOONSET token is not yet launched on Uniswap. Stay tuned for the official launch announcement!");
      return;
    }
    
    const uniswapUrl = `${tokenConfig.uniswapUrl}${tokenAddress}`;
    window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        'p-6 rounded-xl border',
        isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'
      )}
    >
      <div className="text-center space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className={clsx(
              'p-3 rounded-full',
              isDark ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50' : 'bg-gradient-to-br from-purple-100 to-blue-100'
            )}>
              <Rocket className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
          
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get MOONSET Tokens
          </h3>
          
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {tokenConfig.isLaunched 
              ? "Trade MOONSET on Uniswap - your gateway to the Axis Mundi ecosystem"
              : "Prepare to be among the first to get MOONSET tokens when we launch"
            }
          </p>
        </div>

        {/* Launch status indicator */}
        {!tokenConfig.isLaunched && (
          <div className={clsx(
            'p-3 rounded-lg border-2 border-dashed',
            isDark ? 'border-purple-800 bg-purple-900/20' : 'border-purple-300 bg-purple-50'
          )}>
            <Clock className={`w-5 h-5 mx-auto mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <p className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
              MOONSET Token Launch Coming Soon
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              Connect your wallet now to be ready for launch
            </p>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 text-left">
          {[
            { icon: Shield, text: tokenConfig.isLaunched ? 'Secure Trading' : 'Launch Ready' },
            { icon: Zap, text: tokenConfig.isLaunched ? 'Fast Swaps' : 'First Access' },
            { icon: TrendingUp, text: tokenConfig.isLaunched ? 'Best Prices' : 'Early Adopter' },
            { icon: Sparkles, text: tokenConfig.isLaunched ? 'Live Data' : 'Axis Mundi' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <feature.icon className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trade Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleTradeClick}
            className={clsx(
              "w-full font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200",
              tokenConfig.isLaunched
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
            )}
            disabled={!tokenConfig.isLaunched}
          >
            {tokenConfig.isLaunched ? (
              <>
                <ExternalLink className="w-5 h-5 mr-2" />
                Trade MOONSET
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 mr-2" />
                Launching Soon
              </>
            )}
          </Button>
        </motion.div>

        {/* Additional Info */}
        <div className={`text-xs space-y-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {tokenConfig.isLaunched ? (
            <>
              <p>• MOONSET token will be automatically pre-selected</p>
              <p>• Connect your wallet on Uniswap to start trading</p>
              <p>• Access to advanced trading features and analytics</p>
            </>
          ) : (
            <>
              <p>• Be among the first to get MOONSET tokens</p>
              <p>• Connect your wallet to prepare for launch</p>
              <p>• Join the Axis Mundi ecosystem early</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Embedded trading component (enhanced version of existing widget)
const EmbeddedTradingView = ({ tokenAddress }: { tokenAddress: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading the embedded widget
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!tokenConfig.isLaunched) {
        setError('MOONSET token is not yet launched. Embedded trading will be available after launch.');
      } else {
        setError('Embedded widget has compatibility issues with current build configuration');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={clsx(
        'p-6 rounded-xl border h-96 flex items-center justify-center',
        isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'
      )}>
        <div className="text-center space-y-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`w-8 h-8 border-2 border-t-transparent rounded-full ${isDark ? 'border-gray-600' : 'border-gray-400'}`}
          />
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading MOONSET trading interface...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(
        'p-6 rounded-xl border',
        isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'
      )}>
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            <div className="space-y-2">
              <p className="font-medium">Quick Swap Currently Unavailable</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm">
                We recommend using the Uniswap Platform for the best MOONSET trading experience.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // This would be where the actual embedded widget loads
  return (
    <div className={clsx(
      'p-6 rounded-xl border h-96',
      isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'
    )}>
      {/* Embedded widget would go here */}
      <div className="h-full flex items-center justify-center">
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          MOONSET embedded widget placeholder
        </p>
      </div>
    </div>
  );
};

export function TradingInterface({ 
  tokenAddress, 
  token, 
  walletState, 
  onModeChange 
}: TradingInterfaceProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedMode, setSelectedMode] = useState<TradingMode['id']>('external');
  const [showModeSelection, setShowModeSelection] = useState(!walletState.connected);

  // Show mode selection when wallet connects
  useEffect(() => {
    if (walletState.connected && showModeSelection) {
      // Auto-hide mode selection after a delay if external mode is selected
      if (selectedMode === 'external') {
        const timer = setTimeout(() => {
          setShowModeSelection(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [walletState.connected, selectedMode, showModeSelection]);

  const handleModeSelect = (modeId: TradingMode['id']) => {
    setSelectedMode(modeId);
    const mode = TRADING_MODES.find(m => m.id === modeId);
    if (mode && onModeChange) {
      onModeChange(mode);
    }
    
    // Hide selection after choosing
    setTimeout(() => setShowModeSelection(false), 500);
  };

  const selectedModeData = TRADING_MODES.find(m => m.id === selectedMode);

  return (
    <Card className={clsx(
      'transition-all duration-300',
      isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/50 border-gray-200'
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={`${isDark ? 'text-white' : 'text-gray-900'} flex items-center space-x-2`}>
              <Rocket className="w-5 h-5 text-primary" />
              <span>Get MOONSET</span>
              {!tokenConfig.isLaunched && (
                <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Coming Soon
                </Badge>
              )}
            </CardTitle>
            <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {tokenConfig.isLaunched 
                ? (selectedModeData ? selectedModeData.description : 'Choose your trading experience')
                : "Be ready to get MOONSET tokens when we launch"
              }
            </CardDescription>
          </div>
          
          {walletState.connected && !showModeSelection && tokenConfig.isLaunched && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowModeSelection(true)}
              className="text-xs"
            >
              Change Mode
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Wallet Connection */}
        <WalletConnectButton />

        {/* Network Warning */}
        {walletState.connected && walletState.chainId && walletState.chainId !== 1 && walletState.chainId !== 11155111 && (
          <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-700 dark:text-orange-300">
              For the best MOONSET trading experience, please switch to Ethereum Mainnet or Sepolia testnet.
              Current network ID: {walletState.chainId}
            </AlertDescription>
          </Alert>
        )}

        {/* Pre-launch preparation notice */}
        {walletState.connected && !tokenConfig.isLaunched && (
          <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
            <Rocket className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              <div className="space-y-1">
                <p className="font-medium">Wallet Connected - Ready for MOONSET Launch!</p>
                <p className="text-sm">
                  You're all set to be among the first to get MOONSET tokens. We'll update this page when the token goes live on Uniswap.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Mode Selection */}
        <AnimatePresence>
          {walletState.connected && showModeSelection && tokenConfig.isLaunched && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Choose Your MOONSET Trading Experience:
              </div>
              
              <div className="grid gap-3">
                {TRADING_MODES.map((mode) => (
                  <ModeSelectionCard
                    key={mode.id}
                    mode={mode}
                    selected={selectedMode === mode.id}
                    onSelect={() => handleModeSelect(mode.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trading Interface */}
        {walletState.connected && !showModeSelection && (
          <AnimatePresence mode="wait">
            {selectedMode === 'external' ? (
              <ExternalTradingView 
                key="external"
                token={token}
                tokenAddress={tokenAddress}
              />
            ) : (
              <EmbeddedTradingView 
                key="embedded"
                tokenAddress={tokenAddress}
              />
            )}
          </AnimatePresence>
        )}

        {/* Not Connected State */}
        {!walletState.connected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx(
              'p-8 rounded-xl border-2 border-dashed text-center space-y-3',
              isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            )}
          >
            <Wallet className={`w-12 h-12 mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Connect Your Wallet
              </h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Connect your wallet to {tokenConfig.isLaunched ? 'start trading MOONSET tokens' : 'prepare for MOONSET launch'}
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 