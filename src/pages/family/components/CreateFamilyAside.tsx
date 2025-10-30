import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRoundPlus } from "lucide-react";
import { CreateFamilyForm } from "./forms/CreateFamilyForm";
import { useMobile } from "@/context/MobileContext";

export function CreatFamilyAside() {
  const { isMobile } = useMobile();
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <UserRoundPlus />
          {!isMobile && <span>Crear familia</span>}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear familia</SheetTitle>
          <SheetDescription>
            Cargar los datos para crear la familia
          </SheetDescription>
          <br />
          <CreateFamilyForm />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
