import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TBulkCreateUser } from "@/models";

export function BulkUsersTable({ users }: { users: TBulkCreateUser[] }) {
  const columns: TColumnDef<TBulkCreateUser>[] = [
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
      hidden: true,
    },
    {
      accessorKey: "gender",
      size: 50,
      hidden: true,
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
      hidden: true,
    },
    {
      accessorKey: "id",
    },
  ];
  return <RootTable data={users} columns={columns} tableHeader />;
}
