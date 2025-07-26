import { RootTable } from "@/components/common/table";
import type { TCreatePerson } from "@/models";
import type { ColumnDef } from "@tanstack/react-table";

export function BulkPersonsTable({ persons }: { persons: TCreatePerson[] }) {
  const columns: ColumnDef<TCreatePerson>[] = [
    {
      accessorKey: "name",
      size: 50,
    },
    {
      accessorKey: "last_name",
      size: 50,
    },
    {
      accessorKey: "email",
      size: 50,
    },
    {
      accessorKey: "address",
      size: 150,
    },
    {
      accessorKey: "phone",
      size: 50,
    },
    {
      accessorKey: "gender",
      size: 50,
    },
    {
      accessorKey: "dni",
      size: 50,
    },
  ];
  return <RootTable data={persons} columns={columns} />;
}
