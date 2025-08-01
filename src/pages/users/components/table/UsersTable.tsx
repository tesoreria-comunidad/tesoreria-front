import { RootTable } from "@/components/common/table";
import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";
import { UserCell } from "./PersonCell";
import RamaCell from "./RamaCell";
import { formatCurrency } from "@/utils";

export function UsersTable({ usersInput }: { usersInput?: TUser[] }) {
  const { users } = useAppSelector((s) => s.users);
  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "id",
      header: "Beneficiario",
      cell: ({ row }) => <UserCell user={row.original} />,
    },
    {
      accessorKey: "role",
      cell: ({ getValue }) => (
        <div className="  bg-green-200 rounded-md  text-green-500 w-3/4 mx-auto p-1">
          <p className="font-medium text-center ">{getValue<string>()}</p>
        </div>
      ),
    },
    {
      accessorKey: "id_rama",
      cell: ({ getValue }) => <RamaCell ramaId={getValue<string>()} />,
    },
    {
      accessorKey: "id_family",
      cell: ({ getValue }) => <RamaCell ramaId={getValue<string>()} />,
    },
    {
      accessorKey: "address",
      cell: ({ getValue }) => getValue<string>(),
    },
    {
      accessorKey: "birthdate",
      cell: ({ getValue }) => getValue<string>(),
    },
    {
      accessorKey: "id_folder",
      header: "Balance",
      cell: () => (
        <div className="bg-green-200 rounded-md  text-green-500 w-3/4 mx-auto p-1">
          <p className="font-medium  text-primary-2 text-center">
            {formatCurrency(19000)}
          </p>
        </div>
      ),
    },
  ];
  return <RootTable columns={columns} data={usersInput ? usersInput : users} />;
}
