import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { TCreateTransaction } from "@/models/transaction.schema";
import { formatCurrency } from "@/utils";

export function CuotaUploadInformation({
  values,
}: {
  values: TCreateTransaction;
}) {
  return (
    <Card className="h-full border-border/5 shadow">
      <CardHeader>
        <Label className="text-lg">Resumen del Pago a Cargar</Label>
        <CardDescription>
          Revisa que la información sea correcta antes de cargar el pago.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="flex justify-between">
            <Label className="font-medium">Monto</Label>{" "}
            <Label>{formatCurrency(values.amount)}</Label>
          </p>
          <p className="flex justify-between">
            <Label className="font-medium">Fecha</Label>{" "}
            <Label> {new Date(values.payment_date).toLocaleDateString()}</Label>
          </p>
          <p className="flex justify-between">
            <Label className="font-medium">Método de pago</Label>{" "}
            <Label> {values.payment_method}</Label>
          </p>
          <p className="flex justify-between">
            <Label className="font-medium">Concepto</Label>{" "}
            <Label> {values.concept || "-"}</Label>
          </p>
          <p className="flex justify-between">
            <Label className="font-medium">Descripción</Label>{" "}
            <Label> {values.description || "-"}</Label>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
