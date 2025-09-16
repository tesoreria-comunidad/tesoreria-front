import type { TPaymentMethod } from "@/constants/transactions.constatns";
import { Badge } from "../ui/badge";
import { Banknote, Landmark } from "lucide-react";
import type { ReactElement } from "react";

interface PaymentMethodBadgeProps {
  method: TPaymentMethod;
}
export function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  const Config: Record<
    TPaymentMethod,
    { Icon: ReactElement; className: string }
  > = {
    EFECTIVO: {
      Icon: <Banknote className="size-4" />,
      className: "bg-purple-200 text-purple-600",
    },
    TRANSFERENCIA: {
      Icon: <Landmark className="size-4" />,
      className: "bg-blue-200 text-blue-600",
    },
  };

  const { Icon, className } = Config[method];
  return (
    <Badge className={className}>
      <div className="flex items-center gap-2">
        {Icon}
        <span>{method}</span>
      </div>
    </Badge>
  );
}
