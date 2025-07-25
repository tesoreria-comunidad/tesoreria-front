import { Label } from "@/components/ui/label";
import { UsersTable } from "./components/table/UsersTable";
import { CreateMasterUserAside } from "./components/CreateMasterUserAside";

export function UsersPage() {
  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label>Usuarios</Label>
        <CreateMasterUserAside />
      </section>
      <UsersTable />
    </div>
  );
}
