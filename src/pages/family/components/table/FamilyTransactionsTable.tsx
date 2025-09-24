import { FormatedDate } from "@/components/common/FormatedDate";
import { PaymentMethodBadge } from "@/components/common/PaymentMethodBadge";
import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TPaymentMethod } from "@/constants/payment-method.constants";
import type { TTransaction } from "@/models/transaction.schema";
import { formatCurrency } from "@/utils";
export default function FamilyTransactionsTable({
  transactions,
}: {
  transactions: TTransaction[];
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
