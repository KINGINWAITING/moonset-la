// Wallet Types for Multi-Wallet Connection System
export interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  installed: boolean;
  downloadUrl?: string;
  type: 'injected' | 'walletconnect' | 'coinbase' | 'custom';
}

export interface EIP6963ProviderInfo {
  rdns: string;
  uuid: string;
  name: string;
  icon: string;
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

export interface EIP1193Provider {
  isStatus?: boolean;
  host?: string;
  path?: string;
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isPhantom?: boolean;
  isTrust?: boolean;
  request: (request: { method: string; params?: Array<unknown> }) => Promise<unknown>;
  on?: (event: string, callback: (...args: any[]) => void) => void;
  removeListener?: (event: string, callback: (...args: any[]) => void) => void;
  providers?: EIP1193Provider[];
  selectedProvider?: EIP1193Provider;
  setSelectedProvider?: (provider: EIP1193Provider) => void;
}

export interface WalletConnectionState {
  connected: boolean;
  connecting: boolean;
  account: string | null;
  chainId: number | null;
  provider: EIP1193Provider | null;
  walletInfo: WalletInfo | null;
  error: string | null;
}

export interface WalletConnector {
  id: string;
  name: string;
  icon: string;
  connect: () => Promise<WalletConnectionState>;
  disconnect: () => Promise<void>;
  isAvailable: () => boolean;
  getProvider: () => EIP1193Provider | null;
}

// EIP-6963 Event Types
export type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo;
    provider: Readonly<EIP1193Provider>;
  };
};

// Wallet Detection Results
export interface DetectedWallet {
  info: WalletInfo;
  provider: EIP1193Provider;
  connector: WalletConnector;
}

// Connection Options
export interface ConnectionOptions {
  chainId?: number;
  rpcUrls?: Record<number, string[]>;
  autoConnect?: boolean;
}

// Wallet Events
export type WalletEventType = 
  | 'connect' 
  | 'disconnect' 
  | 'accountsChanged' 
  | 'chainChanged' 
  | 'error';

export interface WalletEvent {
  type: WalletEventType;
  data?: any;
  error?: Error;
}

// WalletConnect specific types
export interface WalletConnectOptions {
  projectId: string;
  chains: number[];
  showQrModal: boolean;
  qrModalOptions?: {
    themeMode?: 'light' | 'dark';
    themeVariables?: Record<string, string>;
  };
}

// Supported Wallets Configuration
export interface SupportedWallet {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: 'injected' | 'walletconnect' | 'coinbase' | 'custom';
  downloadUrl: string;
  deepLink?: string;
  checkInstalled: () => boolean;
  getProvider: () => EIP1193Provider | null;
} 