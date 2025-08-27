import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditIcon } from "lucide-react";
import { EditUserForm } from "./forms/EditUserForm";
import { useAppSelector } from "@/store/hooks";

export function EditUserAside() {
  const { user } = useAppSelector((s) => s.session);

  return (
    <div>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <EditIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Usuario ${user?.name}</SheetTitle>
          <SheetDescription>
            Selecciona el campo que quieres editar
          </SheetDescription>
          <br />
          <EditUserForm />
        </SheetHeader>
      </SheetContent>
    </div>
  );
}
