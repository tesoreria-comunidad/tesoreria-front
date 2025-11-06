import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { CreateCuotaForm } from "./form/CreateCuotaForm";
export function CreateCuotaAside() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={"secondary"}
          className="max-md:flex max-md:flex-col max-md:gap-2"
        >
          <Plus />
          Nueva Cuota
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" h-full ">
          <SheetTitle>Crear Cuota Nueva</SheetTitle>
          <section className="flex-1 ">
            <CreateCuotaForm />
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
