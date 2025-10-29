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
  size = "md",
}: {
  family: TFamily;
  balance: TBalance;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-2">
          <UploadCloudIcon />
          {size !== "sm" && <span>Cargar Pago</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader className="p-4 pb-2">
          <SheetTitle>Cargar Pago</SheetTitle>
          <SheetDescription>Cargar pago de cuota</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          <CuotaPaymentForm family={family} balance={balance} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
