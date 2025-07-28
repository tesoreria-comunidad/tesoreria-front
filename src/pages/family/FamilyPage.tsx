import { Label } from "@radix-ui/react-label";
import { CreatFamilyAside } from "./components/CreateFamilyAside";

export function FamilyPage() {
  return (
    <div className="flex items-center justify-between">
      <Label>Familias</Label>
      <CreatFamilyAside />
    </div>
  );
}
