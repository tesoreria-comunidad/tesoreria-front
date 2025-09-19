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
import type { TBalance, TFamily } from "@/models";
import { CuotaPaymentForm } from "./CuotaPaymentForm";

export function UploadTransactionAside({
  family,
  balance,
}: {
  family: TFamily;
  balance: TBalance;
}) {
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
          <SheetDescription>Cargar pago de cuota</SheetDescription>
          <CuotaPaymentForm family={family} balance={balance} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
