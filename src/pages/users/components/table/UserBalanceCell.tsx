import { familyAdapter } from "@/adapters";
import BalanceCard from "@/components/common/BalanceCard";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { Badge } from "@/components/ui/badge";
import type { TFamily, TUser } from "@/models";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useRamasQuery } from "@/queries/ramas.queries";
import { FamilyServices } from "@/services/family.service";
import { useEffect, useState } from "react";

export function UserBalanceCell({
  user,
  ramaId,
}: {
  user: TUser;
  ramaId?: string;
}) {
  const { data: ramas } = useRamasQuery();
  const { data: families } = useFamiliesQuery();
  if (!user.id_family) return "-";

  const familyStore = families?.find((f) => f.id === user.id_family);
  const [family, setFamily] = useState<TFamily>();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (familyStore) {
      setFamily(familyStore);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await FamilyServices.getById(user.id_family as string);

        setFamily(familyAdapter(res));
      } catch (error) {
        console.log("Error fetching family details: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <LoaderSpinner />;

  if (ramaId && family?.manage_by !== ramaId) {
    const rama = ramas?.find((r) => r.id === family?.manage_by);
    return (
      <TooltipComponent text={`Balance administrado por ${rama?.name}`}>
        <Badge className="bg-sky-200 text-sky-900 cursor-pointer">
          {rama?.name}
        </Badge>
      </TooltipComponent>
    );
  }
  return (
    <div>
      <BalanceCard balanceValue={family?.balance.value || 0} />
    </div>
  );
}
