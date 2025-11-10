import { useParams } from "react-router";
import { UsersTable } from "../users/components/table/UsersTable";
import { Label } from "@radix-ui/react-label";
import { EmptyPage } from "@/components/common/EmptyPage";
import { UserBulkUploader } from "./components/UsersBulkUploader";
import { AddUserAside } from "./components/AddUserAside";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useUsersQuery } from "@/queries/user.queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCard } from "./components/UserCard";
import { EmptyData } from "@/components/common/EmptyData";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { data: ramas } = useRamasQuery();
  const { data: users } = useUsersQuery();
  const rama = ramas?.find((r) => r.id === ramaId);

  if (!rama) return null;

  const userRama = users?.filter((user) => user.id_rama === rama.id);
  const dirigentes = userRama
    ?.filter((user) => user.id_rama === rama.id)
    .filter((u) => u.role === "DIRIGENTE");
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
        <Card>
          <CardHeader>
            <CardTitle>Dirigentes</CardTitle>
          </CardHeader>
          <CardContent>
            <section>
              {dirigentes?.length ? (
                <section className="flex gap-2 overflow-x-auto md:grid md:grid-cols-4 md:gap-2 md:overflow-visible py-2">
                  {dirigentes?.map((u) => (
                    <div key={u.id} className="flex-shrink-0 w-72 md:w-auto snap-start">
                      <UserCard user={u} />
                    </div>
                  ))}
                </section>
              ) : (
                <EmptyData
                  text={`No hay dirigentes cargados para la rama ${rama.name}`}
                />
              )}
            </section>
          </CardContent>
        </Card>
        {rama.users.length ? (
          <UsersTable
            usersInput={users?.filter(
              (user) => user.id_rama === rama.id && user.role === "BENEFICIARIO"
            )}
            ramaId={rama.id}
          />
        ) : (
          <EmptyPage />
        )}
      </section>
    </div>
  );
}
