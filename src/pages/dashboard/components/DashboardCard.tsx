import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCuotasQuery } from "@/queries/cuota.queries";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useUsersQuery } from "@/queries/user.queries";
import { formatCurrency } from "@/utils";
import { formatDate } from "@/utils/format-date";
import { Navigation } from "lucide-react";
import { Link } from "react-router";

type TDashboardCard = "users" | "family" | "cuota";
type TDashboardCardData = {
  amount: string;
  title: string;
  descriptcion?: string;
  path?: string;
};
interface DashboardCardProps {
  type: TDashboardCard;
}
export function DashboardCard({ type }: DashboardCardProps) {
  const { data: families } = useFamiliesQuery();
  const { data: cuotas } = useCuotasQuery();
  const currentCuota = cuotas?.find((c) => c.is_active);

  const { data: users } = useUsersQuery();
  if (!users) return null;
  const Config: Record<TDashboardCard, TDashboardCardData> = {
    cuota: {
      amount: currentCuota?.value ? formatCurrency(currentCuota?.value) : "-",
      title: "Cuota Actual",
      descriptcion: `Desde el ${formatDate(
        currentCuota?.createdAt || new Date().toISOString()
      )}.`,
      path: "/cuotas",
    },
    family: {
      amount: `${families?.length}`,
      title: "Familias",
      descriptcion: `Número total de familias.`,
      path: "/family",
    },
    users: {
      amount: `${
        users.filter((u) => u.is_active && u.role === "BENEFICIARIO").length
      }`,
      title: "Beneficiarios Activos",
      descriptcion: `Becados: ${
        users.filter((user) => user.is_granted).length
      }`,
      path: "/users",
    },
  };

  const { amount, title, descriptcion, path } = Config[type];
  return (
    <Card className="md:w-2xs">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="  md:text-3xl text-2xl font-semibold text-primary  ">
          {amount}
        </CardTitle>
        <CardAction>
          {path ? (
            <Link to={path}>
              <Badge>
                <Navigation />
                ver
              </Badge>
            </Link>
          ) : null}
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{descriptcion}</div>
      </CardFooter>
    </Card>
  );
}
