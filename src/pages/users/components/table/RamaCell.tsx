import { useAppSelector } from "@/store/hooks";

export default function RamaCell({ ramaId }: { ramaId: string }) {
  const { ramas } = useAppSelector((s) => s.ramas);
  const rama = ramas.find((r) => r.id === ramaId);
  if (!rama) return "-";
  return <div>{rama.name}</div>;
}
