
import React from "react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { Loader2, Wallet } from "lucide-react";

export const WalletConnectButton = () => {
  const { account, connecting, connected, connectWallet, disconnectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="mb-4">
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
        <div className="flex items-center justify-between bg-[#232323] p-3 rounded-md">
          <div className="font-medium">{formatAddress(account as string)}</div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={disconnectWallet}
            className="ml-2 text-xs"
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};
