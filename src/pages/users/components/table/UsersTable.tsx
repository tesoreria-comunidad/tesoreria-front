import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import { UserCell } from "./PersonCell";
import { RamaCell } from "./RamaCell";
import { FamilyCell } from "./FamilyCell";
import { UserBalanceCell } from "./UserBalanceCell";
import UsersActionsDropdown from "../UsersActionsDropdown";
import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { SelectUsersAction } from "./components/SelectUsersAction";

export function UsersTable({ usersInput }: { usersInput?: TUser[] }) {
  const { users } = useAppSelector((s) => s.users);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const columns: TColumnDef<TUser>[] = [
    {
      accessorKey: "is_active",
      header: "",
      size: 70,
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
      size: 90,
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
      header: "Beneficiario",
      size: 250,
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
      hidden: true,
    },
    {
      accessorKey: "birthdate",
      header: "Fecha de Nacimiento",
      cell: ({ getValue }) => (
        <div className="flex justify-center ">
          {new Date(getValue<string>()).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => <UserBalanceCell user={row.original} />,
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
      accessorKey: "role",
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
      accessorKey: "name",
      header: "",
      hidden: false,
      size: 50,
      cell: ({ row: { original: user } }) => (
        <UsersActionsDropdown user={user} />
      ),
    },
  ];

  const sortedUsers = (usersInput ? [...usersInput] : [...users]).sort(
    (a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      return lastNameComparison !== 0
        ? lastNameComparison
        : a.name.localeCompare(b.name);
    }
  );
  const selectedUsers = Object.keys(rowSelection).map(
    (key) => sortedUsers[parseInt(key, 10)]
  );
  return (
    <div className="pt-2 relative">
      {/* Panel de acciones sobre seleccionados */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex items-center justify-between p-2 gap-2 rounded absolute top-0 ">
          <span>{selectedUsers.length} seleccionados</span>
          <SelectUsersAction users={selectedUsers} />
        </div>
      )}

      <RootTable
        columns={columns}
        data={sortedUsers}
        tableHeader
        rowSelection={rowSelection} // 👈 le pasamos el estado
        onRowSelectionChange={setRowSelection} // 👈 y el updater
        enableRowSelection
      />
    </div>
  );
}
