import type { TUser } from "@/models";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function getInitials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserCard({ user }: { user: TUser }) {
  const created = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : undefined;

  const fullName = `${user.name}, ${user.last_name}`;
  return (
    <Card className="flex-1">
      <CardHeader className="flex items-center gap-4">
        <Avatar className="w-14 h-14">
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">
              {fullName ?? "Usuario desconocido"}
            </span>
            {user?.role && <Badge variant="secondary">{user.role}</Badge>}
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            {user?.email ?? "Sin email"}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
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

        {created && (
          <>
            <Separator />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Creado</span>
              <span>{created}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
