import { RootTable } from "@/components/common/table";
import type { TFamily, TUser } from "@/models";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import BalanceCell from "./BalanceCell";
import { RamaCell } from "@/pages/users/components/table/RamaCell";
import { FamilyActionCell } from "./components/FamilyActionCell";

export function FamilyTable({ families }: { families: TFamily[] }) {
  const columns: ColumnDef<TFamily>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 80,
      cell: ({ getValue, row }) => (
        <div className="uppercase">
          <Link to={`/family/${row.original.id}`} className="hover:underline">
            <p className="space-x-4 text-lg">{getValue<string>()}</p>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "users",
      header: "Integrantes",
      size: 80,
      cell: ({ getValue }) => {
        const users = getValue<TUser[]>() ?? [];
        return <div className="text-center">{users.length}</div>;
      },
    },
    {
      accessorKey: "id_balance",
      header: "Balance",
      size: 100,
      cell: ({ row }) => <BalanceCell family={row.original} />,
    },
    {
      accessorKey: "manage_by",
      header: "Cobrado Por",
      size: 50,
      cell: ({ getValue }) => <RamaCell id_rama={getValue<string>()} />,
    },
    {
      accessorKey: "id",
      header: "",
      size: 10,
      cell: ({ row }) => <FamilyActionCell family={row.original} />,
    },
  ];

  return <RootTable columns={columns} data={families} tableHeader />;
}
