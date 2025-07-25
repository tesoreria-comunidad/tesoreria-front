import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateMasterUserForm } from "./forms/CreateMasterUserForm";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";

export function CreateMasterUserAside() {
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
          <CreateMasterUserForm />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
