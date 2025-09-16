import { PageLoader } from "@/components/common/PageLoader";
import { useTransactionsQueries } from "@/queries/transactions.queries";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { TransactionsTable } from "./components/table/TransactionsTable";
import { Label } from "@/components/ui/label";
import { CreateTransactionAside } from "./components/CreateTransactionAside";
import { TransactionGraph } from "./components/graphs/TransactionGraph";

export function TransactionsPage() {
  const { fetchTransactions, fetchTransactionsStats } =
    useTransactionsQueries();
  const { isFetched, transactions } = useAppSelector((s) => s.transactions);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isFetched) return;
    const fetch = async () => {
      try {
        setLoading(true);
        await fetchTransactions();
        await fetchTransactionsStats();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  if (loading) return <PageLoader />;
  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Movimientos</Label>
        <CreateTransactionAside />
      </section>
      <div>
        {transactions ? (
          <section className="w-1/3 mx-auto">
            <TransactionGraph />
          </section>
        ) : null}
        <TransactionsTable />
      </div>
    </div>
  );
}
