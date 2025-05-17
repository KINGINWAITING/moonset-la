
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoPortfolio } from "@/types/supabase";
import { formatCurrency } from "@/lib/format-utils";
import { cn } from "@/lib/utils";

interface TransactionsListProps {
  recentTransactions: CryptoPortfolio[];
  connected: boolean;
}

export const TransactionsList = ({ recentTransactions, connected }: TransactionsListProps) => {
  // Sample transaction statuses
  const statuses = ["Success", "Pending", "Failed"];
  
  return (
    <div className="col-span-1">
      <Card className="glass h-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {connected ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-xs text-gray-400 mb-2">
                <div>NAME</div>
                <div>DATE</div>
                <div>PRICE</div>
                <div>STATUS</div>
              </div>
              
              {recentTransactions.map((transaction, index) => {
                const percentChange = index % 2 === 0 ? 2.34 : -8.43;
                const isPositive = percentChange >= 0;
                const statusIndex = index % 3;
                const date = new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                
                return (
                  <div key={transaction.id} className="grid grid-cols-4 items-center py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                        index % 3 === 0 ? "bg-purple-500" : index % 3 === 1 ? "bg-blue-500" : "bg-green-500"
                      )}>
                        {transaction.cryptocurrency.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.cryptocurrency}</div>
                        <div className={cn(
                          "text-xs",
                          isPositive ? "text-green-500" : "text-red-500"
                        )}>
                          {isPositive ? "+" : ""}{percentChange}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      {date}
                    </div>
                    
                    <div className="font-medium">
                      {formatCurrency(Number(transaction.amount) * Number(transaction.purchase_price))}
                    </div>
                    
                    <div className={cn(
                      "flex items-center",
                      statusIndex === 0 ? "text-green-500" : 
                      statusIndex === 1 ? "text-yellow-500" : "text-red-500"
                    )}>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full mr-2",
                        statusIndex === 0 ? "bg-green-500" : 
                        statusIndex === 1 ? "bg-yellow-500" : "bg-red-500"
                      )}></div>
                      {statuses[statusIndex]}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              Connect your wallet to view transactions
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
