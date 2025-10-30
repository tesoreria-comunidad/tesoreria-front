import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersIcon, UploadCloudIcon } from "lucide-react";
import type { TRama } from "@/models";
import { useNavigate } from "react-router";
import { useCobrabilidadByRamaQuery } from "@/queries/cobrabilidad.queries";
import { LoaderSpinner } from "@/components/common/LoaderSpinner";

export function RamasListMobile({ ramas }: { ramas: TRama[] }) {
  const navigate = useNavigate();

  if (!ramas?.length)
    return (
      <p className="text-center text-muted-foreground py-6">
        No hay ramas registradas.
      </p>
    );

  return (
    <div className="flex flex-col gap-4 pb-24">
      {ramas.map((rama) => (
        <RamaCard key={rama.id} rama={rama} onClick={() => navigate(`/ramas/${rama.id}`)} />
      ))}
    </div>
  );
}

function RamaCard({
  rama,
  onClick,
}: {
  rama: TRama;
  onClick: () => void;
}) {
  const { data, isLoading } = useCobrabilidadByRamaQuery(
    {
      month: (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
    },
    rama.id
  );

  const cobrabilidad = data?.cobrabilidad ?? 0;

  return (
    <Card
      className="rounded-xl shadow-sm border-border/40 bg-card/50"
      onClick={onClick}
    >
      <CardHeader className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
        <h3 className="text-lg font-semibold">{rama.name}</h3>

        {/* Beneficiarios */}
        <p className="text-sm text-muted-foreground flex justify-between">
          <span>Beneficiarios:</span>
          <span className="text-foreground font-medium">
            {rama.users.filter((u) => u.role === "BENEFICIARIO").length}
          </span>
        </p>

        {/* Cobrabilidad */}
        <p className="text-sm text-muted-foreground flex justify-between">
          <span>Cobrabilidad:</span>
          {isLoading ? (
            <span className="bg-orange-200 text-orange-600 px-2 py-0.5 rounded-md text-xs flex items-center gap-1">
              <LoaderSpinner size="sm" /> Cargando...
            </span>
          ) : (
            <span
              className={`font-semibold ${
                cobrabilidad > 0 ? "text-orange-600" : "text-muted-foreground"
              }`}
            >
              {cobrabilidad.toFixed(2)}%
            </span>
          )}
        </p>
      </CardHeader>

      <CardContent className="p-3 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={onClick}
        >
          <UsersIcon size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
        >
          <UploadCloudIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}
