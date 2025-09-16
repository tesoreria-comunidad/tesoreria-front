import { useState } from "react";
import { CreatFamilyAside } from "./components/CreateFamilyAside";
import { FamilyTable } from "./components/table/FamilyTable";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FamilyPage() {
  const { families } = useAppSelector((s) => s.family);
  const [search, setSearch] = useState("");

  const filteredFamilies = families.filter((family) =>
    family.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="size-full overflow-y-hidden   space-y-4">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative md:w-72">
            <Input
              placeholder="Buscar familia por nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background pl-10" // added padding-left for icon
            />
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 size-5" />
          </div>

          <span className="text-gray-600 text-sm">
            ({filteredFamilies.length} resultados)
          </span>
        </div>
        <CreatFamilyAside />
      </section>
      <section className="overflow-y-auto  max-h-[95%]">
        <FamilyTable families={filteredFamilies} />
      </section>
    </div>
  );
}
