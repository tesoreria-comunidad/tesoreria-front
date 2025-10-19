import { Button } from "@/components/ui/button";
import { Calculator, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CPHCard from "./CPHCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CuotasPorHermanoForm } from "./form/CuotasPorHermanoForm";
import { Label } from "@/components/ui/label";
import { useCPHQuery } from "@/queries/cuotaPorHermano.queries";

export function CuotasPorHermanoAside() {
  const { data: cuotasPorHemano } = useCPHQuery();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"secondary"}>
                  <Calculator />
                  <Users />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cuotas por Hermano</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Crear Cuota por Hermano</SheetTitle>
            <SheetDescription>
              Ingrese la información de la cuota según el esquema definido.
            </SheetDescription>
          </SheetHeader>
          <section className="p-4 flex flex-col gap-6 ">
            <div className="flex flex-col gap-4">
              <span>Cuotas Por hermanos</span>

              <div className="flex flex-col gap-2">
                {cuotasPorHemano?.map((cph) => (
                  <CPHCard cph={cph} key={cph.id} />
                ))}
              </div>
            </div>
            <Separator />
            <section className=" flex flex-col gap-3">
              <Label>Crear nuevo valor de cuota por hermano</Label>
              <div className="p-4 border border-accent rounded-md bg-accent/25">
                <CuotasPorHermanoForm />
              </div>
            </section>
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
}
