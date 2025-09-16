import { Label } from "@/components/ui/label";
import { RamasTable } from "./components/table/RamasTable";
import { CreateRamaAside } from "./components/CreateRamaAside";

export function RamasPage() {
  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Ramas</Label>
        <CreateRamaAside />
      </section>
      <RamasTable />
    </div>
  );
}
