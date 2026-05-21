import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, UserCheck } from "lucide-react";
import type { TUser } from "@/models";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useBulkUpdateRamaMutation } from "@/queries/user.queries";
import { useAlert } from "@/context/AlertContext";
import { useAppSelector } from "@/store/hooks";
import { GRUPO_LABELS, getGroupRamasForTransfer } from "@/config/ramas.config";

interface BulkUpdateRamaDialogProps {
  users: TUser[];
  onSuccess?: () => void;
}

export function BulkUpdateRamaDialog({
  users,
  onSuccess,
}: BulkUpdateRamaDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedRamaId, setSelectedRamaId] = useState<string>("");

  const { user: userLogged } = useAppSelector((s) => s.session);
  const { data: ramas } = useRamasQuery();
  const { mutateAsync: bulkUpdateRama, isPending } =
    useBulkUpdateRamaMutation();
  const { showAlert } = useAlert();

  // DIRIGENTE solo ve ramas de su propio grupo; MASTER ve todas
  const userLoggedRama = (ramas ?? []).find((r) => r.id === userLogged?.id_rama) ?? null;
  const availableRamas =
    userLogged?.role === "MASTER"
      ? ramas ?? []
      : (ramas ?? []).filter((r) => r.grupo === userLoggedRama?.grupo);

  // Si todos los usuarios seleccionados comparten la misma rama actual,
  // podemos mostrar "adyacentes" vs "mismo grupo" igual que el diálogo individual.
  // Si vienen de ramas distintas, agrupamos por SCOUTS / GUIAS.
  const uniqueRamaIds = [...new Set(users.map((u) => u.id_rama).filter(Boolean))];
  const commonRama =
    uniqueRamaIds.length === 1
      ? availableRamas.find((r) => r.id === uniqueRamaIds[0]) ?? null
      : null;

  const { adyacentes, otrasDelGrupo } = commonRama
    ? getGroupRamasForTransfer(commonRama, availableRamas)
    : { adyacentes: [], otrasDelGrupo: [] };

  const ramasScouts = !commonRama
    ? availableRamas.filter((r) => r.grupo === "SCOUTS").sort((a, b) => a.orden - b.orden)
    : [];
  const ramasGuias = !commonRama
    ? availableRamas.filter((r) => r.grupo === "GUIAS").sort((a, b) => a.orden - b.orden)
    : [];

  const handleConfirm = async () => {
    if (!selectedRamaId) return;

    try {
      const result = await bulkUpdateRama({
        user_ids: users.map((u) => u.id),
        id_rama_destino: selectedRamaId,
      });

      showAlert({
        title: "Cambio de rama exitoso",
        description: `${result.updated_count} beneficiario${result.updated_count !== 1 ? "s" : ""} movido${result.updated_count !== 1 ? "s" : ""} a la nueva rama.`,
        type: "success",
      });

      setOpen(false);
      setSelectedRamaId("");
      onSuccess?.();
    } catch (err) {
      const serverMessage =
        axios.isAxiosError(err) && err.response?.data?.message
          ? Array.isArray(err.response.data.message)
            ? err.response.data.message.join(". ")
            : String(err.response.data.message)
          : "Ocurrió un error al mover los beneficiarios. Intentalo de nuevo.";
      showAlert({
        title: "Error al cambiar de rama",
        description: serverMessage,
        type: "error",
      });
    }
  };

  const selectedRamaName = availableRamas.find((r) => r.id === selectedRamaId)?.name;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowRightLeft className="size-4" />
          Mover de rama
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="size-5" />
            Cambio masivo de rama
          </DialogTitle>
          <DialogDescription>
            Seleccioná la rama destino para los <strong>{users.length}</strong>{" "}
            beneficiario
            {users.length !== 1 ? "s" : ""} seleccionado
            {users.length !== 1 ? "s" : ""}.
          </DialogDescription>
        </DialogHeader>

        {/* Lista de beneficiarios seleccionados */}
        <div className="space-y-2">
          <Label>Beneficiarios a mover</Label>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto rounded-md border p-2">
            {users.map((u) => (
              <Badge
                key={u.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <UserCheck className="size-3" />
                {u.last_name}, {u.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Selector de rama destino */}
        <div className="space-y-2">
          <Label htmlFor="rama-destino">Rama destino</Label>
          <Select value={selectedRamaId} onValueChange={setSelectedRamaId}>
            <SelectTrigger id="rama-destino">
              <SelectValue placeholder="Seleccioná una rama" />
            </SelectTrigger>
            <SelectContent>
              {commonRama ? (
                <>
                  {adyacentes.length > 0 && (
                    <SelectGroup>
                      <SelectLabel>Adyacentes</SelectLabel>
                      {adyacentes.map((rama) => (
                        <SelectItem key={rama.id} value={rama.id}>
                          {rama.name}
                          {rama.orden < commonRama.orden && " ← anterior"}
                          {rama.orden > commonRama.orden && " → siguiente"}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  {otrasDelGrupo.length > 0 && (
                    <SelectGroup>
                      <SelectLabel>Mismo grupo</SelectLabel>
                      {otrasDelGrupo.map((rama) => (
                        <SelectItem key={rama.id} value={rama.id}>
                          {rama.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </>
              ) : (
                <>
                  {ramasScouts.length > 0 && (
                    <SelectGroup>
                      <SelectLabel>{GRUPO_LABELS.SCOUTS}</SelectLabel>
                      {ramasScouts.map((rama) => (
                        <SelectItem key={rama.id} value={rama.id}>
                          {rama.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  {ramasGuias.length > 0 && (
                    <SelectGroup>
                      <SelectLabel>{GRUPO_LABELS.GUIAS}</SelectLabel>
                      {ramasGuias.map((rama) => (
                        <SelectItem key={rama.id} value={rama.id}>
                          {rama.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Mensaje de confirmación */}
        {selectedRamaId && (
          <p className="text-sm text-muted-foreground rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 px-3 py-2">
            Se moverán <strong>{users.length}</strong> beneficiario
            {users.length !== 1 ? "s" : ""} a la rama{" "}
            <strong>{selectedRamaName}</strong>. Esta acción quedará registrada
            en el log de auditoría.
          </p>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="secondary" disabled={isPending}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleConfirm}
            disabled={!selectedRamaId}
            isLoading={isPending}
          >
            Confirmar cambio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
