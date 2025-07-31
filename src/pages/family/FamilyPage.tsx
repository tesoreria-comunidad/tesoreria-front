import { Label } from "@radix-ui/react-label";
import { CreatFamilyAside } from "./components/CreateFamilyAside";
import { FamilyTable } from "./components/table/FamilyTable";

export function FamilyPage() {
  return (
    <div className="size-full  overflow-y-auto space-y-4 ">
      <section className="flex items-center justify-between">
        <Label>Familias</Label>
        <CreatFamilyAside />
      </section>
      <FamilyTable />
    </div>
  );
}
