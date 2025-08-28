import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TUser } from "@/models";
import { FormatedDate } from "@/components/common/FormatedDate";
import { UserCell } from "@/pages/users/components/table/PersonCell";
import { RamaCell } from "@/pages/users/components/table/RamaCell";

export function FamilyUsersTable({
  users,
  tableHeader = false,
}: {
  users: TUser[];
  tableHeader?: boolean;
}) {
  const columns: TColumnDef<TUser>[] = [
    {
      accessorKey: "id",
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
      accessorKey: "is_granted",
      header: "Es Beado",
      hidden: false,
      cell: ({ getValue }) => (
        <>
          <div
            className={` ${
              getValue<boolean>()
                ? "bg-yellow-200 rounded-md  text-yellow-600"
                : "bg-green-200 rounded-md  text-green-600"
            }  w-3/4 mx-auto p-1`}
          >
            <p className="font-medium  text-center">
              {getValue<boolean>() ? "BECADO" : "no"}
            </p>
          </div>
        </>
      ),
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
      accessorKey: "id_user",
      hidden: true,
    },
  ];
  return <RootTable columns={columns} data={users} tableHeader={tableHeader} />;
}
