import BalanceCard from "@/components/common/BalanceCard";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import type { TFamily } from "@/models";

import { IsCustomCuotaTooltip } from "@/components/common/IsCustomCuotaTooltip";

import { UpdateFamilyDialog } from "../UpdateFamilyDialog";
import { useBalanceByIdQuery } from "@/queries/balance.queries";
import { UploadTransactionAside } from "../UploadTransactionAside";
import { useAppSelector } from "@/store/hooks";

interface BalanceCellProps {
  family: TFamily;
}
export default function BalanceCell({ family }: BalanceCellProps) {
  const { data: balance, isLoading: loading } = useBalanceByIdQuery(
    family.id_balance
  );

  const { user: user } = useAppSelector((s) => s.session);
  const userRole = user?.role;

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

      {userRole &&
        (userRole === "MASTER" ||
          (userRole === "DIRIGENTE" && user.id_rama === family.manage_by)) && (
          <section className="flex items-center gap-1">
            {balance.is_custom_cuota && <IsCustomCuotaTooltip />}
            <UpdateFamilyDialog
              id_balance={family.id_balance}
              family={family}
              viewBalanceData
            />
            <UploadTransactionAside
              family={family}
              balance={balance}
              size="sm"
            />
          </section>
        )}
    </div>
  );
}
