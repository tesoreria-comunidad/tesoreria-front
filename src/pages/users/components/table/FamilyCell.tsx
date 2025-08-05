import { useAppSelector } from "@/store/hooks";

export function FamilyCell({ id_family }: { id_family: string }) {
  const { families } = useAppSelector((s) => s.family);
  const family = families.find((f) => f.id === id_family);

  if (!family) return <>-</>;
  return <div>{family.name}</div>;
}
