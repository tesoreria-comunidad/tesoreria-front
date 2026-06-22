import type { TUser } from "@/models";
import {
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/queries/user.queries";
import { useAlert } from "@/context/AlertContext";
import { Trash2, UserCircle } from "lucide-react";
import axios from "axios";

export function UserDeleteDialog({
  user,
  onClose,
}: {
  user: TUser;
  onClose: () => void;
}) {
  const { mutate, isPending } = useDeleteUserMutation();
  const { showAlert } = useAlert();

  const handleDelete = () => {
    mutate(user.id, {
      onSuccess() {
        onClose();
        showAlert({
          title: "Usuario eliminado",
          description: `${user.last_name}, ${user.name} fue eliminado permanentemente.`,
          type: "success",
        });
      },
      onError(err) {
        const isAxiosErr = axios.isAxiosError(err);
        const status = isAxiosErr ? err.response?.status : undefined;

        const fallbackMessage =
          "Ocurrió un error al eliminar el usuario. Intentalo de nuevo.";

        const serverMessage =
          isAxiosErr && err.response?.data?.message
            ? Array.isArray(err.response.data.message)
              ? err.response.data.message.join(". ")
              : String(err.response.data.message)
            : fallbackMessage;

        const displayMessage =
          status === 409
            ? "No es posible eliminar a este usuario porque es el único administrador de su familia"
            : serverMessage;

        showAlert({
          title: "Error al eliminar",
          description: displayMessage,
          type: "error",
        });
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Trash2 />
          Eliminar usuario
        </DialogTitle>
        <div className="flex items-center gap-2 my-2">
          <UserCircle />
          <p>
            {user.last_name}, {user.name}
          </p>
        </div>
        <DialogDescription>
          Esta acción es <strong>permanente e irreversible</strong>. El usuario
          será eliminado del sistema junto con todos sus datos asociados.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary" disabled={isPending}>
            Cancelar
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          onClick={handleDelete}
          isLoading={isPending}
        >
          Eliminar permanentemente
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
