import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CryptoPortfolio } from "@/types/supabase";
import { formatCurrency } from "@/lib/format-utils";
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface TransactionsListProps {
  recentTransactions: CryptoPortfolio[];
  connected: boolean;
}

export const TransactionsList = ({ recentTransactions, connected }: TransactionsListProps) => {
  const transactionTypes = ["buy", "sell", "transfer"] as const;
  const statuses = [
    { label: "Success", color: "success", icon: CheckCircle },
    { label: "Pending", color: "warning", icon: Clock },
    { label: "Failed", color: "destructive", icon: XCircle }
  ] as const;

  if (!connected) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Wallet className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground mb-6">
          Connect your wallet to view your transaction history and portfolio activity
        </p>
      </div>
    );
  }

  if (recentTransactions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Clock className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
        <p className="text-muted-foreground mb-6">
          Your transaction history will appear here once you start trading
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border bg-muted/30">
        <div className="col-span-4">Transaction</div>
        <div className="col-span-2 hidden md:block">Type</div>
        <div className="col-span-3 text-right">Amount</div>
        <div className="col-span-2 text-right">Date</div>
        <div className="col-span-1 text-right">Status</div>
      </div>

      {/* Transaction Rows */}
      <div className="divide-y divide-border">
        {recentTransactions.map((transaction, index) => {
          const statusIndex = index % 3;
          const status = statuses[statusIndex];
          const transactionType = transactionTypes[index % 3];
          const StatusIcon = status.icon;
          
          const date = new Date(Date.now() - index * 24 * 60 * 60 * 1000);
          const amount = Number(transaction.amount) || 0;
          const price = Number(transaction.purchase_price) || 0;
          const totalValue = amount * price;

          return (
            <div
              key={transaction.id}
              className="group grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-muted/50 transition-colors"
            >
              {/* Transaction Column */}
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={`/crypto-icons/${transaction.cryptocurrency.toLowerCase()}.png`} />
                  <AvatarFallback className="text-xs font-semibold">
                    {transaction.cryptocurrency.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {transaction.cryptocurrency}
                    </h3>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {amount.toFixed(6)} {transaction.cryptocurrency.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* Type Column */}
              <div className="col-span-2 hidden md:block">
                <div className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  transactionType === "buy" ? "bg-green-100 text-green-700" :
                  transactionType === "sell" ? "bg-red-100 text-red-700" :
                  "bg-blue-100 text-blue-700"
                )}>
                  {transactionType === "buy" ? <ArrowUpRight className="h-3 w-3" /> :
                   transactionType === "sell" ? <ArrowDownRight className="h-3 w-3" /> :
                   <Wallet className="h-3 w-3" />}
                  {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
                </div>
              </div>

              {/* Amount Column */}
              <div className="col-span-3 text-right">
                <div className="text-sm font-medium text-foreground">
                  {formatCurrency(totalValue)}
                </div>
                <div className="text-xs text-muted-foreground">
                  @ {formatCurrency(price)}
                </div>
              </div>

              {/* Date Column */}
              <div className="col-span-2 text-right">
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(date, { addSuffix: true })}
                </div>
              </div>

              {/* Status Column */}
              <div className="col-span-1 flex justify-end">
                <Badge
                  variant={status.color === "success" ? "default" : 
                          status.color === "warning" ? "secondary" : 
                          "destructive"}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="h-3 w-3" />
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {recentTransactions.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:underline">
            View all transactions →
          </button>
        </div>
      )}
    </div>
  );
};
