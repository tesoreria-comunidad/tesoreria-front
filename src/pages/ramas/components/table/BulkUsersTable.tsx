import { RootTable } from "@/components/common/table";
import type { TBulkCreateUser } from "@/models";
import type { ColumnDef } from "@tanstack/react-table";

export function BulkUsersTable({ users }: { users: TBulkCreateUser[] }) {
  const columns: ColumnDef<TBulkCreateUser>[] = [
    {
      accessorKey: "name",
      size: 80,
    },
    {
      accessorKey: "last_name",
      size: 80,
    },

    {
      accessorKey: "phone",
      size: 80,
    },
    {
      accessorKey: "gender",
      size: 50,
    },
    {
      accessorKey: "dni",
      size: 50,
    },
    {
      accessorKey: "email",
      size: 80,
    },
    {
      accessorKey: "address",
      size: 80,
    },
  ];
  return <RootTable data={users} columns={columns} />;
}
