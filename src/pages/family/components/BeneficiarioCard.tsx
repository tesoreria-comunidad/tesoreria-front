import type { TUser } from "@/models";
import { RamaCell } from "@/pages/users/components/table/RamaCell";

export function BenefriciarioCard({ user }: { user: TUser }) {
  const fullName = `${user.name}, ${user.last_name}`;
  return (
    <div className="flex-1 bg-accent rounded p-1">
      <section className="flex items-center gap-4">
        <div className="flex-1">
          <span className=" font-medium">
            {fullName ?? "Usuario desconocido"}
          </span>
        </div>
      </section>

      <section className="space-y-2">
        {user?.phone && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Teléfono</span>
            <span>{user.phone}</span>
          </div>
        )}

        {user?.address && (
          <div className="flex items-start justify-between text-sm">
            <span className="text-muted-foreground">Dirección</span>
            <span className="text-right">{user.address}</span>
          </div>
        )}

        <section className="flex items-center gap-2 text-sm">
          <div
            className={`flex-1  rounded flex items-center justify-center ${
              user.is_active
                ? "bg-green-200 text-green-600"
                : "bg-red-200 text-red-600"
            } `}
          >
            {user.is_active ? "alta" : "baja"}
          </div>

          <div
            className={`flex-1 rounded flex items-center justify-center ${
              user.is_granted ? "bg-orange-200 text-orange-600" : "-"
            } `}
          >
            {user.is_granted ? "BECA" : ""}
          </div>
        </section>

        <div className="flex text-sm">
          {user.id_rama && <RamaCell id_rama={user.id_rama} />}
        </div>
      </section>
    </div>
  );
}
