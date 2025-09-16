import { familyAdapter } from "@/adapters";
import BalanceCard from "@/components/common/BalanceCard";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import type { TFamily, TUser } from "@/models";
import { FamilyServices } from "@/services/family.service";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export function UserBalanceCell({ user }: { user: TUser }) {
  const { inmutableFamilies } = useAppSelector((s) => s.family);
  if (!user.id_family) return "-";

  const familyStore = inmutableFamilies.find((f) => f.id === user.id_family);
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
  return (
    <div>
      <BalanceCard balanceValue={family?.balance.value || 0} />
    </div>
  );
}
