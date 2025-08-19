import { RootTable } from "@/components/common/table";
import type { TFamily, TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import BalanceCell from "./BalanceCell";

export function FamilyTable() {
  const { families } = useAppSelector((s) => s.family);

  const columns: ColumnDef<TFamily>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 10,
      cell: ({ getValue, row }) => (
        <div className="uppercase">
          <Link to={`/familias/${row.original.id}`} className="hover:underline">
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
        const users = getValue<TUser[]>() ?? []; // <-- aquí el fallback
        return (
          <div className="text-center">
            {users.length > 0 ? (
              <ul className="space-y-1">
                {users.map((user) => (
                  <li key={user.id} className="uppercase">
                    {user.name}
                  </li>
                ))}
              </ul>
            ) : (
              <span>Sin integrantes</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "id_balance",
      header: "Balance",
      size: 50,
      cell: ({ getValue }) => <BalanceCell id_balance={getValue<string>()} />,
    },
  ];

  return <RootTable columns={columns} data={families} />;
}
