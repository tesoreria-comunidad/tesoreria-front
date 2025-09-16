import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UploadCloudIcon } from "lucide-react";
import { UploadFile } from "@/pages/transactions/components/form/compoents/UploadFile";

export function UploadTransactionAside({ family_id }: { family_id?: string }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <UploadCloudIcon />
          <span>Cargar Pago</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cargar Pago</SheetTitle>
          <SheetDescription>Cargar comprobante de pago</SheetDescription>
          <br />
          <UploadFile family_id={family_id} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
