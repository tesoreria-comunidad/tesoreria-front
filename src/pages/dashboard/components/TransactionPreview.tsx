import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calendar,
  CreditCard,
  FileText,
  Tag,
} from "lucide-react";
import { PaymentMethodBadge } from "@/components/common/PaymentMethodBadge";
import { FamilyCell } from "@/pages/users/components/table/FamilyCell";
import { formatCurrency } from "@/utils";
import type { TTransaction } from "@/models/transaction.schema";
import { useTransaccionById } from "@/queries/transactions.queries";

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-4 text-gray-500" />
      <div className="text-xs">
        <div className="text-gray-500">{label}</div>
        <div className="text-gray-900">{children ?? "—"}</div>
      </div>
    </div>
  );
}

function DirectionBadge({
  direction,
}: {
  direction: TTransaction["direction"];
}) {
  const isExpense = direction === "EXPENSE";
  const cls = isExpense
    ? "bg-expense/15 text-expense ring-expense/30"
    : "bg-income/15 text-income ring-income/30";
  const Icon = isExpense ? BanknoteArrowDown : BanknoteArrowUp;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${cls}`}
    >
      <Icon className="size-3.5" />
      {isExpense ? "egreso" : "ingreso"}
    </span>
  );
}

export function TransactionPreview({
  transactionId,
}: {
  transactionId: string;
}) {
  const { data: tx, isLoading, isError } = useTransaccionById(transactionId);

  if (isLoading) {
    return (
      <div className="w-[360px] space-y-3">
        <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 rounded bg-gray-100 animate-pulse" />
          <div className="h-12 rounded bg-gray-100 animate-pulse" />
          <div className="h-12 rounded bg-gray-100 animate-pulse" />
          <div className="h-12 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="h-12 rounded bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (isError || !tx) {
    return (
      <div className="w-[360px] text-sm text-red-600">
        No se pudo cargar la transacción.
      </div>
    );
  }

  return (
    <div className="w-lg  border p-4 rounded">
      {/* header monto + direction + método */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">{formatCurrency(tx.amount)}</div>
        <div className="flex items-center gap-2">
          <DirectionBadge direction={tx.direction} />
          <PaymentMethodBadge method={tx.payment_method} />
        </div>
      </div>

      {/* grid de info rápida */}
      <div className="grid grid-cols-2 gap-3">
        <Row icon={Calendar} label="Fecha de pago">
          {new Date(tx.payment_date).toLocaleDateString()}
        </Row>

        <Row icon={Tag} label="Categoría">
          {tx.category}
        </Row>

        <Row icon={CreditCard} label="Concepto">
          {tx.concept || "—"}
        </Row>

        <Row icon={FileText} label="Descripción">
          <span className="line-clamp-2">{tx.description || "—"}</span>
        </Row>
      </div>

      {/* familia */}
      <div className="mt-3 border-t pt-3">
        <div className="text-xs text-gray-500 mb-1">Familia</div>
        {tx.id_family ? (
          <FamilyCell id_family={tx.id_family} />
        ) : (
          <span className="text-sm">—</span>
        )}
      </div>
    </div>
  );
}
