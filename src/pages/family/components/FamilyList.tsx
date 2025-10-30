import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TFamily } from "@/models";
import { RamaCell } from "@/pages/users/components/table/RamaCell";
import BalanceCell from "./table/BalanceCell";
export function FamilyList({ families }: { families: TFamily[] }) {
  return (
    <div className="flex flex-col gap-4 ">
      {families.map((family) => (
        <FamilyCard family={family} />
      ))}
    </div>
  );
}

function FamilyCard({ family }: { family: TFamily }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{family.name}</CardTitle>
        <CardDescription>
          <span>Beneficiarios: {family.users.length}</span>
          <p className="flex items-center gap-2">
            Administrado por <RamaCell id_rama={family.manage_by} />
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 flex justify-end gap-2">
        <BalanceCell family={family} />
      </CardContent>
    </Card>
  );
}
