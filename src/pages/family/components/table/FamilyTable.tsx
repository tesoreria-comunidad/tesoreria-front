import { RootTable } from "@/components/common/table";
import type { TFamily, TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import BalanceCell from "./BalanceCell";
import { RamaCell } from "@/pages/users/components/table/RamaCell";

export function FamilyTable() {
  const { families } = useAppSelector((s) => s.family);

  const columns: ColumnDef<TFamily>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 10,
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
      size: 50,
      cell: ({ getValue }) => {
        const users = getValue<TUser[]>() ?? [];
        return <div className="text-center">{users.length}</div>;
      },
    },
    {
      accessorKey: "id_balance",
      header: "Balance",
      size: 50,
      cell: ({ getValue, row }) => (
        <BalanceCell id_balance={getValue<string>()} family={row.original} />
      ),
    },
    {
      accessorKey: "manage_by",
      header: "Cobrado Por",
      size: 50,
      cell: ({ getValue }) => <RamaCell id_rama={getValue<string>()} />,
    },
  ];

  return <RootTable columns={columns} data={families} />;
}
