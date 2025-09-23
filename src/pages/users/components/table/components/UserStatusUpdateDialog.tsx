import type { TUser } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEditUserMutation } from "@/queries/user.queries";

import { useAlert } from "@/context/AlertContext";
import { ArrowBigDown, ArrowBigUp, UserCircle } from "lucide-react";
export function UserStatusUpdateDialog({ user }: { user: TUser }) {
  const { mutate, isPending } = useEditUserMutation();
  const { showAlert } = useAlert();
  const submitChanges = async () => {
    mutate(
      {
        body: { is_active: !user.is_active },
        userId: user.id,
      },
      {
        onSuccess() {
          showAlert({
            title: `Usuario dado de ${
              user.is_active ? "baja" : "alta"
            } exitosamente`,
            description: "",
            type: "success",
          });
        },
        onError() {
          showAlert({
            title: "Hubo un error al dar de baja el usuario",
            description: "Vuelva a intentarlo mas tarde",
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
          {user.is_active ? (
            <>
              <ArrowBigDown /> Nueva Baja
            </>
          ) : (
            <>
              <ArrowBigUp /> Nueva Alta
            </>
          )}
        </DialogTitle>
        <div className="flex items-center gap-2 my-2">
          <UserCircle />
          <p>
            {user.last_name}, {user.name}
          </p>
        </div>
        <DialogDescription>
          Con esta acción el beneficiario será dado de{" "}
          {user.is_active ? "baja" : "alta"}.{" "}
          {user.is_active
            ? ` Sus datos permanecerán disponibles
          en caso que se desee dar de alta nuevamente.`
            : ""}
        </DialogDescription>
        {user.is_active && (
          <DialogDescription>
            Al darlo de baja este beneficiario no generará mas deuda en su
            balance
          </DialogDescription>
        )}
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={submitChanges}
          isLoading={isPending}
          variant={user.is_active ? "destructive" : "default"}
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
