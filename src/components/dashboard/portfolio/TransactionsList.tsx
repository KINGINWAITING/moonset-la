
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoPortfolio } from "@/types/supabase";

interface TransactionsListProps {
  recentTransactions: CryptoPortfolio[];
  connected: boolean;
}

export const TransactionsList = ({ recentTransactions, connected }: TransactionsListProps) => {
  return (
    <Card className="bg-[#0A0A0A] border border-gray-800 col-span-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest cryptocurrency transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-2 font-medium">Asset</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Price</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, index) => (
                  <tr key={tx.id || `wallet-tx-${index}`} className="border-b border-gray-800">
                    <td className="py-4 flex items-center">
                      <div className="w-8 h-8 bg-gray-800 rounded-full mr-2"></div>
                      <div>
                        <p className="font-medium">{tx.cryptocurrency}</p>
                        <p className="text-sm text-gray-400">
                          {tx.cryptocurrency === "ETH" && connected ? "Wallet" : "Buy"}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      {Number(tx.amount).toFixed(4)} {tx.cryptocurrency}
                    </td>
                    <td className="py-4">${Number(tx.purchase_price).toFixed(2)}</td>
                    <td className="py-4 text-gray-400">
                      {new Date(tx.purchase_date || '').toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">
              {connected ? "No wallet transactions" : "Connect your wallet to view transactions"}
            </p>
            <Button className="mt-4 button-gradient">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
