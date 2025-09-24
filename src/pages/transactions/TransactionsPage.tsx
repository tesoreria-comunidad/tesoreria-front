import { PageLoader } from "@/components/common/PageLoader";
import { useTransactionsQuery } from "@/queries/transactions.queries";

import { TransactionsTable } from "./components/table/TransactionsTable";
import { Label } from "@/components/ui/label";
import { CreateTransactionAside } from "./components/CreateTransactionAside";
import { TransactionGraph } from "./components/graphs/TransactionGraph";
import { ExpensesByCategory } from "./components/graphs/ExpensesByCategory";
import type { TTransaction } from "@/models/transaction.schema";

export function TransactionsPage() {
  const transaccitionsQuery = useTransactionsQuery();
  if (transaccitionsQuery.isLoading) return <PageLoader />;

  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Movimientos</Label>
        <CreateTransactionAside />
      </section>
      <div className="flex flex-col gap-2">
        {transaccitionsQuery.data ? (
          <section className="w-full mx-auto grid grid-cols-2 gap-4 ">
            <TransactionGraph />
            <ExpensesByCategory />
            {/* <TransactionGraph /> */}
          </section>
        ) : null}
        <TransactionsTable
          transactions={transaccitionsQuery.data as TTransaction[]}
        />
      </div>
    </div>
  );
}
