import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { Badge } from "@/components/ui/badge";
import type { TUser } from "@/models";
import BalanceCell from "@/pages/family/components/table/BalanceCell";
import { useFamilyByIdQuery } from "@/queries/family.queries";
import { useRamasQuery } from "@/queries/ramas.queries";

export function UserBalanceCell({
  user,
  ramaId,
}: {
  user: TUser;
  ramaId?: string;
}) {
  const { data: ramas } = useRamasQuery();
  const { data: family, isLoading: loading } = useFamilyByIdQuery(
    user.id_family!
  );

  if (!user.id_family) return "-";

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

  if (!family) return "-";
  return (
    <div>
      <BalanceCell family={family} />
    </div>
  );
}
