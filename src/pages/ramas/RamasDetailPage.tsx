import { useAppSelector } from "@/store/hooks";
import { useParams } from "react-router";
import { UsersTable } from "../users/components/table/UsersTable";
import { Label } from "@radix-ui/react-label";
import { EmptyPage } from "@/components/common/EmptyPage";
import { UserBulkUploader } from "./components/UsersBulkUploader";
import { AddUserAside } from "./components/AddUserAside";
import { useRamasQuery } from "@/queries/ramas.queries";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { data: ramas } = useRamasQuery();
  const { users } = useAppSelector((s) => s.users);
  const rama = ramas?.find((r) => r.id === ramaId);

  if (!rama) return null;
  return (
    <div className="size-full   overflow-y-auto flex flex-col gap-4">
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
          <UsersTable
            usersInput={users.filter((user) => user.id_rama === rama.id)}
          />
        ) : (
          <EmptyPage />
        )}
      </section>
    </div>
  );
}
