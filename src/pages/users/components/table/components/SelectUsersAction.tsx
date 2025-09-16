import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { TUser } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/store/hooks";
import { useUserQueries } from "@/queries/user.queries";
import { useAlert } from "@/context/AlertContext";

type UserAction = "dar_baja" | "becar" | "modificar_rama";

export function SelectUsersAction({ users }: { users: TUser[] }) {
  const [selectedAction, setSelectedAction] = useState<UserAction | null>(null);
  const [rama, setRama] = useState<string | null>(null);
  const { inmutableRamas } = useAppSelector((s) => s.ramas);
  const [loading, setLoading] = useState(false);

  const { editUser } = useUserQueries();
  const { showAlert } = useAlert();
  const submitAction = async () => {
    try {
      setLoading(true);
      if (selectedAction === "dar_baja") {
        const promises = users.map((u) => editUser({ is_active: false }, u.id));
        await Promise.all(promises);
      }
      if (selectedAction === "becar") {
        const promises = users.map((u) => editUser({ is_granted: true }, u.id));
        await Promise.all(promises);
      }
      if (selectedAction === "modificar_rama") {
        const promises = users.map((u) => editUser({ id_rama: rama }, u.id));
        await Promise.all(promises);
      }

      showAlert({
        title: "Acción realizada",
        description: `La acción "${selectedAction}" se ha aplicado a ${users.length} usuarios.`,
        type: "success",
      });
    } catch (error) {
      console.error("Error performing user action:", error);
      showAlert({
        title: "Error",
        description:
          "Ocurrió un error al realizar la acción. Inténtalo de nuevo.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Acciones
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[50vw] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Acciones en {users.length} usuarios</DialogTitle>
            <DialogDescription>
              Selecciona la acción que deseas realizar sobre los usuarios
              seleccionados.
            </DialogDescription>
          </DialogHeader>

          {/* Selector de acción */}
          <RadioGroup
            className="space-y-3"
            onValueChange={(val) => setSelectedAction(val as UserAction)}
            value={selectedAction ?? ""}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dar_baja" id="dar_baja" />
              <Label htmlFor="dar_baja">Dar de baja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="becar" id="becar" />
              <Label htmlFor="becar">Becar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="modificar_rama" id="modificar_rama" />
              <Label htmlFor="modificar_rama">Modificar rama</Label>
            </div>
          </RadioGroup>

          {/* Render condicional según la acción */}
          <div className="mt-4 ">
            {selectedAction === "dar_baja" && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-center">
                  ⚠️ Se dará de baja a <strong>{users.length}</strong> usuarios
                  seleccionados.
                </p>
                <DialogDescription className="text-center">
                  Con esta acción el/los beneficiario será/n dado/s de baja. Sus
                  datos permanecerán disponibles en caso que se desee dar de
                  alta nuevamente.
                </DialogDescription>
                <br />
                <DialogDescription>
                  Al darlo/s de baja este/os beneficiario/s no generará mas
                  deuda en su balance.
                </DialogDescription>
              </div>
            )}

            {selectedAction === "becar" && (
              <div>
                <p className="text-sm  text-center">
                  🎓 Se becarán <strong>{users.length}</strong> usuarios
                  seleccionados.
                </p>
                <DialogDescription className="text-center">
                  Con esta acción se aplicará una beca completa sobre el/los
                  usuarios seleccionado/s. Esto significa que no se le generará
                  ninguna deuda futura.
                </DialogDescription>
              </div>
            )}

            {selectedAction === "modificar_rama" && (
              <div className="flex flex-col gap-2">
                <Label>Nueva Rama</Label>
                <Select onValueChange={(val) => setRama(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una rama" />
                  </SelectTrigger>
                  <SelectContent>
                    {inmutableRamas.map((rama) => (
                      <SelectItem key={rama.id} value={rama.id.toString()}>
                        {rama.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={
                !selectedAction ||
                (selectedAction === "modificar_rama" && !rama)
              }
              onClick={submitAction}
              isLoading={loading}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
