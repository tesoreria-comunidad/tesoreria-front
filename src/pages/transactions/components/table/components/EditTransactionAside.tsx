import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { TTransaction } from "@/models/transaction.schema";
import { EditTransactionForm } from "../../form/EditTransactionForm";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { TransactionPreview } from "@/pages/dashboard/components/TransactionPreview";

interface EditTransactionAsideProps {
  transaction: TTransaction;
}
export default function EditTransactionAside({
  transaction,
}: EditTransactionAsideProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <PenIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle>Modificar transaccion</SheetTitle>
          <SheetDescription className="w-full">
            <TransactionPreview transactionId={transaction.id} />
          </SheetDescription>
          <section className="flex-1 ">
            <EditTransactionForm transaction={transaction} />
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
