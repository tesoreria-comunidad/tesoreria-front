import type { TUser } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserQueries } from "@/queries/user.queries";
import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { ArrowBigDown, ArrowBigUp, UserCircle } from "lucide-react";
export function UserStatusUpdateDialog({ user }: { user: TUser }) {
  const [loading, setLoading] = useState(false);
  const { editUser } = useUserQueries();
  const { showAlert } = useAlert();
  const submitChanges = async () => {
    try {
      setLoading(true);

      await editUser(
        {
          is_active: !user.is_active,
        },
        user.id
      );
      showAlert({
        title: `Usuario dado de ${
          user.is_active ? "baja" : "alta"
        } exitosamente`,
        description: "",
        type: "success",
      });
    } catch (error) {
      showAlert({
        title: "Hubo un error al dar de baja el usuario",
        description: "Vuelva a intentarlo mas tarde",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
          isLoading={loading}
          variant={user.is_active ? "destructive" : "default"}
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
