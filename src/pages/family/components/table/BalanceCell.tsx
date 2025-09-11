import { balanceAdapter } from "@/adapters";
import BalanceCard from "@/components/common/BalanceCard";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import type { TBalance } from "@/models";
import { BalanceServices } from "@/services/balance.service";
import { addBalance } from "@/store/features/balance/balanceSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface BalanceCellProps {
  id_balance: string;
}
export default function BalanceCell({ id_balance }: BalanceCellProps) {
  const { inmutableBalances } = useAppSelector((s) => s.balance);
  const dispatch = useAppDispatch();

  const [balance, setBalance] = useState<TBalance>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchBalance = async () => {
      if (inmutableBalances.find((b) => b.id === id_balance)) {
        setBalance(inmutableBalances.find((b) => b.id === id_balance));
        return;
      }

      try {
        setLoading(true);
        const res = await BalanceServices.getById(id_balance);
        setBalance(balanceAdapter(res));
        dispatch(addBalance(balanceAdapter(res)));
      } catch (error) {
        console.log("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [id_balance]);

  if (loading) {
    return (
      <div className="px-2">
        <LoaderSpinner />
      </div>
    );
  }

  if (!balance) return "-";
  return <BalanceCard balanceValue={balance.value} />;
}
