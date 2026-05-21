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
import { EditRamaDialog } from "./components/EditRamaDialog";
import { Badge } from "@/components/ui/badge";
import { GRUPO_LABELS } from "@/config/ramas.config";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { data: ramas } = useRamasQuery();
  const { data: users } = useUsersQuery();
  const rama = ramas?.find((r) => r.id === ramaId);

  if (!rama) return null;

  const userRama = users?.filter((user) => user.id_rama === rama.id);
  const dirigentes = userRama
    ?.filter((user) => user.id_rama === rama.id)
    .filter((u) => u.role === "DIRIGENTE" || u.role === "MASTER" );
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <section className="flex items-center justify-between flex-none flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <Label className="text-xl">{rama.name}</Label>
          <Badge variant="secondary">{GRUPO_LABELS[rama.grupo]}</Badge>
          <Badge variant="outline">Pos. {rama.orden}</Badge>
          {(rama.edad_min != null || rama.edad_max != null) && (
            <span className="text-sm text-muted-foreground">
              {rama.edad_min ?? "?"}&ndash;{rama.edad_max ?? "?"} años
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <EditRamaDialog rama={rama} />
          {rama.users.length === 0 ? (
            <UserBulkUploader id_rama={rama.id} />
          ) : (
            <AddUserAside rama={rama} />
          )}
        </div>
      </section>
      <section className="flex-1 overflow-auto">
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
