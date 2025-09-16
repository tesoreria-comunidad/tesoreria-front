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
import type { TRama } from "@/models";
import { CreateUserForm } from "@/pages/users/components/forms/CreateUserForm";
interface IAddUserAsideProps {
  rama: TRama;
}
export function AddUserAside({ rama }: IAddUserAsideProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <UserRoundPlus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar usuarios a la {rama.name}</SheetTitle>
          <SheetDescription>
            Selecciona todos los usuarios que quieras agregar a la {rama.name}
          </SheetDescription>

          <br />

          <div>
            <CreateUserForm />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
