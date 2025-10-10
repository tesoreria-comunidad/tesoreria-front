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
import { Banknote, FileDown } from "lucide-react";
import { formatCurrency } from "@/utils";
import { BalanceServices } from "@/services/balance.service";
import { useMemo, useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useCuotasQuery } from "@/queries/cuota.queries";
type RowResult = {
  id: string;
  name: string;
  status: "OK" | "FAIL" | "SKIPPED";
  ms: number;
  error?: string;
};

export function UpdateBalanceButton() {
  const { user } = useAppSelector((s) => s.session);
  const { data: cuotas } = useCuotasQuery();
  const currentCuota = cuotas?.find((c) => c.is_active);
  const { data: families } = useFamiliesQuery();
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const [rows] = useState<RowResult[]>([]); // para CSV

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

  const submitChanges = async () => {
    try {
      setIsRunning(true);
      const res = await BalanceServices.updateAllBalances();
      showAlert({
        title: "Balances actualizados correctamente",
        type: "success",
        description: res ? res : "",
      });
    } catch (error) {
      // @ts-ignore
      if (error?.response?.data?.message) {
        showAlert({
          title: "No se puede actualizar los balances",
          type: "error",
          // @ts-ignore
          description: error?.response?.data?.message as string,
        });
        return;
      }
      showAlert({
        title: "Error al ",
        type: "error",
        description: "",
      });
    } finally {
      setIsRunning(false);
    }
    // await run(activeFamilies);
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
          <Progress />
        </div>

        <DialogFooter className="gap-2">
          <>
            <Button onClick={submitChanges} isLoading={isRunning}>
              Comenzar
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
