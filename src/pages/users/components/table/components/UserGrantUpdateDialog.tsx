import type { TUser } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserQueries } from "@/queries/user.queries";
import { useAlert } from "@/context/AlertContext";
import { HeartHandshake, UserCircle } from "lucide-react";
export function UserGrantUpdateDialog({ user }: { user: TUser }) {
  const [loading, setLoading] = useState(false);
  const { editUser } = useUserQueries();
  const { showAlert } = useAlert();
  const submitChanges = async () => {
    try {
      setLoading(true);
      await editUser(
        {
          is_granted: !user.is_granted,
        },
        user.id
      );
      showAlert({
        title: "Usuario modificado exitosamente",
        description: user.is_granted
          ? `Se quitó la beca sobre ${user.last_name}, ${user.name}`
          : `Se asignó una beca sobre ${user.last_name}, ${user.name}`,
        type: "success",
      });
    } catch (error) {
      showAlert({
        title: "Hubo un error becar el usuario ",
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
          <HeartHandshake /> {user.is_granted ? "Quitar Beca" : "Asignar Beca"}
        </DialogTitle>
        <div className="flex items-center gap-2 my-2">
          <UserCircle />
          <p>
            {user.last_name}, {user.name}
          </p>
        </div>
        <DialogDescription>
          Con esta acción{" "}
          {user.is_granted ? (
            <>
              {" "}
              <strong>se quitará la beca</strong> sobre el usuario seleccionado
            </>
          ) : (
            "el beneficiario seleccionado será becado completamente."
          )}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button onClick={submitChanges} isLoading={loading}>
          Confimrar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
