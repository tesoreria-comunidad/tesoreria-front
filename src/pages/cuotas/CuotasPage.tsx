import { Label } from "@/components/ui/label";
import { CreateCuotaAside } from "./components/CreateCuotaAside";
import { formatCurrency } from "@/utils";
import CuotasTable from "./components/table/CuotasTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormatedDate } from "@/components/common/FormatedDate";
import { UpdateBalanceButton } from "./components/UpdateBalanceButton";
import { CuotasPorHermanoAside } from "./components/CuotasPorHermanoAside";
import { useCuotasQuery } from "@/queries/cuota.queries";
import { CuotasPorHermanoForm } from "./components/form/CuotasPorHermanoForm";
import { useCPHQuery } from "@/queries/cuotaPorHermano.queries";
import CPHCard from "./components/CPHCard";

export function CuotasPage() {
  const { data: cuotas } = useCuotasQuery();
  const currentCuota = cuotas?.find((c) => c.is_active);
  const { data: cuotasPorHemano } = useCPHQuery();
  return (
    <div className="size-full   overflow-y-auto space-y-4   ">
      <section className="flex max-md:flex-col md:items-center justify-between gap-4 h-[5%]">
        <Label className="text-xl">Cuota</Label>
        <div className="flex items-center gap-2 max-md:justify-around ">
          <CreateCuotaAside />
          <UpdateBalanceButton />
          <CuotasPorHermanoAside />
        </div>
      </section>
      <section className=" h-[95%]  flex gap-4">
        <div className="flex flex-col gap-4 w-2/3">
          <section className="flex">
            {currentCuota && (
              <div className=" mx-auto ">
                <Card>
                  <CardHeader>
                    <CardDescription>Cuota</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      <span className="text-3xl">
                        {formatCurrency(currentCuota.value)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground flex gap-1">
                      Desde: <FormatedDate date={currentCuota.createdAt} />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
          </section>
          <CuotasTable />
        </div>

        <Card className=" flex flex-col gap-3 flex-1">
          <CardHeader>
            <CardTitle>Cuotas segun hermano</CardTitle>
            <CardDescription>Cuota</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {cuotasPorHemano?.map((cph) => (
                  <CPHCard cph={cph} key={cph.id} />
                ))}
              </div>
            </div>
            <div className="p-4 border border-accent rounded-md bg-accent/25">
              <CuotasPorHermanoForm />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
