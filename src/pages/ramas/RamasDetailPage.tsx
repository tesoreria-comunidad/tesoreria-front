import { useAppSelector } from "@/store/hooks";
import { useParams } from "react-router";
import { UsersTable } from "../users/components/table/UsersTable";
import { BulkPersonUploader } from "../persons/components/BulkPersonUploader";
import { Label } from "@radix-ui/react-label";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { inmutableRamas } = useAppSelector((s) => s.ramas);
  const rama = inmutableRamas.find((r) => r.id === ramaId);

  if (!rama) return null;
  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label>{rama.name}</Label>
        <BulkPersonUploader id_rama={rama.id} />
      </section>
      <UsersTable usersInput={rama.users} />
    </div>
  );
}
