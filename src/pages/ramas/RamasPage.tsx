import { Label } from "@/components/ui/label";
import { RamasTable } from "./components/table/RamasTable";
import { CreateRamaAside } from "./components/CreateRamaAside";
import { useMobile } from "@/context/MobileContext";
import { RamasListMobile } from "./components/RamasListMobile";
import { useRamasQuery } from "@/queries/ramas.queries";

export function RamasPage() {
  const { isMobile } = useMobile();
  const { data: ramas } = useRamasQuery();
  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Ramas</Label>
        <CreateRamaAside />
      </section>
      {isMobile ? <RamasListMobile ramas={ramas ?? []} /> : <RamasTable />}
    </div>
  );
}
