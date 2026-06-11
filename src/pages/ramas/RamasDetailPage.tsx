import { useState } from "react";
import { useParams } from "react-router";
import { UsersTable } from "../users/components/table/UsersTable";
import { Label } from "@radix-ui/react-label";
import { EmptyPage } from "@/components/common/EmptyPage";
import { UserBulkUploader } from "./components/UsersBulkUploader";
import { AddUserAside } from "./components/AddUserAside";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useUsersQuery } from "@/queries/user.queries";
import { useFamiliesQuery } from "@/queries/family.queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCard } from "./components/UserCard";
import { EmptyData } from "@/components/common/EmptyData";
import { EditRamaDialog } from "./components/EditRamaDialog";
import { Badge } from "@/components/ui/badge";
import { GRUPO_LABELS } from "@/config/ramas.config";
import { formatCurrency } from "@/utils";
import { ChevronDown } from "lucide-react";

export default function RamasDetailPage() {
  const { ramaId } = useParams();
  const { data: ramas } = useRamasQuery();
  const { data: users } = useUsersQuery();
  const { data: families } = useFamiliesQuery();
  const rama = ramas?.find((r) => r.id === ramaId);

  if (!rama) return null;

  const userRama = users?.filter((user) => user.id_rama === rama.id);
  const dirigentes = userRama
    ?.filter((user) => user.id_rama === rama.id)
    .filter((u) => u.role === "DIRIGENTE" || u.role === "MASTER" );

  const ramaFamilies = families?.filter((f) => f.manage_by === rama.id) ?? [];
  const totalBalance = ramaFamilies.reduce((sum, f) => sum + f.balance.value, 0);
  const isDebt = totalBalance < 0;
  const [showDetail, setShowDetail] = useState(false);

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
      {families && (
        <Card className="flex-none">
          <CardContent className="py-3 px-4">
            <div className={`flex items-center justify-between font-semibold ${isDebt ? "text-red-600" : "text-green-600"}`}>
              <span className="text-base">Balance total de la rama</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{formatCurrency(totalBalance)}</span>
                {ramaFamilies.length > 0 && (
                  <button
                    onClick={() => setShowDetail((v) => !v)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${showDetail ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
            </div>
            {showDetail && (
              <div className="divide-y text-sm mt-2">
                {ramaFamilies.map((f) => (
                  <div key={f.id} className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">{f.name}</span>
                    <span className={f.balance.value < 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                      {formatCurrency(f.balance.value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
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
