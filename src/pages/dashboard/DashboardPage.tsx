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
import { TrendingUp } from "lucide-react";
import { UsersTable } from "../users/components/table/UsersTable";
import { RamasTable } from "../ramas/components/table/RamasTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function DashboardPage() {
  const { users } = useAppSelector((s) => s.users);
  const { families } = useAppSelector((s) => s.family);
  const { persons } = useAppSelector((s) => s.persons);
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
              <Badge variant="outline">
                <TrendingUp />
                +12.5%
              </Badge>
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
              <Badge variant="outline">
                <TrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Personas</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {persons.length}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
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
