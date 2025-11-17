import { UsersTable } from "./components/table/UsersTable";
import { CreateUserAside } from "./components/CreateUserAside";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useUsersQuery } from "@/queries/user.queries";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";

export function UsersPage() {
  const { data: users } = useUsersQuery();
  const [search, setSearch] = useState("");
  const { user: userLogged } = useAppSelector((s) => s.session);

  const filteredUsers =
    userLogged?.role === "MASTER"
      ? users
      : users?.filter((user) => user.id_rama === userLogged?.id_rama);
  const renderedUsers =
    filteredUsers?.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="size-full  overflow-y-auto space-y-4  ">
      <section className="flex items-center justify-between">
        <Label className="text-xl">Usuarios</Label>

        <CreateUserAside />
      </section>
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative md:w-72">
            <Input
              placeholder="Buscar por nombre o apellido"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background pl-10" // added padding-left for icon
            />
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 size-5" />
          </div>

          <span className="text-gray-600 text-sm">
            ({renderedUsers.length} resultados)
          </span>
        </div>
      </section>
      <UsersTable usersInput={renderedUsers} />
    </div>
  );
}
