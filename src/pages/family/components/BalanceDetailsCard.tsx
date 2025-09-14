import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TBalance, TFamily } from "@/models";
import { UpdateFamilyDialog } from "./UpdateFamilyDialog";
import BalanceCard from "@/components/common/BalanceCard";

export function BalanceDetailsCard({
  balance,
  family,
  viewOnly,
}: {
  family: TFamily;
  balance: TBalance;
  viewOnly?: boolean;
}) {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardDescription>
          Balance Familia <strong>{family?.name}</strong>
        </CardDescription>
        <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-3xl flex ">
          {balance && <BalanceCard balanceValue={balance?.value} />}
        </CardTitle>
        {!viewOnly && (
          <CardAction>
            <UpdateFamilyDialog family={family} balance={balance!} />
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
