import { useTransactionsByFamilyIdQuery } from "@/queries/transactions.queries";

import { useParams } from "react-router";
import FamilyTransactionsTable from "./components/table/FamilyTransactionsTable";

import { PageLoader } from "@/components/common/PageLoader";
import { Label } from "@/components/ui/label";
import { FamilyUsersTable } from "./components/table/FamilyUsers";
import { AddMemberAside } from "./components/aside/AddMemberAside";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useFamiliesQuery } from "@/queries/family.queries";
import { BalanceDetailsCard } from "./components/BalanceDetailsCard";

export default function FamilyByIdPage() {
  const { familyId } = useParams();
  const { data: families } = useFamiliesQuery();
  const { data: ramas } = useRamasQuery();
  const familyTransactionsQuery = useTransactionsByFamilyIdQuery(familyId!);
  const family = families?.find((f) => f.id === familyId);

  if (familyTransactionsQuery.isLoading) {
    return <PageLoader />;
  }

  if (!familyTransactionsQuery.data || !ramas) {
    return null;
  }

  const users = family?.users;

  if (!family) return null;

  return (
    <div className=" mx-auto flex flex-col items-center gap-8">
      <BalanceDetailsCard family={family} />

      <section className="w-full flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <Label>Miembros</Label>
          <AddMemberAside family={family} />
        </div>
        {!users || users?.length === 0 ? (
          <div className="text-gray-600 text-sm">
            No hay miembros en esta familia.
          </div>
        ) : (
          <FamilyUsersTable users={users} />
        )}
      </section>
      <section className="w-full flex flex-col gap-4">
        <Label>Transacciones</Label>
        <FamilyTransactionsTable transactions={familyTransactionsQuery.data} />
      </section>
    </div>
  );
}
