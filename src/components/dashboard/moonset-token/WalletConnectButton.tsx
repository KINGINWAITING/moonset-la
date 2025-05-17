
import React from "react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { Loader2, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTheme } from "@/context/ThemeContext";

export const WalletConnectButton = () => {
  const { account, connecting, connected, connectWallet, disconnectWallet, chainId } = useWeb3();
  const { theme } = useTheme();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!connected) {
    return (
      <Button 
        onClick={connectWallet}
        className={`rounded-full flex items-center gap-2 ${
          theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
        }`}
        disabled={connecting}
      >
        {connecting ? (
          <>
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-1 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      className={`rounded-full flex items-center gap-1 glass ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
      onClick={disconnectWallet}
    >
      <span>{formatAddress(account as string)}</span>
    </Button>
  );
};
