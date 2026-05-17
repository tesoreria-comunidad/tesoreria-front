import { FormatedDate } from "@/components/common/FormatedDate";
import { RootTable, type TColumnDef } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import type { TBalanceHistoryType } from "@/adapters/api_models/balance-history.schema";
import type { TBalanceHistory } from "@/models/balance-history.schema";
import { formatCurrency } from "@/utils";
import { EmptyData } from "@/components/common/EmptyData";

const BALANCE_HISTORY_TYPE_LABELS: Record<TBalanceHistoryType, string> = {
  CUOTA_PAYMENT: "Pago de cuota",
  MONTHLY_ADJUSTMENT: "Descuento mensual",
  MANUAL_ADJUSTMENT: "Ajuste manual",
};

function ChangeAmountCell({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
    >
      {isPositive ? "+" : ""}
      {formatCurrency(value)}
    </span>
  );
}

function TypeBadge({ type }: { type: TBalanceHistoryType }) {
  const label = BALANCE_HISTORY_TYPE_LABELS[type];
  return <Badge variant="outline">{label}</Badge>;
}

export function BalanceHistoryTable({
  history,
}: {
  history: TBalanceHistory[];
}) {
  const columns: TColumnDef<TBalanceHistory>[] = [
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ getValue }) => (
        <TypeBadge type={getValue<TBalanceHistoryType>()} />
      ),
    },
    {
      accessorKey: "previous_balance",
      header: "Saldo anterior",
      cell: ({ getValue }) => (
        <span className="font-mono">{formatCurrency(getValue<number>())}</span>
      ),
    },
    {
      accessorKey: "change_amount",
      header: "Variación",
      cell: ({ getValue }) => <ChangeAmountCell value={getValue<number>()} />,
    },
    {
      accessorKey: "new_value",
      header: "Saldo nuevo",
      cell: ({ getValue }) => (
        <span className="font-mono">{formatCurrency(getValue<number>())}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ getValue }) => {
        const desc = getValue<string | null>();
        return desc ? (
          <span className="text-sm text-muted-foreground">{desc}</span>
        ) : (
          <span className="text-xs text-muted-foreground/50">—</span>
        );
      },
    },
    {
      accessorKey: "id",
      hidden: true,
    },
    {
      accessorKey: "id_balance",
      hidden: true,
    },
  ];

  if (history.length === 0) {
    return (
      <EmptyData text="No hay historial de cambios para este balance" />
    );
  }

  return <RootTable columns={columns} data={history} />;
}
