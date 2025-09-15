import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { TUser } from "@/models";

interface UserEditSheetProps {
  user: TUser;
}

export function UserEditSheet({ user }: UserEditSheetProps) {
  return (
    <div>
      <Sheet>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Usuario</SheetTitle>
          </SheetHeader>

          {/* Acá ponés tu formulario de edición */}
          <form className="space-y-4 mt-4">
            <input
              type="text"
              defaultValue={user.name}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              defaultValue={user.last_name}
              className="w-full border rounded p-2"
            />

            <Button type="submit">Guardar Cambios</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
