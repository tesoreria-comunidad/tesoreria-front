import { LoaderSpinner } from "@/components/common/LoaderSpinner";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { Badge } from "@/components/ui/badge";
import type { TUser } from "@/models";
import BalanceCell from "@/pages/family/components/table/BalanceCell";
import { useFamiliesQuery, useFamilyByIdQuery } from "@/queries/family.queries";
import { useRamasQuery } from "@/queries/ramas.queries";

export function UserBalanceCell({
  user,
  ramaId,
}: {
  user: TUser;
  ramaId?: string;
}) {
  const { data: ramas } = useRamasQuery();
  // La lista de familias ya está cacheada (la usa también FamilyCell): se reusa
  // para resolver la familia sin disparar una request por cada fila.
  const { data: families, isLoading: loadingFamilies } = useFamiliesQuery();
  const familyFromList = user.id_family
    ? families?.find((f) => f.id === user.id_family)
    : undefined;

  // Fallback: sólo se busca individualmente si la familia no está en el listado
  // (caso borde: familia administrada por otra rama, fuera del listado del DIRIGENTE).
  const needsIndividualFetch = !!user.id_family && !familyFromList;
  const { data: fetchedFamily, isLoading: loadingFamily } = useFamilyByIdQuery(
    user.id_family ?? "",
    needsIndividualFetch
  );

  const family = familyFromList ?? fetchedFamily;

  if (!user.id_family) return "-";

  if (loadingFamilies || (needsIndividualFetch && loadingFamily))
    return <LoaderSpinner />;

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
