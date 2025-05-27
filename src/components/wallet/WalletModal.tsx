import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wallet, Smartphone, Globe, AlertCircle, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { useConnect, useConnectors } from '@/context/WagmiProvider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogOverlay } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

// Wallet metadata for better UX
const walletMetadata = {
  'io.metamask': {
    name: 'MetaMask',
    description: 'Connect using browser extension',
    icon: '🦊',
    color: '#F6851B',
    type: 'browser' as const,
  },
  'com.coinbase.wallet': {
    name: 'Coinbase Wallet',
    description: 'Connect using Coinbase Wallet',
    icon: '🔵',
    color: '#0052FF',
    type: 'browser' as const,
  },
  'walletConnect': {
    name: 'WalletConnect',
    description: 'Scan with mobile wallet',
    icon: '📱',
    color: '#3B99FC',
    type: 'mobile' as const,
  },
  'injected': {
    name: 'Browser Wallet',
    description: 'Connect using injected wallet',
    icon: '🌐',
    color: '#6B7280',
    type: 'browser' as const,
  },
} as const

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)
  const [hideModalContent, setHideModalContent] = useState(false)
  const { connect, error, isPending, isSuccess } = useConnect()
  const connectors = useConnectors()
  const { toast } = useToast()

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setConnectingWallet(null)
      setHideModalContent(false)
    }
  }, [isOpen])

  // Handle successful connection
  useEffect(() => {
    if (isSuccess && connectingWallet) {
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      })
      onClose()
      setConnectingWallet(null)
      setHideModalContent(false)
    }
  }, [isSuccess, connectingWallet, toast, onClose])

  // Handle connection errors
  useEffect(() => {
    if (error && connectingWallet) {
      setHideModalContent(false)
      setConnectingWallet(null)
    }
  }, [error, connectingWallet])

  const handleConnect = async (connector: any) => {
    try {
      setConnectingWallet(connector.id)
      console.log('Attempting to connect with:', connector.name, connector.id)
      
      // For WalletConnect and browser wallets, hide modal content immediately
      if (connector.id === 'walletConnect' || connector.id === 'io.metamask' || connector.id === 'com.coinbase.wallet') {
        setHideModalContent(true)
      }
      
      // Open wallet provider in new tab for better UX
      openWalletProvider(connector)
      
      // Add a small delay before initiating the connection
      await new Promise(resolve => setTimeout(resolve, 500))
      
      await connect({ connector })
      
      // Success will be handled by the useEffect above
    } catch (err: any) {
      console.error('Failed to connect wallet:', err)
      setConnectingWallet(null)
      setHideModalContent(false)
      
      toast({
        title: "Connection Failed",
        description: err?.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getWalletInfo = (connector: any) => {
    const metadata = walletMetadata[connector.id as keyof typeof walletMetadata] || {
      name: connector.name,
      description: 'Connect using this wallet',
      icon: '🔗',
      color: '#6B7280',
      type: 'browser' as const,
    }
    return metadata
  }

  // Helper function to open wallet provider in new tab
  const openWalletProvider = (connector: any) => {
    const walletInfo = getWalletInfo(connector)
    
    try {
      switch (connector.id) {
        case 'io.metamask':
          // Try to trigger MetaMask directly, fallback to extension page
          if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            // MetaMask is installed, the connection will happen in the current tab
            console.log('MetaMask detected, connection will happen in current tab')
          } else {
            // MetaMask not installed, open download page
            window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer')
          }
          break
          
        case 'com.coinbase.wallet':
          // For Coinbase Wallet, try to open the wallet app if on mobile
          if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Mobile device - try to open the app
            window.open('https://go.cb-w.com/dapp?cb_url=' + encodeURIComponent(window.location.href), '_blank')
          } else {
            // Desktop - open extension page
            window.open('https://www.coinbase.com/wallet', '_blank', 'noopener,noreferrer')
          }
          break
          
        case 'walletConnect':
          // For WalletConnect, the QR modal will handle the connection
          // On mobile, try to open a popular wallet app
          if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Try to open MetaMask mobile app as a fallback
            setTimeout(() => {
              window.open('https://metamask.app.link/dapp/' + encodeURIComponent(window.location.href), '_blank')
            }, 1000) // Delay to allow QR code to show first
          }
          console.log('WalletConnect: QR code will be displayed for mobile wallet scanning')
          break
          
        case 'injected':
          // For generic injected wallets, check if any wallet is available
          if (typeof window.ethereum !== 'undefined') {
            console.log('Injected wallet detected, connection will happen in current tab')
          } else {
            // No wallet detected, open wallet guide
            window.open('https://ethereum.org/en/wallets/', '_blank', 'noopener,noreferrer')
          }
          break
          
        default:
          // For unknown connectors, log for debugging
          console.log(`Attempting to connect with: ${connector.name} (${connector.id})`)
          break
      }
    } catch (error) {
      console.error('Failed to open wallet provider:', error)
    }
  }

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        // Prevent closing modal while wallet is connecting
        if (!open && connectingWallet && !hideModalContent) {
          return;
        }
        onClose();
      }}
      className={cn(
        "wallet-modal-portal",
        hideModalContent && "pointer-events-none"
      )}
    >
      {/* Custom overlay with lower z-index when wallet is connecting */}
      <DialogOverlay 
        className={cn(
          "fixed inset-0 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          hideModalContent ? "opacity-0" : "z-50"
        )}
      />
      
      <DialogContent 
        className={cn(
          "fixed left-[50%] top-[50%] grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          hideModalContent ? "opacity-0" : "z-50"
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            {hideModalContent 
              ? "Please check your wallet or any new tabs for the connection request..."
              : "Choose your preferred wallet to connect to the application."
            }
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence>
          {!hideModalContent && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error.message || 'Failed to connect wallet. Please try again.'}
                  </AlertDescription>
                </Alert>
              )}

              {/* Wallet Options */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Choose how you'd like to connect:
                </p>
                
                <div className="grid gap-2">
                  {connectors.map((connector) => {
                    const walletInfo = getWalletInfo(connector)
                    const isConnecting = connectingWallet === connector.id
                    const isReady = connector.ready !== false // Some connectors don't have ready property

                    return (
                      <motion.div
                        key={connector.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start h-auto p-4 text-left transition-all duration-200",
                            "hover:bg-muted/50 hover:border-primary/50",
                            !isReady && "opacity-50 cursor-not-allowed",
                            isConnecting && "border-primary bg-primary/5",
                            "focus:ring-2 focus:ring-primary/20"
                          )}
                          onClick={() => {
                            console.log('Wallet button clicked:', connector.name, { isReady, isConnecting, isPending })
                            if (isReady && !isConnecting && !isPending) {
                              handleConnect(connector)
                            }
                          }}
                          disabled={!isReady || isConnecting || isPending}
                        >
                          <div className="flex items-center gap-3 w-full">
                            {/* Wallet Icon */}
                            <div 
                              className="flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors"
                              style={{ backgroundColor: `${walletInfo.color}20` }}
                            >
                              {isConnecting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <span>{walletInfo.icon}</span>
                              )}
                            </div>

                            {/* Wallet Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{walletInfo.name}</p>
                                {walletInfo.type === 'mobile' && (
                                  <Smartphone className="h-3 w-3 text-muted-foreground" />
                                )}
                                {walletInfo.type === 'browser' && (
                                  <Globe className="h-3 w-3 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                {isConnecting ? 'Connecting...' : walletInfo.description}
                                {!isConnecting && (connector.id === 'io.metamask' || connector.id === 'com.coinbase.wallet') && (
                                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                                )}
                              </p>
                              {!isReady && (
                                <p className="text-xs text-yellow-600">
                                  Wallet not detected
                                </p>
                              )}
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center">
                              {isConnecting ? (
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              ) : isReady ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Help Text */}
              <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
                <p className="font-medium">Connection Tips:</p>
                <p>• Make sure your wallet is installed and unlocked</p>
                <p>• For mobile wallets, use WalletConnect to scan QR code</p>
                <p>• Wallet connection may open in a new tab or window</p>
                <p>• If a wallet shows "not detected", please install it first</p>
                <p>• Allow pop-ups for the best connection experience</p>
              </div>

              {/* Debug Info (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                  <p>Debug: {connectors.length} connectors available</p>
                  <p>Connecting: {connectingWallet || 'none'}</p>
                  <p>Pending: {isPending ? 'yes' : 'no'}</p>
                  <p>Hidden: {hideModalContent ? 'yes' : 'no'}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show connecting state when modal content is hidden */}
        {hideModalContent && (
          <motion.div 
            className="flex flex-col items-center justify-center py-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <p className="font-medium">Connecting to wallet...</p>
              <p className="text-sm text-muted-foreground">
                Please check your wallet or any new tabs for the connection request
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setHideModalContent(false)
                setConnectingWallet(null)
              }}
              className="mt-4"
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
} 