import { Label } from "@/components/ui/label";
import { UsersTable } from "./components/table/UsersTable";
import { CreateUserAside } from "./components/CreateUserAside";

export function UsersPage() {
  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Usuarios</Label>
        <CreateUserAside />
      </section>
      <UsersTable />
    </div>
  );
}
