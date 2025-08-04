import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { CreateTransactionForm } from "./form/CreateTransactionForm";
export function CreateTransactionAside() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <Plus />
          Movimiento
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" h-full ">
          <SheetTitle>Crear Cuota Nueva</SheetTitle>
          <section className="flex-1 ">
            <CreateTransactionForm />
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
