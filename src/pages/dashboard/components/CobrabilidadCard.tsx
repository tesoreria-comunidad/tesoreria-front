import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCobrabilidadResumenQuery } from "@/queries/cobrabilidad.queries";
import { formatCurrency } from "@/utils";

function getSemaforoClass(cobrabilidad: number): string {
  if (cobrabilidad >= 85) return "text-green-600";
  if (cobrabilidad >= 60) return "text-yellow-500";
  return "text-red-600";
}

function getSemaforoLabel(cobrabilidad: number): string {
  if (cobrabilidad >= 85) return "Buena";
  if (cobrabilidad >= 60) return "Regular";
  return "Baja";
}

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface CobrabilidadCardProps {
  month: number;
  year: number;
}

export function CobrabilidadCard({ month, year }: CobrabilidadCardProps) {
  const { data, isLoading, isError } = useCobrabilidadResumenQuery(month, year);

  if (isLoading) {
    return (
      <Card className="md:w-full">
        <CardHeader>
          <CardDescription>Cobrabilidad del mes</CardDescription>
          <Skeleton className="h-9 w-24 mt-1" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
        </CardFooter>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="md:w-full">
        <CardHeader>
          <CardDescription>Cobrabilidad del mes</CardDescription>
          <CardTitle className="md:text-3xl text-2xl font-semibold text-destructive">
            Error
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            No se pudo cargar el dato de cobrabilidad.
          </div>
        </CardFooter>
      </Card>
    );
  }

  const colorClass = getSemaforoClass(data.cobrabilidad);
  const label = getSemaforoLabel(data.cobrabilidad);
  const monthName = MONTH_NAMES[month - 1];

  return (
    <Card className="md:w-full">
      <CardHeader>
        <CardDescription>Cobrabilidad del mes</CardDescription>
        <CardTitle
          className={`md:text-3xl text-2xl font-semibold ${colorClass}`}
        >
          {data.cobrabilidad.toFixed(1)}%
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {monthName} {year} — {label}
        </div>
        <div className="text-muted-foreground">
          Cobrado: {formatCurrency(data.totalCobrado)} / Esperado:{" "}
          {formatCurrency(data.totalEsperado)}
        </div>
      </CardFooter>
    </Card>
  );
}
