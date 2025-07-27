import { FormatedDate } from "@/components/common/FormatedDate";
import { RootTable } from "@/components/common/table";
import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";

export function UsersTable({ usersInput }: { usersInput: TUser[] }) {
  const { users } = useAppSelector((s) => s.users);
  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "username",
    },
    {
      accessorKey: "createdAt",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
    },
    {
      accessorKey: "role",
    },
    {
      accessorKey: "id_rama",
    },
    {
      accessorKey: "id_family",
    },
    {
      accessorKey: "id_folder",
    },
  ];
  return <RootTable columns={columns} data={usersInput ? usersInput : users} />;
}
