import type { TTransaction } from "@/models/transaction.schema";
import { EditTransactionForm } from "../../form/EditTransactionForm";

import { TransactionPreview } from "@/pages/dashboard/components/TransactionPreview";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditTransactionAsideProps {
  transaction: TTransaction;
}
export default function EditTransactionDialog({
  transaction,
}: EditTransactionAsideProps) {
  return (
    <DialogContent className="space-y-4 min-w-xl ">
      <DialogHeader>
        <DialogTitle>Modificar transaccion</DialogTitle>
        <DialogDescription>
          <TransactionPreview transactionId={transaction.id} />
        </DialogDescription>
      </DialogHeader>
      <EditTransactionForm transaction={transaction} />
    </DialogContent>
  );
}
