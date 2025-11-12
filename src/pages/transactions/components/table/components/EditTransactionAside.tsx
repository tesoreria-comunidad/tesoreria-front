import type { TTransaction } from "@/models/transaction.schema";
import { EditTransactionForm } from "../../form/EditTransactionForm";
import {
  DialogContent,
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
      </DialogHeader>
      <EditTransactionForm transaction={transaction} />
    </DialogContent>
  );
}
