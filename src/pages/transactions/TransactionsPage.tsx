import { PageLoader } from "@/components/common/PageLoader";
import { useTransactionsQuery } from "@/queries/transactions.queries";

import { TransactionsTable } from "./components/table/TransactionsTable";
import { Label } from "@/components/ui/label";
import { CreateTransactionAside } from "./components/CreateTransactionAside";
import { TransactionGraph } from "./components/graphs/TransactionGraph";
import { ExpensesByCategory } from "./components/graphs/ExpensesByCategory";
import type { TTransaction } from "@/models/transaction.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  ChartAreaIcon,
  ChevronsUpDown,
  Grid2x2Check,
  Grid2x2Plus,
} from "lucide-react";
import { useState } from "react";
import { BulkCreateTransactionsPage } from "./components/BulkCreateTransactionsPage";

export function TransactionsPage() {
  const transaccitionsQuery = useTransactionsQuery();
  const [bulkCreateSection, setBulkCreateSection] = useState(false);
  if (transaccitionsQuery.isLoading)
    return (
      <div className="h-[80vh] overflow-hidden">
        <PageLoader />;
      </div>
    );

  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Transacciones</Label>
        <div className="flex gap-2">
          <CreateTransactionAside />
          <Button
            onClick={() => setBulkCreateSection(!bulkCreateSection)}
            variant={bulkCreateSection ? "outline" : "default"}
          >
            {bulkCreateSection ? <Grid2x2Check /> : <Grid2x2Plus />}
          </Button>
        </div>
      </section>
      {bulkCreateSection ? (
        <div>
          <BulkCreateTransactionsPage />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Collapsible className="bg-white/50 rounded p-4">
            <span className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2 text-gray-800">
                <Label className="text-lg">Estadísticas</Label>
                <ChartAreaIcon />
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </span>
            <CollapsibleContent>
              {transaccitionsQuery.data ? (
                <section className="w-full mx-auto grid grid-cols-2 max-md:grid-cols-1 gap-4  my-4">
                  <TransactionGraph />
                  <ExpensesByCategory />
                  {/* <TransactionGraph /> */}
                </section>
              ) : null}
            </CollapsibleContent>
          </Collapsible>

          <TransactionsTable
            transactions={transaccitionsQuery.data as TTransaction[]}
          />
        </div>
      )}
    </div>
  );
}
