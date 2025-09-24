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
import BalanceCard from "@/components/common/BalanceCard";
import { useBalanceByIdQuery } from "@/queries/balance.queries";

export function BalanceDetailsCard({
  family,
  viewOnly,
}: {
  family: TFamily;
  viewOnly?: boolean;
}) {
  const { data: balanceData } = useBalanceByIdQuery(family.id_balance);
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardDescription>
          Balance Familia <strong>{family?.name}</strong>
        </CardDescription>
        <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-3xl flex ">
          {balanceData && <BalanceCard balanceValue={balanceData?.value} />}
        </CardTitle>
        {!viewOnly && (
          <CardAction>
            <UpdateFamilyDialog
              family={family}
              id_balance={family.id_balance}
            />
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          Balance actual de la familia
        </div>
      </CardFooter>
    </Card>
  );
}
