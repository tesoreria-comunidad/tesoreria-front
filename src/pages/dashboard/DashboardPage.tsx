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
import { Navigation } from "lucide-react";
import { UsersTable } from "../users/components/table/UsersTable";
import { RamasTable } from "../ramas/components/table/RamasTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/utils";
import { FormatedDate } from "@/components/common/FormatedDate";
import { Link } from "react-router";
export function DashboardPage() {
  const { users } = useAppSelector((s) => s.users);
  const { families } = useAppSelector((s) => s.family);
  const { currentCuota } = useAppSelector((s) => s.cuota);
  return (
    <div className=" size-full flex flex-col gap-4   ">
      <section className="flex gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Beneficiarios</CardDescription>
            <CardTitle className="  md:text-3xl text-2xl font-semibold  ">
              {users.length}
            </CardTitle>
            <CardAction>
              <Link to={"/users"}>
                <Badge
                  variant="outline"
                  className="hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Navigation />
                  ver
                </Badge>
              </Link>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Cada beneficiario es un user
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Familias</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {families.length}
            </CardTitle>
            <CardAction>
              <Link to={"/family"}>
                <Badge variant="outline">
                  <Navigation />
                  ver
                </Badge>
              </Link>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {currentCuota?.value && (
          <Card>
            <CardHeader>
              <CardDescription>Cuota</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatCurrency(currentCuota?.value)}
              </CardTitle>
              <CardAction>
                <Link to={"/cuotas"}>
                  <Badge
                    variant="outline"
                    className="hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <Navigation />
                    ver
                  </Badge>
                </Link>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-muted-foreground flex gap-1">
                Desde: <FormatedDate date={currentCuota.createdAt} />
              </div>
            </CardFooter>
          </Card>
        )}
      </section>

      <section className=" flex-1 w-full  p-4 bg-white rounded-2xl">
        <Tabs defaultValue="usuarios" className="size-full">
          <TabsList>
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="ramas">Ramas</TabsTrigger>
          </TabsList>
          <TabsContent value="usuarios">
            <UsersTable />
          </TabsContent>
          <TabsContent value="ramas">
            <RamasTable />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
