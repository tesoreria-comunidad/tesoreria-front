import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { CreateUserForm } from "./forms/CreateUserForm";

export function CreateUserAside() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <UserRoundPlus />
          <span>Crear usuario</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear nuevo usario</SheetTitle>
          <SheetDescription>
            Cargar los datos para crear un usuario nuevo
          </SheetDescription>
          <br />
          <CreateUserForm />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
