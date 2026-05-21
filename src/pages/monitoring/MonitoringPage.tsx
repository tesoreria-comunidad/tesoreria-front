import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TAlertSeverity, THealthAlert } from "@/models";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useHealthCheckQuery } from "@/queries/health-check.queries";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useUsersQuery } from "@/queries/user.queries";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  RefreshCw,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  ALERT_CATALOG,
  ALERT_RESOLVE_PATH,
  SEVERITY_CONFIG,
  SEVERITY_ORDER,
} from "./constants/monitoring.constants";

export function MonitoringPage() {
  const {
    data: alerts,
    isLoading,
    refetch,
    isFetching,
  } = useHealthCheckQuery();

  return (
    <div className="size-full overflow-y-auto space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Estado del Sistema</h1>
          <p className="text-sm text-muted-foreground">
            Datos incompletos o inconsistentes que requieren atención
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </section>

      {isLoading && <SkeletonPage />}

      {!isLoading && alerts?.length === 0 && <EmptyState />}

      {!isLoading && !!alerts?.length && (
        <>
          <SummaryRow alerts={alerts} />
          <AlertDetailList alerts={alerts} />
        </>
      )}
    </div>
  );
}

function SummaryRow({ alerts }: { alerts: THealthAlert[] }) {
  const counts: Record<TAlertSeverity, number> = {
    CRITICA: 0,
    ALTA: 0,
    MEDIA: 0,
    BAJA: 0,
  };
  for (const a of alerts) counts[a.severity]++;

  const cards = [
    { label: "Total", value: alerts.length, className: "text-foreground" },
    { label: "Críticas", value: counts.CRITICA, className: "text-destructive" },
    { label: "Altas", value: counts.ALTA, className: "text-orange-500" },
    {
      label: "Medias",
      value: counts.MEDIA,
      className: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(({ label, value, className }) => (
        <Card key={label}>
          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <p className={`text-3xl font-bold ${className}`}>{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AlertDetailList({ alerts }: { alerts: THealthAlert[] }) {
  const grouped = SEVERITY_ORDER.reduce<Record<TAlertSeverity, THealthAlert[]>>(
    (acc, sev) => {
      acc[sev] = alerts.filter((a) => a.severity === sev);
      return acc;
    },
    { CRITICA: [], ALTA: [], MEDIA: [], BAJA: [] },
  );

  return (
    <div className="flex flex-col gap-8">
      {SEVERITY_ORDER.filter((sev) => grouped[sev].length > 0).map((sev) => (
        <section key={sev}>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {SEVERITY_CONFIG[sev].label}
            </p>
            <Badge variant={SEVERITY_CONFIG[sev].badgeVariant}>
              {grouped[sev].length}
            </Badge>
          </div>
          <div className="flex flex-col gap-3">
            {grouped[sev].map((alert) => (
              <AlertDetailCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function AlertDetailCard({ alert }: { alert: THealthAlert }) {
  const [showAffected, setShowAffected] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const config = SEVERITY_CONFIG[alert.severity];
  const catalog = ALERT_CATALOG[alert.id];

  const entityLabel =
    alert.entity === "Family" || alert.entity === "Balance"
      ? "familias"
      : "usuarios";

  return (
    <Card className={`border ${config.rowClass}`}>
      <CardContent className="pt-4 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <AlertTriangle className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  {alert.id}
                </span>
                <Badge variant={config.badgeVariant}>{config.label}</Badge>
                <span className="text-xs text-muted-foreground">
                  {alert.entity}
                </span>
              </div>
              <p className="text-sm font-medium mt-1">{alert.description}</p>
            </div>
          </div>
          <Badge variant={config.badgeVariant} className="shrink-0">
            {alert.count} afectado{alert.count !== 1 ? "s" : ""}
          </Badge>
        </div>

        {catalog && (
          <>
            <Separator />
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-muted-foreground"
                onClick={() => setShowDetail((v) => !v)}
              >
                <Info className="size-3.5" />
                {showDetail
                  ? "Ocultar detalle"
                  : "Ver qué significa y cómo resolverlo"}
                {showDetail ? (
                  <ChevronUp className="size-3.5" />
                ) : (
                  <ChevronDown className="size-3.5" />
                )}
              </Button>

              {showDetail && (
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="flex gap-2">
                    <Info className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        ¿Qué significa?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {catalog.explanation}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Wrench className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        ¿Cómo resolverlo?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {catalog.action}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <Separator />
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-muted-foreground"
            onClick={() => setShowAffected((v) => !v)}
          >
            <Users className="size-3.5" />
            {showAffected
              ? "Ocultar"
              : `Ver ${alert.count} ${entityLabel} afectado${alert.count !== 1 ? "s" : ""}`}
            {showAffected ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
          </Button>

          {showAffected && <AffectedList alert={alert} />}
        </div>
      </CardContent>
    </Card>
  );
}

function AffectedList({ alert }: { alert: THealthAlert }) {
  const { data: users } = useUsersQuery();
  const { data: families } = useFamiliesQuery();
  const { data: ramas } = useRamasQuery();

  const isFamilyEntity =
    alert.entity === "Family" || alert.entity === "Balance";

  if (isFamilyEntity) {
    const rows = alert.affectedIds.map((id) => {
      const family =
        alert.entity === "Balance"
          ? families?.find((f) => f.id_balance === id)
          : families?.find((f) => f.id === id);
      const rama = ramas?.find((r) => r.id === family?.manage_by);
      return {
        id,
        familyId: family?.id ?? id,
        name: family?.name ?? "—",
        rama: rama?.name ?? "Sin rama",
        members: family?.users?.length ?? 0,
      };
    });

    return (
      <div className="mt-3 rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                Familia
              </th>
              <th className="text-left px-3 py-2 font-medium text-muted-foreground">
                Rama
              </th>
              <th className="text-right px-3 py-2 font-medium text-muted-foreground">
                Miembros
              </th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-0 hover:bg-muted/30"
              >
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{row.rama}</td>
                <td className="px-3 py-2 text-right text-muted-foreground">
                  {row.members}
                </td>
                <td className="px-3 py-2 text-right">
                  <Link to={`/family/${row.familyId}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
                    >
                      Resolver
                      <ArrowRight className="size-3" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // User / UserRamaHistory
  const resolvePath = ALERT_RESOLVE_PATH[alert.id] ?? "/users";
  const rows = alert.affectedIds.map((id) => {
    const user = users?.find((u) => u.id === id);
    const rama = ramas?.find((r) => r.id === user?.id_rama);
    const family = families?.find((f) => f.id === user?.id_family);
    return {
      id,
      name: user ? `${user.name} ${user.last_name}` : "—",
      rama: rama?.name ?? "Sin rama",
      family: family?.name ?? "Sin familia",
      active: user?.is_active ?? false,
    };
  });

  return (
    <div className="mt-3 rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left px-3 py-2 font-medium text-muted-foreground">
              Nombre completo
            </th>
            <th className="text-left px-3 py-2 font-medium text-muted-foreground">
              Rama
            </th>
            <th className="text-left px-3 py-2 font-medium text-muted-foreground">
              Familia
            </th>
            <th className="text-left px-3 py-2 font-medium text-muted-foreground">
              Estado
            </th>
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b last:border-0 hover:bg-muted/30"
            >
              <td className="px-3 py-2 font-medium">{row.name}</td>
              <td className="px-3 py-2 text-muted-foreground">{row.rama}</td>
              <td className="px-3 py-2 text-muted-foreground">{row.family}</td>
              <td className="px-3 py-2">
                <StatusBadge active={row.active} />
              </td>
              <td className="px-3 py-2 text-right">
                <Link to={resolvePath}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
                  >
                    Resolver
                    <ArrowRight className="size-3" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <Badge
      variant="secondary"
      className="text-xs text-green-600 bg-green-50 border-green-200"
    >
      Activo
    </Badge>
  ) : (
    <Badge variant="secondary" className="text-xs">
      Inactivo
    </Badge>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
      <CheckCircle2 className="size-12 text-green-500" />
      <p className="text-lg font-medium text-foreground">Todo en orden</p>
      <p className="text-sm">
        No se detectaron datos incompletos ni inconsistentes.
      </p>
    </div>
  );
}

function SkeletonPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}
