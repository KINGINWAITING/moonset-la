import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  ChevronDown, 
  Copy, 
  ExternalLink, 
  LogOut, 
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { 
  useAccount, 
  useDisconnect, 
  useChainId, 
  useSwitchChain, 
  useEnsName, 
  useEnsAvatar,
  useBalance
} from '@/context/WagmiProvider'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { WalletModal } from './WalletModal'
import { chainInfo, supportedChains } from '@/config/wagmi'
import { cn } from '@/lib/utils'

export function WalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { address, isConnected, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain, isPending: isSwitching } = useSwitchChain()
  const { toast } = useToast()

  // ENS data
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })

  // Balance data
  const { data: balance } = useBalance({ address })

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const openEtherscan = () => {
    if (address && chainId) {
      const baseUrl = chainId === 1 
        ? 'https://etherscan.io' 
        : chainId === 137 
        ? 'https://polygonscan.com'
        : chainId === 56
        ? 'https://bscscan.com'
        : chainId === 42161
        ? 'https://arbiscan.io'
        : chainId === 8453
        ? 'https://basescan.org'
        : 'https://etherscan.io'
      
      window.open(`${baseUrl}/address/${address}`, '_blank')
    }
  }

  const getCurrentChainInfo = () => {
    if (!chainId) return null
    return chainInfo[chainId as keyof typeof chainInfo]
  }

  const isUnsupportedNetwork = chainId && !supportedChains.some(chain => chain.id === chainId)

  // If not connected, show connect button
  if (!isConnected) {
    return (
      <>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
        <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    )
  }

  const currentChain = getCurrentChainInfo()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 min-w-0">
            {/* Avatar */}
            <Avatar className="h-6 w-6">
              <AvatarImage src={ensAvatar || undefined} />
              <AvatarFallback className="text-xs">
                {address ? address.slice(2, 4).toUpperCase() : '??'}
              </AvatarFallback>
            </Avatar>

            {/* Address/ENS */}
            <span className="font-mono text-sm truncate max-w-24">
              {ensName || (address ? formatAddress(address) : '')}
            </span>

            {/* Network Badge */}
            {currentChain && (
              <Badge 
                variant={isUnsupportedNetwork ? "destructive" : "secondary"}
                className="text-xs px-1.5 py-0.5"
              >
                {currentChain.icon} {currentChain.shortName}
              </Badge>
            )}

            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          {/* Account Info */}
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={ensAvatar || undefined} />
                <AvatarFallback>
                  {address ? address.slice(2, 4).toUpperCase() : '??'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">
                  {ensName || 'Wallet'}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {address ? formatAddress(address) : ''}
                </p>
              </div>
            </div>

            {/* Balance */}
            {balance && (
              <div className="text-sm">
                <span className="text-muted-foreground">Balance: </span>
                <span className="font-medium">
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </span>
              </div>
            )}

            {/* Connector Info */}
            {connector && (
              <div className="text-xs text-muted-foreground">
                Connected via {connector.name}
              </div>
            )}
          </div>

          <DropdownMenuSeparator />

          {/* Network Section */}
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2">Network</div>
            
            {isUnsupportedNetwork ? (
              <div className="flex items-center gap-2 p-2 rounded-md bg-destructive/10 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">Unsupported Network</span>
              </div>
            ) : currentChain ? (
              <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                <span className="text-sm">{currentChain.icon}</span>
                <span className="text-sm font-medium">{currentChain.name}</span>
                <CheckCircle className="h-3 w-3 text-green-500 ml-auto" />
              </div>
            ) : null}

            {/* Network Switching */}
            {(isUnsupportedNetwork || chainId !== 1) && (
              <div className="mt-2 space-y-1">
                {supportedChains.slice(0, 3).map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => switchChain({ chainId: chain.id })}
                    disabled={isSwitching}
                    className="w-full flex items-center gap-2 p-2 text-xs rounded-md hover:bg-muted/50 disabled:opacity-50"
                  >
                    {isSwitching ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <span>{chainInfo[chain.id].icon}</span>
                    )}
                    <span>Switch to {chainInfo[chain.id].name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <DropdownMenuSeparator />

          {/* Actions */}
          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </DropdownMenuItem>

          <DropdownMenuItem onClick={openEtherscan}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
} 