import type { TUser } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { ArrowRightLeft, UserCircle } from "lucide-react";
import { useState } from "react";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useUpdateUserRamaMutation } from "@/queries/user.queries";
import { useAlert } from "@/context/AlertContext";
import { GRUPO_LABELS, getGroupRamasForTransfer } from "@/config/ramas.config";
import axios from "axios";

interface UserRamaTransferDialogProps {
  user: TUser;
}

export function UserRamaTransferDialog({ user }: UserRamaTransferDialogProps) {
  const [selectedRamaId, setSelectedRamaId] = useState<string>("");
  const { data: ramas } = useRamasQuery();
  const { mutate, isPending } = useUpdateUserRamaMutation();
  const { showAlert } = useAlert();

  const currentRama = ramas?.find((r) => r.id === user.id_rama) ?? null;

  const { adyacentes, otrasDelGrupo } = currentRama
    ? getGroupRamasForTransfer(currentRama, ramas ?? [])
    : { adyacentes: [], otrasDelGrupo: [] };

  const todasLasOpciones = [...adyacentes, ...otrasDelGrupo];
  const selectedRamaName = todasLasOpciones.find((r) => r.id === selectedRamaId)?.name;

  const handleConfirm = () => {
    if (!selectedRamaId) return;

    mutate(
      { userId: user.id, id_rama: selectedRamaId },
      {
        onSuccess() {
          showAlert({
            title: "Traspaso exitoso",
            description: `${user.last_name}, ${user.name} fue trasladado/a a ${selectedRamaName}.`,
            type: "success",
          });
          setSelectedRamaId("");
        },
        onError(err) {
          const serverMessage =
            axios.isAxiosError(err) && err.response?.data?.message
              ? Array.isArray(err.response.data.message)
                ? err.response.data.message.join(". ")
                : String(err.response.data.message)
              : "Ocurrió un error al realizar el traspaso. Intentalo de nuevo.";
          showAlert({
            title: "Error al traspasar",
            description: serverMessage,
            type: "error",
          });
        },
      }
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <ArrowRightLeft />
          Traspasar de rama
        </DialogTitle>
        <div className="flex items-center gap-2 my-2">
          <UserCircle />
          <p>
            {user.last_name}, {user.name}
          </p>
        </div>
        <DialogDescription>
          Seleccioná la rama destino para el traspaso. Se muestran todas las
          ramas del grupo{" "}
          {currentRama && (
            <>
              <strong>{GRUPO_LABELS[currentRama.grupo]}</strong>
              {" — rama actual: "}
              <strong>{currentRama.name}</strong>
            </>
          )}
          .
        </DialogDescription>
      </DialogHeader>

      {todasLasOpciones.length === 0 ? (
        <p className="text-sm text-muted-foreground rounded-md border px-3 py-2">
          Este beneficiario no tiene ramas disponibles para traspaso en su grupo.
        </p>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="rama-destino-transfer">Rama destino</Label>
          <Select value={selectedRamaId} onValueChange={setSelectedRamaId}>
            <SelectTrigger id="rama-destino-transfer">
              <SelectValue placeholder="Seleccioná una rama" />
            </SelectTrigger>
            <SelectContent>
              {adyacentes.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Adyacentes</SelectLabel>
                  {adyacentes.map((rama) => (
                    <SelectItem key={rama.id} value={rama.id}>
                      {rama.name}
                      {rama.orden < (currentRama?.orden ?? 0) && " ← anterior"}
                      {rama.orden > (currentRama?.orden ?? 0) && " → siguiente"}
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
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedRamaId && (
        <p className="text-sm text-muted-foreground rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 px-3 py-2">
          Se trasladará a <strong>{user.last_name}, {user.name}</strong> a la
          rama <strong>{selectedRamaName}</strong>. Esta acción quedará
          registrada en el log de auditoría.
        </p>
      )}

      <DialogFooter>
        <Button
          onClick={handleConfirm}
          disabled={!selectedRamaId || todasLasOpciones.length === 0}
          isLoading={isPending}
        >
          Confirmar traspaso
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
