import { Label } from "@/components/ui/label";
import { CreateRamaAside } from "./components/CreateRamaAside";
import { formatCurrency } from "@/utils";
import CuotasTable from "./components/table/CuotasTable";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormatedDate } from "@/components/common/FormatedDate";
import { UpdateBalanceButton } from "./components/UpdateBalanceButton";
import { CuotasPorHermanoAside } from "./components/CuotasPorHermanoAside";
import { useCuotasQuery } from "@/queries/cuota.queries";

export function CuotasPage() {
  const { data: cuotas } = useCuotasQuery();
  const currentCuota = cuotas?.find((c) => c.is_active);
  return (
    <div className="size-full   overflow-y-auto   ">
      <section className="flex items-center justify-between  h-[5%]">
        <Label className="text-xl">Cuota</Label>
        <div className="flex items-center gap-2">
          <CreateRamaAside />
          <UpdateBalanceButton />
          <CuotasPorHermanoAside />
        </div>
      </section>
      <section className=" h-[95%] flex flex-col gap-4">
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
      </section>
    </div>
  );
}
