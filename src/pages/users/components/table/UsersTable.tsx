import { RootTable } from "@/components/common/table";
import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";

export function UsersTable() {
  const { users } = useAppSelector((s) => s.users);
  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "username",
    },
    {
      accessorKey: "email",
    },
    {
      accessorKey: "createdAt",
    },
    {
      accessorKey: "id_rama",
    },
    {
      accessorKey: "role",
    },
  ];
  return <RootTable columns={columns} data={users} />;
}
