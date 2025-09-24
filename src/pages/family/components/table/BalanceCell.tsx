import BalanceCard from "@/components/common/BalanceCard";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import type { TFamily } from "@/models";

import { IsCustomCuotaTooltip } from "@/components/common/IsCustomCuotaTooltip";

import { UpdateFamilyDialog } from "../UpdateFamilyDialog";
import { useBalanceByIdQuery } from "@/queries/balance.queries";

interface BalanceCellProps {
  id_balance: string;
  family: TFamily;
}
export default function BalanceCell({ id_balance, family }: BalanceCellProps) {
  const { data: balance, isLoading: loading } = useBalanceByIdQuery(id_balance);

  if (loading) {
    return (
      <div className="px-2">
        <LoaderSpinner />
      </div>
    );
  }

  if (!balance) return "-";
  return (
    <div className="flex items-center justify-between  gap-6">
      <BalanceCard balanceValue={balance.value} />
      <section className="flex items-center gap-1">
        {balance.is_custom_cuota && <IsCustomCuotaTooltip />}
        <UpdateFamilyDialog
          id_balance={id_balance}
          family={family}
          viewBalanceData
        />
      </section>
    </div>
  );
}
