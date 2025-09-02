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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersSelector } from "./UsersSelector";
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

          <Tabs defaultValue="usuarios" className="size-full p-2">
            <TabsList>
              <TabsTrigger value="usuarios">Usuarios existentes</TabsTrigger>
              <TabsTrigger value="ramas">Crear Usuario Nuevo</TabsTrigger>
            </TabsList>
            <br />
            <TabsContent value="usuarios" className="max-h-[80vh] ">
              <UsersSelector rama={rama} />
            </TabsContent>
            <TabsContent value="ramas">
              <CreateUserForm />
            </TabsContent>
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
