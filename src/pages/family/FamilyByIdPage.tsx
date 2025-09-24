import { useTransactionsByFamilyIdQuery } from "@/queries/transactions.queries";

import { useParams } from "react-router";
import FamilyTransactionsTable from "./components/table/FamilyTransactionsTable";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils";
import { PageLoader } from "@/components/common/PageLoader";
import { Label } from "@/components/ui/label";
import { FamilyUsersTable } from "./components/table/FamilyUsers";
import { AddMemberAside } from "./components/aside/AddMemberAside";
import { UpdateFamilyDialog } from "./components/UpdateFamilyDialog";
import { UploadTransactionAside } from "./components/UploadTransactionAside";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useFamiliesQuery } from "@/queries/family.queries";

interface BalanceCardProps {
  balanceValue: number;
}

function BalanceCard({ balanceValue }: BalanceCardProps) {
  const isPositive = balanceValue >= 0;

  return (
    <div
      className={` p-1  rounded-md px-3 ${
        isPositive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
      }`}
    >
      {formatCurrency(balanceValue)}
    </div>
  );
}
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
  const rama = ramas.find((r) => r.id === family?.manage_by);

  if (!family) return null;

  return (
    <div className=" mx-auto flex flex-col items-center gap-8">
      <Card className="w-1/2 ">
        <CardHeader>
          <CardDescription>
            Balance Familia <strong>{family?.name}</strong>
          </CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-3xl flex ">
            {family.balance && (
              <BalanceCard balanceValue={family.balance?.value} />
            )}
          </CardTitle>
          <CardAction className="flex items-center gap-2">
            <UpdateFamilyDialog
              family={family}
              id_balance={family.id_balance}
            />
            <UploadTransactionAside family={family} balance={family.balance!} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground ">
            Balance actual de la familia adminstrado por{" "}
            <strong>{rama?.name || "N/A"}</strong>
          </div>
        </CardFooter>
      </Card>
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
