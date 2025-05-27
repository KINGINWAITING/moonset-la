import { createConfig, http } from 'wagmi'
import { mainnet, polygon, bsc, arbitrum, base } from 'wagmi/chains'
import { 
  injected, 
  metaMask, 
  walletConnect, 
  coinbaseWallet 
} from 'wagmi/connectors'

// WalletConnect Project ID - you'll need to get this from https://cloud.walletconnect.com/
// For development, we'll use a fallback that won't cause API errors
const projectId = process.env.VITE_WALLETCONNECT_PROJECT_ID || (() => {
  // Use a development-friendly project ID or disable WalletConnect in development
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Return a placeholder that won't make API calls
    return 'development-mode'
  }
  return 'demo-project-id'
})()

// Define the chains we want to support
export const supportedChains = [mainnet, polygon, bsc, arbitrum, base] as const

// Configure the connectors
export const connectors = [
  // MetaMask connector with improved configuration
  metaMask({
    dappMetadata: {
      name: 'Axis Mundi',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://axis-mundi.app',
    },
    // Disable SDK logging in development
    logging: {
      developerMode: false,
      sdk: false,
    },
  }),
  
  // Injected connector for other wallets (Trust Wallet, Phantom, etc.)
  injected({
    target: 'metaMask',
  }),
  
  // WalletConnect for mobile wallets (only in production or with valid project ID)
  ...(projectId !== 'development-mode' ? [walletConnect({
    projectId,
    metadata: {
      name: 'Axis Mundi',
      description: 'Advanced Portfolio Management Platform',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://axis-mundi.app',
      icons: [typeof window !== 'undefined' ? `${window.location.origin}/icon.png` : 'https://axis-mundi.app/icon.png'],
    },
    showQrModal: true,
  })] : []),
  
  // Coinbase Wallet
  coinbaseWallet({
    appName: 'Axis Mundi',
    appLogoUrl: typeof window !== 'undefined' ? `${window.location.origin}/icon.png` : 'https://axis-mundi.app/icon.png',
  }),
]

// Create the Wagmi config
export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: false,
})

// Export chain information for easy access
export const chainInfo = {
  [mainnet.id]: {
    name: 'Ethereum',
    shortName: 'ETH',
    color: '#627EEA',
    icon: '⟠',
  },
  [polygon.id]: {
    name: 'Polygon',
    shortName: 'MATIC',
    color: '#8247E5',
    icon: '⬟',
  },
  [bsc.id]: {
    name: 'BSC',
    shortName: 'BNB',
    color: '#F3BA2F',
    icon: '🔶',
  },
  [arbitrum.id]: {
    name: 'Arbitrum',
    shortName: 'ARB',
    color: '#28A0F0',
    icon: '🔵',
  },
  [base.id]: {
    name: 'Base',
    shortName: 'BASE',
    color: '#0052FF',
    icon: '🔷',
  },
} as const

export type SupportedChainId = typeof supportedChains[number]['id'] 