import { FormatedDate } from "@/components/common/FormatedDate";
import { PaymentMethodBadge } from "@/components/common/PaymentMethodBadge";
import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TPaymentMethod } from "@/constants/payment-method.constants";
import type { TTransaction } from "@/models/transaction.schema";
import { formatCurrency } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { usePaymentReceiptByTransaction } from "@/queries/payment-receipt.queries";
import { useAppSelector } from "@/store/hooks";

interface ReceiptCellProps {
  transaction: TTransaction;
  familyId?: string;
}

function ReceiptCell({ transaction, familyId }: ReceiptCellProps) {
  const { user } = useAppSelector((s) => s.session);
  const isCuotaIncome =
    transaction.category === "CUOTA" && transaction.direction === "INCOME";

  // Determine access: MASTER sees all; FAMILY/BENEFICIARIO only own family
  const canView =
    user?.role === "MASTER" ||
    ((user?.role === "FAMILY" || user?.role === "BENEFICIARIO") &&
      familyId !== undefined &&
      transaction.id_family === familyId);

  const { data: receipt } = usePaymentReceiptByTransaction(
    isCuotaIncome && canView ? transaction.id : ""
  );

  if (!isCuotaIncome) return null;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="text-xs gap-1">
        <FileTextIcon className="size-3" />
        CUOTA
      </Badge>
      {canView && receipt?.pdf_url && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(receipt.pdf_url!, "_blank")}
        >
          Ver comprobante
        </Button>
      )}
    </div>
  );
}

export default function FamilyTransactionsTable({
  transactions,
  familyId,
}: {
  transactions: TTransaction[];
  familyId?: string;
}) {
  const columns: TColumnDef<TTransaction>[] = [
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ getValue }) => (
        <p className="font-medium">{formatCurrency(getValue<number>())}</p>
      ),
    },
    {
      accessorKey: "category",
      cell: ({ row }) => <ReceiptCell transaction={row.original} familyId={familyId} />,
    },
    {
      accessorKey: "concept",
      header: "Concepto",
      hidden: true,
    },
    {
      accessorKey: "payment_date",
      header: "Fecha de Pago",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
    },
    {
      accessorKey: "payment_method",
      cell: ({ getValue }) => (
        <PaymentMethodBadge method={getValue<TPaymentMethod>()} />
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      hidden: true,
    },
    {
      accessorKey: "createdAt",
      hidden: true,
    },
    {
      accessorKey: "updatedAt",
      hidden: true,
    },
    {
      accessorKey: "id",
      hidden: true,
    },
  ];
  if (transactions.length === 0) {
    return (
      <div className="text-gray-600 text-sm">
        No hay transacciones para esta familia.
      </div>
    );
  }
  return <RootTable columns={columns} data={transactions} />;
}
