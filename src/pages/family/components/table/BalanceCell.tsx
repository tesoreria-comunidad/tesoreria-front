import { balanceAdapter } from "@/adapters";
import BalanceCard from "@/components/common/BalanceCard";
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

  const [balance, setBalance] = useState<TBalance | undefined>(undefined);
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
        console.log("Balance fetched:", balanceAdapter(res));
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
    return <div>Loading...</div>;
  }

  if (!balance) return <div>No balance found</div>;

  return <BalanceCard balanceValue={balance.value} />;
}
