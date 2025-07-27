import { useAppSelector } from "@/store/hooks";
import { useParams } from "react-router";
import { UsersTable } from "../users/components/table/UsersTable";
import { BulkPersonUploader } from "../persons/components/BulkPersonUploader";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { inmutableRamas } = useAppSelector((s) => s.ramas);
  const rama = inmutableRamas.find((r) => r.id === ramaId);

  if (!rama) return null;
  return (
    <div>
      <BulkPersonUploader id_rama={rama.id} />
      <br />
      <UsersTable usersInput={rama.users} />
    </div>
  );
}
