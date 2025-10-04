import { useAppSelector } from "@/store/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Banknote,
  AlertTriangle,
  RefreshCcw,
  XCircle,
  FileDown,
} from "lucide-react";
import { formatCurrency } from "@/utils";
import { BalanceServices } from "@/services/balance.service";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useCuotasQuery } from "@/queries/cuota.queries";
import { cn } from "@/lib/utils";
import type { TFamily } from "@/models";

type RowResult = {
  id: string;
  name: string;
  status: "OK" | "FAIL" | "SKIPPED";
  ms: number;
  error?: string;
};

// --- helper: pool de concurrencia ---
async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
  cancelRef?: React.MutableRefObject<boolean>
) {
  const pool: Promise<void>[] = [];
  let i = 0;

  const next = async () => {
    if (cancelRef?.current) return;
    const idx = i++;
    if (idx >= items.length) return;
    await worker(items[idx], idx);
    if (!cancelRef?.current) await next();
  };

  for (let k = 0; k < Math.min(limit, items.length); k++) {
    pool.push(next());
  }
  await Promise.all(pool);
}

export function UpdateBalanceButton() {
  const { user } = useAppSelector((s) => s.session);
  const { data: cuotas } = useCuotasQuery();
  const currentCuota = cuotas?.find((c) => c.is_active);
  const { data: families } = useFamiliesQuery();
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const concurrency = 10;
  const cancelRef = useRef(false);

  const [currentName, setCurrentName] = useState<string | null>(null);
  const [doneCount, setDoneCount] = useState(0);

  const [failed, setFailed] = useState<
    { id: string; name: string; error?: any }[]
  >([]);
  const [succeeded, setSucceeded] = useState<string[]>([]);
  const [rows, setRows] = useState<RowResult[]>([]); // para CSV

  if (user && user.role !== "MASTER") return null;

  // Familias elegibles
  const activeFamilies = useMemo(() => {
    const base =
      (families ?? []).filter(
        (f) => f.users.filter((u) => u.is_active && !u.is_granted).length > 0
      ) ?? [];
    return base;
  }, [families]);

  const total = activeFamilies.length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  // Reset limpio al cerrar
  useEffect(() => {
    if (!open) {
      setIsRunning(false);
      setDoneCount(0);
      setCurrentName(null);
      setFailed([]);
      setSucceeded([]);
      setRows([]);
      cancelRef.current = false;
    }
  }, [open]);

  // --- corrida con concurrencia limitada ---
  const run = async (items: TFamily[]) => {
    setIsRunning(true);
    setDoneCount(0);
    setFailed([]);
    setSucceeded([]);
    setRows([]);
    cancelRef.current = false;

    const startAt = performance.now();

    // worker por item
    const worker = async (fam: TFamily) => {
      if (cancelRef.current) return;

      const t0 = performance.now();
      setCurrentName(fam.name);

      try {
        await BalanceServices.updateFamilyBalance(fam.id);
        const ms = Math.round(performance.now() - t0);
        setSucceeded((s) => [...s, fam.name]);
        setRows((r) => [
          ...r,
          { id: fam.id, name: fam.name, status: "OK", ms },
        ]);
      } catch (error: any) {
        const ms = Math.round(performance.now() - t0);
        setFailed((f) => [...f, { id: fam.id, name: fam.name, error }]);
        setRows((r) => [
          ...r,
          {
            id: fam.id,
            name: fam.name,
            status: "FAIL",
            ms,
            error:
              (error?.response?.data?.message as string) ??
              (error?.message as string) ??
              "Error",
          },
        ]);
      } finally {
        setDoneCount((c) => c + 1);
      }
    };

    await runWithConcurrency(
      items,
      Math.max(1, concurrency),
      worker,
      cancelRef
    );

    setIsRunning(false);
    const totalMs = Math.round(performance.now() - startAt);

    showAlert({
      title: "Proceso finalizado",
      description: `OK: ${succeeded.length}/${items.length} • Fallas: ${failed.length} • ${totalMs} ms`,
      type: failed.length ? "warning" : "success",
    });
  };

  const submitChanges = async () => {
    if (total === 0 || isRunning) return;
    await run(activeFamilies);
  };

  const cancelRun = () => {
    if (!isRunning) return;
    cancelRef.current = true; // soft-cancel: frena antes del próximo request
  };

  const retryFailed = async () => {
    if (failed.length === 0 || isRunning) return;
    const failedIds = new Set(failed.map((f) => f.id));
    const toRetry = activeFamilies.filter((f) => failedIds.has(f.id));
    await run(toRetry);
  };

  // --- CSV ---
  const exportCsv = () => {
    if (rows.length === 0) return;
    const headers = [
      "Nombre",
      "Estado de actualizacion",
      "duration_ms",
      "error",
    ];
    const escape = (v: any) => `"${String(v ?? "").replaceAll('"', '""')}"`;
    const lines = [
      headers.join(","),
      ...rows.map((r) =>
        [r.name, r.status, r.ms, r.error ?? ""].map(escape).join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.download = `balances_result_${date}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Banknote className="h-4 w-4" />
          <span className="ml-2">Actualizar balances</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" /> Actualizar balances
          </DialogTitle>
          <DialogDescription>
            Procesa familias activas con concurrencia limitada y muestra
            progreso en tiempo real.
          </DialogDescription>
        </DialogHeader>

        {/* Datos */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Valor de cuota</span>
            <span className="font-medium">
              {formatCurrency(currentCuota?.value || 0)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Familias a procesar</span>
            <span className="font-medium">{total}</span>
          </div>
        </div>

        {/* Progreso */}
        <div className="mt-4 space-y-2">
          <Progress value={percent} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {isRunning
                ? currentName
                  ? `Procesando: ${currentName}`
                  : "Iniciando…"
                : doneCount === total && total > 0
                ? "Completado"
                : "Listo para ejecutar"}
            </span>
            <span>
              {doneCount}/{total} ({percent}%)
            </span>
          </div>

          {failed.length > 0 && (
            <div className="flex items-center gap-2 rounded-md border p-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">
                Fallaron {failed.length} familia(s). Podés reintentar sólo esas.
              </span>
            </div>
          )}
        </div>

        {/* Chips */}
        {(succeeded.length > 0 || failed.length > 0) && (
          <div className="mt-2 flex flex-wrap gap-2 max-h-32 overflow-auto">
            {succeeded.map((id) => (
              <span
                key={`ok-${id}`}
                className={cn(
                  "text-xs px-2 py-1 rounded-full border",
                  "bg-emerald-50 border-emerald-200 text-emerald-700"
                )}
              >
                OK: {id}
              </span>
            ))}
            {failed.map((f) => (
              <span
                key={`fail-${f.id}`}
                className={cn(
                  "text-xs px-2 py-1 rounded-full border",
                  "bg-rose-50 border-rose-200 text-rose-700"
                )}
                title={String(f.error ?? "")}
              >
                FAIL: {f.name}
              </span>
            ))}
          </div>
        )}

        <DialogFooter className="gap-2">
          {!isRunning ? (
            <>
              <Button onClick={submitChanges} disabled={total === 0}>
                Confirmar
              </Button>
              <Button
                variant="secondary"
                onClick={retryFailed}
                disabled={failed.length === 0}
                title="Reintenta solo las que fallaron"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reintentar fallidas
              </Button>
              <Button
                variant="outline"
                onClick={exportCsv}
                disabled={rows.length === 0}
                title="Exportar resultados a CSV"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </>
          ) : (
            <Button variant="destructive" onClick={cancelRun}>
              <XCircle className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
