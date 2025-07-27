import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { CreateRamaForm } from "./form/CreateRamaForm";
export function CreateRamaAside() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <Plus />
          Crear rama
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" h-full ">
          <SheetTitle>Crear Rama Nueva</SheetTitle>
          <section className="flex-1 ">
            <CreateRamaForm />
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
