import { useAppSelector } from "@/store/hooks";
import { useParams } from "react-router";
import { UsersTable } from "../users/components/table/UsersTable";
import { Label } from "@radix-ui/react-label";
import { EmptyPage } from "@/components/common/EmptyPage";
import { UserBulkUploader } from "./components/UsersBulkUploader";
import { AddUserAside } from "./components/AddUserAside";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { inmutableRamas } = useAppSelector((s) => s.ramas);
  const rama = inmutableRamas.find((r) => r.id === ramaId);

  if (!rama) return null;
  return (
    <div className="size-full   overflow-y-auto   ">
      <section className="flex items-center justify-between  h-[5%]">
        <Label className="text-xl">{rama.name}</Label>
        {rama.users.length === 0 ? (
          <UserBulkUploader id_rama={rama.id} />
        ) : (
          <AddUserAside rama={rama} />
        )}
      </section>
      <section className=" h-[95%]">
        {rama.users.length ? (
          <UsersTable usersInput={rama.users} />
        ) : (
          <EmptyPage />
        )}
      </section>
    </div>
  );
}
