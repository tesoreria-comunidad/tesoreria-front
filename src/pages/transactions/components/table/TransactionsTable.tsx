import { PaymentMethodBadge } from "@/components/common/PaymentMethodBadge";
import { RootTable, type TColumnDef } from "@/components/common/table";
import {
  type TDirectionOfTransaction,
  type TPaymentMethod,
} from "@/constants/transactions.constatns";
import type { TTransaction } from "@/models/transaction.schema";
import { FamilyCell } from "@/pages/users/components/table/FamilyCell";
import { formatCurrency } from "@/utils";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export function TransactionsTable({
  transactions,
}: {
  transactions: TTransaction[];
}) {
  const columns: TColumnDef<TTransaction>[] = [
    {
      accessorKey: "id",
      hidden: true,
    },
    {
      accessorKey: "amount",
      header: "Monto",
      size: 200,
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
      accessorKey: "direction",
      header: "Dirección",
      cell: ({ getValue }) => (
        <>
          {getValue<TDirectionOfTransaction>() === "EXPENSE" ? (
            <div className="flex items-center gap-2 bg-expense/25 text-expense justify-center rounded-md font-medium">
              <BanknoteArrowDown className="size" /> <span>egreso</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-income/25 text-income justify-center rounded-md font-medium">
              <BanknoteArrowUp className="size" /> <span>ingreso</span>
            </div>
          )}
        </>
      ),
    },
    {
      accessorKey: "id_family",
      header: "Familia",
      cell: ({ getValue }) => <FamilyCell id_family={getValue<string>()} />,
    },

    {
      accessorKey: "payment_method",
      header: "Método de pago",
      cell: ({ getValue }) => (
        <PaymentMethodBadge method={getValue<TPaymentMethod>()} />
      ),
    },

    {
      accessorKey: "payment_date",
      header: "Fecha de Pago",
      size: 250,
      enableSorting: true,
      cell: ({ getValue }) => (
        <p className="text-center">
          {new Date(getValue<string>()).toLocaleDateString()}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de carga",
      size: 250,
      cell: ({ getValue }) => (
        <p className="text-center">
          {new Date(getValue<string>()).toLocaleDateString()}
        </p>
      ),
    },
    {
      accessorKey: "updatedAt",
      hidden: true,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      size: 500,
      hidden: true,
      cell: ({ getValue }) => <p className=" truncate">{getValue<string>()}</p>,
    },
  ];
  return <RootTable columns={columns} data={transactions} tableHeader />;
}
