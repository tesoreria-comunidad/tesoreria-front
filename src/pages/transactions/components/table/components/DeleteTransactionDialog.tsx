import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TTransaction } from "@/models/transaction.schema";
import { TransactionPreview } from "@/pages/dashboard/components/TransactionPreview";
import { useDeleteTransactionMutation } from "@/queries/transactions.queries";
import { Trash } from "lucide-react";
interface Props {
  transaction: TTransaction;
  closeDialog: () => void;
}
export function DeleteTransactionDialog({ transaction, closeDialog }: Props) {
  const deleteMutation = useDeleteTransactionMutation();
  // const {showAlert}=useAlert()
  const handleDelete = () => {
    deleteMutation.mutate(transaction.id, {
      onSuccess: () => {
        closeDialog();
      },
    });
  };
  return (
    <DialogContent className="space-y-4 min-w-xl ">
      <DialogHeader>
        <DialogTitle>Eliminar transaccion</DialogTitle>
        <DialogDescription>
          <TransactionPreview transactionId={transaction.id} />
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          variant={"destructive"}
          isLoading={deleteMutation.isPending}
          onClick={handleDelete}
        >
          <Trash /> Eliminar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
