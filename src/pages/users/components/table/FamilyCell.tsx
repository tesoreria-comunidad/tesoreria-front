import { useFamiliesQuery } from "@/queries/family.queries";
import { Navigation } from "lucide-react";
import { Link } from "react-router";
export function FamilyCell({ id_family }: { id_family: string }) {
  const { data: families } = useFamiliesQuery();
  const family = families?.find((f) => f.id === id_family);

  if (!family) return <>-</>;
  return (
    <div>
      <Link
        to={`/family/${id_family}`}
        className="hover:underline flex items-center gap-1"
      >
        <Navigation className="size-4" />
        <p className=""> {family.name}</p>
      </Link>
    </div>
  );
}
