import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditIcon } from "lucide-react";
import { EditUserForm } from "./forms/EditUserForm";
import type { TUser } from "@/models";

type EditUserAsideProps = {
  user: TUser;
};

export function EditUserAside({ user }: EditUserAsideProps) {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="flex items-center gap-2">
            <EditIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Usuario {user?.name}</SheetTitle>
            <SheetDescription>
              Selecciona el campo que quieres editar
            </SheetDescription>
            <br />
            <EditUserForm user={user} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
