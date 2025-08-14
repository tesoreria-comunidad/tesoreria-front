import { useAppSelector } from "@/store/hooks";

export function RamaCell({ id_rama }: { id_rama: string }) {
  const { ramas } = useAppSelector((s) => s.ramas);
  const rama = ramas.find((r) => r.id === id_rama);
  if (!rama) return "-";
  return <div>{rama.name}</div>;
}
