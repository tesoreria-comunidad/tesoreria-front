import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { THealthAlert } from "@/models";
import { useHealthCheckQuery } from "@/queries/health-check.queries";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import {
  SEVERITY_CONFIG,
  SEVERITY_ORDER,
} from "@/pages/monitoring/constants/monitoring.constants";

export function HealthCheckTrigger() {
  const { data: alerts, isLoading } = useHealthCheckQuery();

  if (isLoading || !alerts?.length) return null;

  const criticalCount = alerts.filter((a) => a.severity === "CRITICA").length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative overflow-visible text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30"
          title="Ver alertas del sistema"
        >
          <AlertTriangle className="size-5" />
          {criticalCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              {criticalCount > 9 ? "9+" : criticalCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-orange-500" />
            <SheetTitle>Estado del sistema</SheetTitle>
          </div>
          <SheetDescription>
            {alerts.length} alerta{alerts.length !== 1 ? "s" : ""} detectada
            {alerts.length !== 1 ? "s" : ""}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AlertList alerts={alerts} />
        </div>

        <SheetFooter className="border-t pt-4 px-4 pb-4">
          <Link to="/monitoring" className="w-full">
            <Button variant="outline" className="w-full">
              Ver detalle completo
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function AlertList({ alerts }: { alerts: THealthAlert[] }) {
  const grouped = SEVERITY_ORDER.reduce<Record<string, THealthAlert[]>>(
    (acc, sev) => {
      acc[sev] = alerts.filter((a) => a.severity === sev);
      return acc;
    },
    {}
  );

  if (!alerts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="size-8 text-green-500" />
        <p className="font-medium text-foreground">Todo en orden</p>
        <p>No se detectaron datos incompletos ni inconsistentes.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {SEVERITY_ORDER.filter((sev) => grouped[sev]?.length > 0).map((sev) => (
        <section key={sev}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            {SEVERITY_CONFIG[sev].label}
          </p>
          <div className="flex flex-col gap-1.5">
            {grouped[sev].map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function AlertRow({ alert }: { alert: THealthAlert }) {
  const config = SEVERITY_CONFIG[alert.severity];
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-4 py-2.5 gap-3 ${config.rowClass}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <AlertTriangle className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-sm">{alert.description}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-muted-foreground">{alert.entity}</span>
        <Badge variant={config.badgeVariant}>{alert.count}</Badge>
      </div>
    </div>
  );
}
