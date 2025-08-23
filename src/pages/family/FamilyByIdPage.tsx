import { balanceAdapter, familyAdapter } from "@/adapters";
import { useTransactionsQueries } from "@/queries/transactions.queries";
import { BalanceServices } from "@/services/balance.service";
import { FamilyServices } from "@/services/family.service";
import { setBalance } from "@/store/features/balance/balanceSlice";
import { setFamily } from "@/store/features/family/familySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useEffect, useState } from "react";
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
import { UploadTransactionAside } from "./components/UploadTransactionAside";
import { PageLoader } from "@/components/common/PageLoader";

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
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector((state) => state.balance);
  const { family } = useAppSelector((state) => state.family);
  const [loading, setLoading] = useState(false);
  const { fetchFamilyTransactions } = useTransactionsQueries();
  useEffect(() => {
    if (family && family.id === familyId) return;
    const fetchData = async () => {
      setLoading(true);
      await fetchFamilyTransactions(familyId!);
      const familyData = await FamilyServices.getById(familyId!);
      dispatch(setFamily(familyAdapter(familyData)));

      const balanceData = await BalanceServices.getById(familyData.id_balance);
      dispatch(setBalance(balanceAdapter(balanceData)));
      setLoading(false);
    };
    fetchData();
  }, [familyId]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className=" mx-auto flex flex-col items-center gap-8">
      <Card className="w-1/2 ">
        <CardHeader>
          <CardDescription>
            Balance Familia <strong>{family?.name}</strong>
          </CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-3xl flex ">
            {balance && <BalanceCard balanceValue={balance?.value} />}
          </CardTitle>
          <CardAction>
            <UploadTransactionAside family_id={family?.id} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Balance actual de la familia
          </div>
        </CardFooter>
      </Card>
      <FamilyTransactionsTable />
    </div>
  );
}
