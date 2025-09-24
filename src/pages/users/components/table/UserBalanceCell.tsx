import { familyAdapter } from "@/adapters";
import BalanceCard from "@/components/common/BalanceCard";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import type { TFamily, TUser } from "@/models";
import { useFamiliesQuery } from "@/queries/family.queries";
import { FamilyServices } from "@/services/family.service";
import { useEffect, useState } from "react";

export function UserBalanceCell({ user }: { user: TUser }) {
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
  return (
    <div>
      <BalanceCard balanceValue={family?.balance.value || 0} />
    </div>
  );
}
