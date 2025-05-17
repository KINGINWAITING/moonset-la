
import React from "react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { Loader2, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const WalletConnectButton = () => {
  const { account, connecting, connected, connectWallet, disconnectWallet, chainId } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (id: number | null) => {
    if (!id) return 'Unknown Network';
    
    switch (id) {
      case 1: return 'Ethereum Mainnet';
      case 5: return 'Goerli Testnet';
      case 11155111: return 'Sepolia Testnet';
      default: return `Chain ID: ${id}`;
    }
  };

  return (
    <div className="mb-4 space-y-2">
      {!connected ? (
        <Button 
          onClick={connectWallet}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          disabled={connecting}
        >
          {connecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      ) : (
        <>
          <div className="flex items-center justify-between bg-[#232323] p-3 rounded-md">
            <div className="flex flex-col">
              <div className="font-medium">{formatAddress(account as string)}</div>
              <div className="text-xs text-gray-400">{getNetworkName(chainId)}</div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={disconnectWallet}
              className="ml-2 text-xs"
            >
              Disconnect
            </Button>
          </div>
          {chainId && chainId !== 1 && (
            <Alert variant="destructive" className="py-2">
              <AlertDescription>
                Please switch to Ethereum Mainnet for full functionality
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
};
