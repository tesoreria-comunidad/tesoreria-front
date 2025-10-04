import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TFamily } from "@/models";
import { UpdateFamilyDialog } from "./UpdateFamilyDialog";
import { useBalanceByIdQuery } from "@/queries/balance.queries";
import { useRamasByIdQuery } from "@/queries/ramas.queries";
import { UploadTransactionAside } from "./UploadTransactionAside";
import { formatCurrency } from "@/utils";
interface BalanceCardProps {
  balanceValue: number;
}

function BalanceCard({ balanceValue }: BalanceCardProps) {
  const isPositive = balanceValue >= 0;

  return (
    <div
      className={` p-1  text-3xl font-light max-md:text-lg rounded-md px-3 ${
        isPositive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
      }`}
    >
      {formatCurrency(balanceValue)}
    </div>
  );
}
export function BalanceDetailsCard({
  family,
  viewOnly,
}: {
  family: TFamily;
  viewOnly?: boolean;
}) {
  const { data: balanceData } = useBalanceByIdQuery(family.id_balance);
  const { data: rama } = useRamasByIdQuery(family.manage_by);
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardDescription>
          Balance Familia <strong>{family?.name}</strong>
        </CardDescription>
        <CardTitle className=" flex ">
          {balanceData && <BalanceCard balanceValue={balanceData?.value} />}
        </CardTitle>
        {!viewOnly && (
          <CardAction className="flex items-center gap-2">
            <UpdateFamilyDialog
              family={family}
              id_balance={family.id_balance}
            />
            <UploadTransactionAside family={family} balance={balanceData!} />
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground ">
          Balance actual de la familia adminstrado por{" "}
          <strong>{rama?.name || "N/A"}</strong>
        </div>
      </CardFooter>
    </Card>
  );
}
