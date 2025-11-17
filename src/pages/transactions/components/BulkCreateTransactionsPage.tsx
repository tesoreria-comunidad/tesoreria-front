import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { type ZodIssue } from "zod";
import {
  CreateTransactionSchema,
  PaymentMethod,
  TransactionDirection,
  type TCreateTransaction,
} from "@/models/transaction.schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, UploadCloud, Send, Trash2 } from "lucide-react";
import { useFamiliesQuery } from "@/queries/family.queries";

// ---------- Schema array ----------
const RowSchema = CreateTransactionSchema;
const BulkSchema = z.object({
  rows: z.array(RowSchema),
});

type TBulkForm = z.infer<typeof BulkSchema>;

// ---------- Helpers ----------
const paymentMethodOptions = PaymentMethod.options as [
  typeof PaymentMethod.enum.EFECTIVO | typeof PaymentMethod.enum.TRANSFERENCIA
];
const directionOptions = TransactionDirection.options as [
  | typeof TransactionDirection.enum.INCOME
  | typeof TransactionDirection.enum.EXPENSE
];

const emptyRow: TCreateTransaction = {
  amount: 0,
  id_family: null,
  payment_method: PaymentMethod.enum.EFECTIVO,
  direction: TransactionDirection.enum.INCOME,
  category: "",
  payment_date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd (lo convertimos a ISO en submit)
  concept: "",
  description: "",
};

// Parseo “best-effort” de TSV/CSV (con o sin encabezados)
function parseClipboard(text: string): Partial<TCreateTransaction>[] {
  // Detectar separador
  const sep = text.includes("\t") ? "\t" : ",";
  const lines = text.trim().split(/\r?\n/).filter(Boolean);

  if (!lines.length) return [];

  const headerLike = lines[0].toLowerCase();
  const hasHeader =
    headerLike.includes("amount") ||
    headerLike.includes("monto") ||
    headerLike.includes("payment_method") ||
    headerLike.includes("direction") ||
    headerLike.includes("category") ||
    headerLike.includes("payment_date");

  const rows = hasHeader ? lines.slice(1) : lines;

  // Orden esperado si no hay encabezado:
  // amount | id_family | payment_method | direction | category | payment_date | concept | description
  return rows.map((line) => {
    const cols = line.split(sep).map((s) => s.trim());
    const toNum = (s?: string) => (s ? Number(s.replace(",", ".")) : undefined);
    const normPM = (s?: string) =>
      s?.toUpperCase() === "TRANSFERENCIA" ? "TRANSFERENCIA" : "EFECTIVO";
    const normDir = (s?: string) =>
      s?.toUpperCase() === "EXPENSE" || s?.toUpperCase() === "EGRESO"
        ? "EXPENSE"
        : "INCOME";

    let obj: Partial<TCreateTransaction> = {};
    if (hasHeader) {
      const hdrs = lines[0].split(sep).map((h) => h.trim().toLowerCase());
      const get = (name: string) => {
        const idx = hdrs.indexOf(name);
        return idx >= 0 ? cols[idx] : undefined;
      };
      obj = {
        amount: toNum(get("amount")) ?? toNum(get("monto")),
        id_family: (get("id_family") ?? get("family") ?? "") || null,
        payment_method: normPM(get("payment_method")) as any,
        direction: normDir(get("direction")) as any,
        category: get("category") ?? "",
        payment_date: (get("payment_date") ?? get("date") ?? "").slice(0, 10),
        concept: get("concept") ?? "",
        description: get("description") ?? "",
      };
    } else {
      obj = {
        amount: toNum(cols[0]),
        id_family: cols[1] || "" || null,
        payment_method: normPM(cols[2]) as any,
        direction: normDir(cols[3]) as any,
        category: cols[4] || "",
        payment_date: (cols[5] || "").slice(0, 10),
        concept: cols[6] || "",
        description: cols[7] || "",
      };
    }
    return obj;
  });
}

function toISODateString(yyyyMMdd: string) {
  // yyyy-mm-dd -> ISO string
  if (!yyyyMMdd) return new Date().toISOString();
  const d = new Date(`${yyyyMMdd}T00:00:00`);
  return d.toISOString();
}

function formatIssue(issue: ZodIssue) {
  const path = issue.path.join(".");
  return `${path}: ${issue.message}`;
}

// ---------- Component ----------
export function BulkCreateTransactionsPage() {
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { data: families } = useFamiliesQuery();
  const form = useForm<TBulkForm>({
    resolver: zodResolver(BulkSchema),
    defaultValues: { rows: [emptyRow] },
    mode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  // Totales
  const { totalIncome, totalExpense } = useMemo(() => {
    const vals = form.getValues("rows") || [];
    let income = 0,
      expense = 0;
    for (const r of vals) {
      if (!r?.amount || Number.isNaN(r.amount)) continue;
      if (r.direction === "INCOME") income += r.amount;
      else expense += r.amount;
    }
    return { totalIncome: income, totalExpense: expense };
  }, [form.watch("rows")]);

  // Pegar desde portapapeles
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const text = e.clipboardData.getData("text");
      if (!text) return;
      const parsed = parseClipboard(text);
      if (parsed.length) {
        e.preventDefault();
        // Fusion rápida: filas nuevas + mantener existentes si la primera es vacía
        const current = form.getValues("rows");
        if (
          current.length === 1 &&
          JSON.stringify(current[0]) === JSON.stringify(emptyRow)
        ) {
          replace(
            parsed.map((p) => ({ ...emptyRow, ...p } as TCreateTransaction))
          );
        } else {
          parsed.forEach((p) => append({ ...emptyRow, ...p }));
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [append, replace, form]);

  const importCSV = async (f: File) => {
    const txt = await f.text();
    const parsed = parseClipboard(txt);
    if (!parsed.length) return;
    replace(parsed.map((p) => ({ ...emptyRow, ...p } as TCreateTransaction)));
  };

  const exportCSV = () => {
    const rows = form.getValues("rows");
    const header = [
      "amount",
      "id_family",
      "payment_method",
      "direction",
      "category",
      "payment_date",
      "concept",
      "description",
    ].join(",");
    const body = rows
      .map((r) =>
        [
          r.amount ?? "",
          r.id_family ?? "",
          r.payment_method ?? "",
          r.direction ?? "",
          r.category ?? "",
          r.payment_date ?? "",
          r.concept ?? "",
          r.description ?? "",
        ]
          .map((v) =>
            typeof v === "string" && v.includes(",")
              ? `"${v.replace(/"/g, '""')}"`
              : v
          )
          .join(",")
      )
      .join("\n");
    const csv = [header, body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bulk-transactions-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = async (data: TBulkForm) => {
    setSubmitting(true);
    try {
      // Normalizamos date a ISO string completa
      const payload: TCreateTransaction[] = data.rows.map((r) => ({
        ...r,
        payment_date: toISODateString(r.payment_date),
      }));

      // Validación final por si alguien editó fuera de RHF
      const res = BulkSchema.safeParse({ rows: payload });
      if (!res.success) {
        const firstError = res.error.issues[0];
        form.setError(
          //@ts-ignore
          `rows.${firstError.path[1] as number}.${firstError.path[2] as any}`,
          {
            message: firstError.message,
          }
        );
        throw new Error(res.error.issues.map(formatIssue).join(" | "));
      }

      // 🔗 Ajustá la URL a tu endpoint real
      const resp = await fetch("/api/transactions/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: payload }),
      });

      if (!resp.ok) {
        const t = await resp.text();
        throw new Error(`Error ${resp.status}: ${t}`);
      }

      // Reset limpio dejando 1 fila vacía
      form.reset({ rows: [emptyRow] });
      alert("Transacciones creadas con éxito 🎉");
    } catch (err: any) {
      console.error(err);
      alert(`No se pudo crear el bulk.\n${err?.message ?? err}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex justify-end w-full items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => append(emptyRow)}
          >
            <Plus className="mr-1 h-4 w-4" /> Agregar fila
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => append(Array.from({ length: 10 }, () => emptyRow))}
          >
            <Plus className="mr-1 h-4 w-4" /> +10 filas
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => form.reset({ rows: [emptyRow] })}
          >
            <Trash2 className="mr-1 h-4 w-4" /> Limpiar
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importCSV(f).finally(() => (e.currentTarget.value = ""));
            }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
          >
            <UploadCloud className="mr-1 h-4 w-4" /> Import CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            Descargar CSV
          </Button>
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            disabled={submitting}
          >
            <Send className="mr-1 h-4 w-4" />
            Enviar bulk
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-none shadow-none  p-0">
        <CardContent className="p-0">
          <div className="w-full overflow-auto">
            {/* Tabla editable */}
            <table className="min-w-[1200px] w-full text-sm">
              <thead className="sticky top-0 bg-muted">
                <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium [&>th]:border-b">
                  <th style={{ width: 150 }}>Amount</th>
                  <th style={{ width: 180 }}>Family (id)</th>
                  <th style={{ width: 150 }}>Payment method</th>
                  <th style={{ width: 130 }}>Direction</th>
                  <th style={{ width: 180 }}>Category</th>
                  <th style={{ width: 170 }}>Payment date</th>
                  <th style={{ width: 180 }}>Concept</th>
                  <th>Description</th>
                  <th style={{ width: 42 }}></th>
                </tr>
              </thead>

              <tbody>
                {fields.map((field, idx) => (
                  <tr
                    key={field.id}
                    className="[&>td]:px-3 [&>td]:py-2 border-b"
                  >
                    {/* amount */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.amount`}
                        render={({ field }) => (
                          <Input
                            type="number"
                            step="0.01"
                            min={0}
                            value={
                              Number.isNaN(field.value as any)
                                ? ""
                                : field.value ?? ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : Number(e.target.value)
                              )
                            }
                            className={
                              form.formState.errors?.rows?.[idx]?.amount
                                ? "border-destructive"
                                : ""
                            }
                          />
                        )}
                      />
                      <FieldError form={form} idx={idx} name="amount" />
                    </td>

                    {/* id_family */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.id_family`}
                        render={({ field }) => (
                          <Select
                            value={field.value as string}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              className="w-full"
                              value={field.value as string}
                            >
                              <SelectValue placeholder="Familia " />
                            </SelectTrigger>
                            <SelectContent>
                              {families?.map((family) => (
                                <SelectItem key={family.id} value={family.id}>
                                  {family.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FieldError form={form} idx={idx} name="id_family" />
                    </td>

                    {/* payment_method */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.payment_method`}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              className={
                                form.formState.errors?.rows?.[idx]
                                  ?.payment_method
                                  ? "border-destructive"
                                  : ""
                              }
                            >
                              <SelectValue placeholder="Método" />
                            </SelectTrigger>
                            <SelectContent>
                              {paymentMethodOptions.map((pm) => (
                                <SelectItem key={pm} value={pm}>
                                  {pm}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FieldError form={form} idx={idx} name="payment_method" />
                    </td>

                    {/* direction */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.direction`}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              className={
                                form.formState.errors?.rows?.[idx]?.direction
                                  ? "border-destructive"
                                  : ""
                              }
                            >
                              <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {directionOptions.map((d) => (
                                <SelectItem key={d} value={d}>
                                  {d}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FieldError form={form} idx={idx} name="direction" />
                    </td>

                    {/* category */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.category`}
                        render={({ field }) => (
                          <Input
                            placeholder="Categoría"
                            {...field}
                            className={
                              form.formState.errors?.rows?.[idx]?.category
                                ? "border-destructive"
                                : ""
                            }
                          />
                        )}
                      />
                      <FieldError form={form} idx={idx} name="category" />
                    </td>

                    {/* payment_date */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.payment_date`}
                        render={({ field }) => (
                          <Input
                            type="date"
                            value={field.value?.slice(0, 10) ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={
                              form.formState.errors?.rows?.[idx]?.payment_date
                                ? "border-destructive"
                                : ""
                            }
                          />
                        )}
                      />
                      <FieldError form={form} idx={idx} name="payment_date" />
                    </td>

                    {/* concept */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.concept`}
                        render={({ field }) => (
                          <Input placeholder="Concepto (opcional)" {...field} />
                        )}
                      />
                    </td>

                    {/* description */}
                    <td>
                      <Controller
                        control={form.control}
                        name={`rows.${idx}.description`}
                        render={({ field }) => (
                          <Input
                            placeholder="Descripción (opcional)"
                            {...field}
                          />
                        )}
                      />
                    </td>

                    {/* remove */}
                    <td className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Footer con totales */}
              <tfoot>
                <tr className="[&>td]:px-3 [&>td]:py-2 bg-muted/40 font-medium p-4">
                  <td colSpan={2}>
                    <div className="text-xs text-muted-foreground">
                      Filas: {fields.length} — Pegá desde Excel/Sheets con
                      Ctrl/⌘+V. Encabezados opcionales.
                    </div>
                  </td>
                  <td colSpan={2}>
                    <div className="text-sm">
                      Ingreso:{" "}
                      <span className="font-semibold">
                        ${totalIncome.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td colSpan={2}>
                    <div className="text-sm">
                      Egreso:{" "}
                      <span className="font-semibold">
                        ${totalExpense.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td colSpan={3}>
                    <div className="text-sm text-right">
                      Balance:{" "}
                      <span className="font-semibold">
                        ${(totalIncome - totalExpense).toFixed(2)}
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------- Error de celda pequeño ----------
function FieldError({
  form,
  idx,
  name,
}: {
  form: ReturnType<typeof useForm<TBulkForm>>;
  idx: number;
  name:
    | "amount"
    | "id_family"
    | "payment_method"
    | "direction"
    | "category"
    | "payment_date"
    | "concept"
    | "description";
}) {
  const err = (form.formState.errors?.rows?.[idx] as any)?.[name]?.message as
    | string
    | undefined;
  if (!err) return null;
  return <p className="mt-1 text-[11px] text-destructive">{err}</p>;
}
