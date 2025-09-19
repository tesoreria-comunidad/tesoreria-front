import { FormatedDate } from "@/components/common/FormatedDate";
import { PaymentMethodBadge } from "@/components/common/PaymentMethodBadge";
import { RootTable, type TColumnDef } from "@/components/common/table";
import {
  type TDirectionOfTransaction,
  type TPaymentMethod,
} from "@/constants/transactions.constatns";
import type { TTransaction } from "@/models/transaction.schema";
import { FamilyCell } from "@/pages/users/components/table/FamilyCell";
import { useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/utils";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export function TransactionsTable() {
  const { transactions } = useAppSelector((s) => s.transactions);
  const columns: TColumnDef<TTransaction>[] = [
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
            <div className="flex items-center gap-2 bg-orange-200 text-orange-600 justify-center rounded-md">
              <BanknoteArrowDown className="size-4" /> <span>egreso</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-green-200 text-green-600 justify-center rounded-md">
              <BanknoteArrowUp className="size-4" /> <span>ingreso</span>
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
      accessorKey: "description",
      header: "Descripción",
      hidden: true,
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de carga",
      size: 250,
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
      hidden: true,
    },
    {
      accessorKey: "payment_date",
      header: "Fecha de Pago",
      size: 250,
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
    },
    {
      accessorKey: "updatedAt",
      hidden: true,
    },
  ];
  return <RootTable columns={columns} data={transactions} tableHeader />;
}
