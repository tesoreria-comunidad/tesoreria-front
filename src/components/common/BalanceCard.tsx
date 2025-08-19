import { formatCurrency } from "@/utils";
import { Badge } from "../ui/badge";

interface BalanceCardProps {
  balanceValue: number;
}

export default function BalanceCard({ balanceValue }: BalanceCardProps) {
  const isPositive = balanceValue >= 0;

  return (
    <Badge
      className={`${
        isPositive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
      }`}
    >
      {formatCurrency(balanceValue)}
    </Badge>
  );
}
