import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import { UserCell } from "./PersonCell";
import RamaCell from "./RamaCell";
import { formatCurrency } from "@/utils";
import { FormatedDate } from "@/components/common/FormatedDate";

export function UsersTable({ usersInput }: { usersInput?: TUser[] }) {
  const { users } = useAppSelector((s) => s.users);
  const columns: TColumnDef<TUser>[] = [
    {
      accessorKey: "id",
      header: "Beneficiario",
      cell: ({ row }) => <UserCell user={row.original} />,
    },
    {
      accessorKey: "id_family",
      header: "Familia",
      cell: ({ getValue }) => <RamaCell ramaId={getValue<string>()} />,
    },
    {
      accessorKey: "address",
      cell: ({ getValue }) => <p className="truncate">{getValue<string>()}</p>,
    },
    {
      accessorKey: "birthdate",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
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
    {
      accessorKey: "citizenship",
      hidden: true,
    },
    {
      accessorKey: "dni",
      hidden: true,
    },
    {
      accessorKey: "is_granted",
      hidden: true,
    },
    // Campos faltantes de TUser, todos con hidden: true
    {
      accessorKey: "name",
      hidden: true,
    },
    {
      accessorKey: "lastname",
      hidden: true,
    },
    {
      accessorKey: "email",
      hidden: true,
    },
    {
      accessorKey: "phone",
      hidden: true,
    },
    {
      accessorKey: "gender",
      hidden: true,
    },
    {
      accessorKey: "created_at",
      hidden: true,
    },
    {
      accessorKey: "updated_at",
      hidden: true,
    },
    {
      accessorKey: "deleted_at",
      hidden: true,
    },
    {
      accessorKey: "notes",
      hidden: true,
    },
    {
      accessorKey: "status",
      hidden: true,
    },
    {
      accessorKey: "id_rama",
      hidden: true,
    },
    {
      accessorKey: "id_user",
      hidden: true,
    },
  ];
  return <RootTable columns={columns} data={usersInput ? usersInput : users} />;
}
