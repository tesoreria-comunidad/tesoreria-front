import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TUser } from "@/models";
import { FormatedDate } from "@/components/common/FormatedDate";
import { UserCell } from "@/pages/users/components/table/PersonCell";
import { RamaCell } from "@/pages/users/components/table/RamaCell";
import UsersActionsDropdown from "@/pages/users/components/UsersActionsDropdown";

export function FamilyUsersTable({
  users,
  tableHeader = false,
}: {
  users: TUser[];
  tableHeader?: boolean;
}) {
  const columns: TColumnDef<TUser>[] = [
    {
      accessorKey: "is_active",
      header: "Estado",
      size: 50,
      cell: ({ getValue }) => (
        <div
          className={` mx-auto rounded flex items-center justify-center ${
            getValue()
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          } `}
        >
          {getValue() ? "alta" : "baja"}
        </div>
      ),
    },
    {
      accessorKey: "is_granted",
      header: "Beca",
      size: 50,
      cell: ({ getValue }) => (
        <div
          className={` mx-auto rounded flex items-center justify-center ${
            getValue() ? "bg-orange-200 text-orange-600" : "-"
          } `}
        >
          {getValue() ? "BECA" : "-"}
        </div>
      ),
    },
    {
      accessorKey: "beneficiario",
      header: "Beneficiario",
      cell: ({ row }) => <UserCell user={row.original} />,
    },
    {
      accessorKey: "id_rama",
      header: "Rama",
      cell: ({ getValue }) => <RamaCell id_rama={getValue<string>()} />,
    },
    {
      accessorKey: "address",
      cell: ({ getValue }) => <p className="truncate">{getValue<string>()}</p>,
      hidden: true,
    },
    {
      accessorKey: "birthdate",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
      hidden: true,
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
      accessorKey: "family_role",
      hidden: true,
      cell: ({ getValue }) => (
        <>
          <div
            className={` bg-purple-200 rounded-md  text-purple-600  w-3/4 mx-auto p-1`}
          >
            <p className="font-medium  text-center">{getValue<string>()}</p>
          </div>
        </>
      ),
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
      accessorKey: "createdAt",
      hidden: true,
    },
    {
      accessorKey: "updatedAt",
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
      accessorKey: "id",
      header: "",
      size: 10,
      cell: ({ row }) => (
        <UsersActionsDropdown user={row.original} showFamilyOptions />
      ),
    },
  ];
  return <RootTable columns={columns} data={users} tableHeader={tableHeader} />;
}
