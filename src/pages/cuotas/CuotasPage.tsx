import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { CreateRamaAside } from "./components/CreateRamaAside";
import { formatCurrency } from "@/utils";
import CuotasTable from "./components/table/CuotasTable";

export function CuotasPage() {
  const { currentCuota } = useAppSelector((s) => s.cuota);

  return (
    <div className="size-full   overflow-y-auto   ">
      <section className="flex items-center justify-between  h-[5%]">
        <Label className="text-xl">Cuota</Label>
        <CreateRamaAside />
      </section>
      <section className=" h-[95%] flex flex-col gap-4">
        <section className="flex">
          {currentCuota && (
            <div className=" p-6 flex flex-col items-center justify-center   border border-gray-200  mx-auto aspect-video  gap-2">
              <span className="text-3xl">
                {formatCurrency(currentCuota.cuota_amount)}
              </span>
              <div className="bg-green-200 text-green-600 p-1 px-4 rounded-md text-sm">
                actual
              </div>
            </div>
          )}
        </section>
        <CuotasTable />
      </section>
    </div>
  );
}
