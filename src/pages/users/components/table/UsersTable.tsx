import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import { UserCell } from "./PersonCell";
import { RamaCell } from "./RamaCell";
import { FormatedDate } from "@/components/common/FormatedDate";
import { FamilyCell } from "./FamilyCell";
import { EditUserAside } from "../EditUserAside";
import { UserBalanceCell } from "./UserBalanceCell";

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
      cell: ({ getValue }) => <FamilyCell id_family={getValue<string>()} />,
    },
    {
      accessorKey: "id_rama",
      header: "Rama",
      cell: ({ getValue }) => <RamaCell id_rama={getValue<string>()} />,
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
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => <UserBalanceCell user={row.original} />,
    },
    {
      accessorKey: "actions",
      header: "Editar",
      cell: ({ row }) => <EditUserAside user={row.original as TUser} />,
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
      accessorKey: "is_active",
      hidden: true,
    },
    {
      accessorKey: "id_user",
      hidden: true,
    },
  ];
  return (
    <RootTable
      columns={columns}
      data={usersInput ? usersInput : users}
      tableHeader
    />
  );
}
