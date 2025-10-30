import { useState } from "react";
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
import { useMobile } from "@/context/MobileContext";

export function UploadTransactionAside({
  family,
  balance,
  size = "md",
}: {
  family: TFamily;
  balance: TBalance;
  size?: "sm" | "md" | "lg";
}) {
  const { isMobile } = useMobile();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <UploadCloudIcon />
          {size !== "sm" && <span>Cargar Pago</span>}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={
          isMobile ? "h-[90dvh] rounded-t-2xl p-4 overflow-y-auto" : ""
        }
      >
        <SheetHeader>
          <SheetTitle>Cargar Pago</SheetTitle>
          <SheetDescription>
            Cargar pago de cuota para la familia {family.name}
          </SheetDescription>
        </SheetHeader>

        <div className="pt-4 h-full ">
          <CuotaPaymentForm
            family={family}
            balance={balance}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
