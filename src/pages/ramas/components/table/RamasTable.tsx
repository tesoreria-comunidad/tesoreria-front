import { FormatedDate } from "@/components/common/FormatedDate";
import { RootTable } from "@/components/common/table";
import type { TRama } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";
import { AddUserAside } from "../AddUserAside";

export function RamasTable() {
  const { ramas } = useAppSelector((s) => s.ramas);
  const columns: ColumnDef<TRama>[] = [
    {
      accessorKey: "id",
    },
    {
      accessorKey: "createdAt",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
    },
    {
      accessorKey: "name",
    },
    {
      accessorKey: "id",
      cell: ({ row }) => <AddUserAside rama={row.original} />,
    },
  ];
  return <RootTable columns={columns} data={ramas} />;
}
