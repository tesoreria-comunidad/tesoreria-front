import { UsersTable } from "../users/components/table/UsersTable";
import { RamasTable } from "../ramas/components/table/RamasTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DashboardCard } from "./components/DashboardCard";
export function DashboardPage() {
  return (
    <div className=" size-full flex flex-col gap-4   ">
      <section className="flex    gap-4">
        <DashboardCard type="users" />
        <DashboardCard type="family" />
        <DashboardCard type="cuota" />
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
