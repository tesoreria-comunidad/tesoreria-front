import type { TRama } from "@/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useCobrabilidadQuery } from "@/queries/cobrabilidad.queries";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";

export function CobrabilidadCell({ rama }: { rama: TRama }) {
  const { data, isLoading } = useCobrabilidadQuery({
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  });

  const ramaId = rama.id;

  const cobrabilidadRama = data?.find((e) => e.id_rama === ramaId);
  const cobrabilidad =
    data?.find((e) => e.id_rama === ramaId)?.cobrabilidad || 0;

  if (isLoading)
    return (
      <div className="flex justify-center bg-orange-200  w-1/4 mx-auto p-1 rounded-md">
        <LoaderSpinner />
      </div>
    );
  if (!data) return "-";
  if (!cobrabilidadRama) return "-";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="uppercase text-center cursor-pointer  bg-orange-200 hover:bg-orange-300 text-orange-600 font-semibold w-1/4 mx-auto p-1 rounded-md hover:p-2 transition-all duration-150">
          {cobrabilidad}%
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Info /> Detalle de calculo de cobrabilidad
          </DialogTitle>

          <DialogDescription>
            Acá se detalla cómo se calculó la cobrabilidad de esta rama y los
            valores utilizados.
          </DialogDescription>
          <DialogDescription>
            Fórmula: (Cobrado / Total Espado a cobrar ) * 100
          </DialogDescription>
          <Separator />

          <section className="flex flex-col gap-4 py-4">
            <Label className="text-md">Rama: {rama.name}</Label>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2  p-2 rounded-md bg-accent">
                <div className="flex justify-between items-center ">
                  <span> Total espeardo a cobrar</span>
                  <span>
                    {" "}
                    {formatCurrency(cobrabilidadRama?.totalEsperado)}
                  </span>
                </div>
                <DialogDescription>
                  Este valor es el monto total esperado a cobrar de cada familia
                  que es administrada por la rama {rama.name}
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-2  p-2 rounded-md bg-accent">
                <div className="flex justify-between items-center ">
                  <span> Total cobrado este mes</span>
                  <span> {formatCurrency(cobrabilidadRama.totalCobrado)}</span>
                </div>
                <DialogDescription>
                  Este valor se obtiene de la suma de los pagos de cada familia
                  administrada por esta rama ({rama.name}) durante este mes.
                </DialogDescription>
              </div>
            </div>
          </section>
          <section className="flex justify-end py-4">
            <Label className="text-md">
              Resultado: {cobrabilidad.toFixed(2)}%
            </Label>
          </section>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
