import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
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
  const { users } = useAppSelector((s) => s.users);
  const { families } = useAppSelector((s) => s.family);
  const { currentCuota } = useAppSelector((s) => s.cuota);

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
      amount: `${families.length}`,
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
    <Card className="w-2xs">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="  md:text-3xl text-2xl font-semibold  ">
          {amount}
        </CardTitle>
        <CardAction>
          {path ? (
            <Link to={path}>
              <Badge
                variant="outline"
                className="hover:bg-primary hover:text-white transition-all duration-200"
              >
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
