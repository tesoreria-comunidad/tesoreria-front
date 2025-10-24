// TransactionsTable.tsx
import { useMemo, useState } from "react";
import type { TTransaction } from "@/models/transaction.schema";
import { PaymentMethodBadge } from "@/components/common/PaymentMethodBadge";
import { RootTable, type TColumnDef } from "@/components/common/table";
import {
  type TDirectionOfTransaction,
  type TPaymentMethod,
} from "@/constants/transactions.constatns";
import { FamilyCell } from "@/pages/users/components/table/FamilyCell";
import { BanknoteArrowDown, BanknoteArrowUp, Filter } from "lucide-react";
import { formatCurrency } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTransactionsCategoriesQuery } from "@/queries/transactions.queries";
import { Label } from "@/components/ui/label";

// 👉 shadcn select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/common/DatePicker";
import { ActionCell } from "./components/ActionCell";

// Opcional: para mostrar el select de familias
type FamilyOption = { id: string; name: string };

type TransactionsTableProps = {
  transactions: TTransaction[];
  families?: FamilyOption[]; // opcional: habilita filtro por familia
};

type TransactionsFilters = {
  q: string; // búsqueda de texto
  direction: TDirectionOfTransaction | "ALL";
  paymentMethod: TPaymentMethod | "ALL";
  category: string | "ALL";
  familyId: string | "ALL";
  dateFrom: string; // YYYY-MM-DD
  dateTo: string; // YYYY-MM-DD
  amountMin: string; // string para inputs
  amountMax: string; // string para inputs
};

// Reusable Select field (shadcn) con etiqueta
function SelectField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const { label, value, onChange, options, placeholder, disabled, className } =
    props;
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}
      </label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? "Seleccionar..."} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function TransactionsTable({
  transactions,
  families,
}: TransactionsTableProps) {
  const categoriesQuery = useTransactionsCategoriesQuery();
  const [filters, setFilters] = useState<TransactionsFilters>({
    q: "",
    direction: "ALL",
    paymentMethod: "ALL",
    category: "ALL",
    familyId: "ALL",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
  });

  const columns: TColumnDef<TTransaction>[] = [
    { accessorKey: "id", hidden: true },
    {
      accessorKey: "amount",
      header: "Monto",
      size: 200,
      cell: ({ getValue }) => (
        <p className="font-medium">{formatCurrency(getValue<number>())}</p>
      ),
    },
    { accessorKey: "category", header: "Categoría" },
    { accessorKey: "concept", header: "Concepto", hidden: true },
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
        <p className="text-center">{getValue<string>().split("T")[0]}</p>
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
    { accessorKey: "updatedAt", hidden: true },
    {
      accessorKey: "description",
      header: "Descripción",
      size: 500,
      hidden: true,
      cell: ({ getValue }) => <p className="truncate">{getValue<string>()}</p>,
    },
    {
      header: "Acciones",
      size: 100,
      cell: ({ row }) => <ActionCell transaction={row.original} />,
    },
  ];

  // Helpers
  const normalizeDate = (iso: string) => iso?.split("T")[0] ?? "";
  const matchesText = (t: TTransaction, q: string) => {
    if (!q) return true;
    const hay = ` ${t.concept ?? ""} ${t.description ?? ""}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  };
  const inDateRange = (t: TTransaction, from: string, to: string) => {
    const d = normalizeDate(t.payment_date);
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  };
  const inAmountRange = (t: TTransaction, minStr: string, maxStr: string) => {
    const min = minStr ? Number(minStr) : undefined;
    const max = maxStr ? Number(maxStr) : undefined;
    if (Number.isFinite(min) && t.amount < (min as number)) return false;
    if (Number.isFinite(max) && t.amount > (max as number)) return false;
    return true;
  };

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (!matchesText(t, filters.q)) return false;
      if (filters.direction !== "ALL" && t.direction !== filters.direction)
        return false;
      if (
        filters.paymentMethod !== "ALL" &&
        t.payment_method !== filters.paymentMethod
      )
        return false;
      if (
        filters.familyId !== "ALL" &&
        (t.id_family ?? "") !== filters.familyId
      )
        return false;
      if (!inDateRange(t, filters.dateFrom, filters.dateTo)) return false;
      if (!inAmountRange(t, filters.amountMin, filters.amountMax)) return false;
      if (filters.category !== "ALL" && t.category !== filters.category)
        return false;
      return true;
    });
  }, [transactions, filters]);

  const clearFilters = () =>
    setFilters({
      q: "",
      direction: "ALL",
      paymentMethod: "ALL",
      category: "ALL",
      familyId: "ALL",
      dateFrom: "",
      dateTo: "",
      amountMin: "",
      amountMax: "",
    });

  return (
    <div>
      {/* Toolbar de filtros */}
      <Card className="border-none shadow my-2">
        <CardContent>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-12">
            {/* Búsqueda */}
            <div className="md:col-span-4">
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Buscar
              </Label>
              <Input
                type="text"
                placeholder="Concepto o descripción…"
                className="w-full rounded-md border px-3 py-2"
                value={filters.q}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, q: e.target.value }))
                }
              />
            </div>

            {/* Categoría (shadcn Select) */}
            <SelectField
              className="md:col-span-2"
              label="Categoría"
              value={filters.category}
              disabled={!categoriesQuery.data?.length}
              onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
              options={[
                { label: "Todas", value: "ALL" },
                ...(categoriesQuery.data?.map((cat) => ({
                  label: cat,
                  value: cat,
                })) ?? []),
              ]}
              placeholder="Todas"
            />

            {/* Dirección (shadcn Select) */}
            <SelectField
              className="md:col-span-2"
              label="Dirección"
              value={filters.direction}
              onChange={(v) =>
                setFilters((f) => ({
                  ...f,
                  direction: v as TransactionsFilters["direction"],
                }))
              }
              options={[
                { label: "Todas", value: "ALL" },
                { label: "Ingreso", value: "INCOME" },
                { label: "Egreso", value: "EXPENSE" },
              ]}
              placeholder="Todas"
            />

            {/* Método de pago (shadcn Select) */}
            <SelectField
              className="md:col-span-2"
              label="Método de pago"
              value={filters.paymentMethod}
              onChange={(v) =>
                setFilters((f) => ({
                  ...f,
                  paymentMethod: v as TransactionsFilters["paymentMethod"],
                }))
              }
              options={[
                { label: "Todos", value: "ALL" },
                { label: "Efectivo", value: "EFECTIVO" },
                { label: "Transferencia", value: "TRANSFERENCIA" },
              ]}
              placeholder="Todos"
            />

            {/* Familia (opcional) (shadcn Select) */}
            {families?.length ? (
              <SelectField
                className="md:col-span-4"
                label="Familia"
                value={filters.familyId}
                onChange={(v) =>
                  setFilters((f) => ({
                    ...f,
                    familyId: v as TransactionsFilters["familyId"],
                  }))
                }
                options={[
                  { label: "Todas", value: "ALL" },
                  ...families.map((f) => ({ label: f.name, value: f.id })),
                ]}
                placeholder="Todas"
              />
            ) : null}

            {/* Rango de fechas */}
            <div className="md:col-span-2">
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Desde (fecha pago)
              </Label>
              <DatePicker
                value={filters.dateFrom}
                onChange={(date) =>
                  setFilters((f) => ({
                    ...f,
                    dateFrom: date ? date : "",
                  }))
                }
                placeholder="Seleccionar fecha"
              />
              {/* <Input
                type="date"
                className="w-full rounded-md border px-3 py-2"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                }
              /> */}
            </div>
            <div className="md:col-span-2">
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Hasta (fecha pago)
              </Label>
              <DatePicker
                value={filters.dateTo}
                onChange={(date) =>
                  setFilters((f) => ({
                    ...f,
                    dateTo: date ? date : "",
                  }))
                }
                placeholder="Seleccionar fecha"
              />
            </div>

            {/* Rango de montos */}
            <div className="md:col-span-2">
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Monto mín
              </Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-md border px-3 py-2"
                value={filters.amountMin}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, amountMin: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label className="block text-xs font-medium text-muted-foreground mb-1">
                Monto máx
              </Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-md border px-3 py-2"
                value={filters.amountMax}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, amountMax: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 justify-between items-center">
            <Label>{filtered.length} resultado/s</Label>
            <Button type="button" variant={"secondary"} onClick={clearFilters}>
              Limpiar filtros <Filter />
            </Button>
          </div>
        </CardContent>
      </Card>

      <RootTable columns={columns} data={filtered} tableHeader />
    </div>
  );
}
