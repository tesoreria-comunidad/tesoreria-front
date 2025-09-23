import { useRamasQuery } from "@/queries/ramas.queries";

export function RamaCell({ id_rama }: { id_rama: string }) {
  const { data: ramas } = useRamasQuery();
  const rama = ramas?.find((r) => r.id === id_rama);
  if (!rama) return "-";
  return <div className="text-center">{rama.name}</div>;
}
