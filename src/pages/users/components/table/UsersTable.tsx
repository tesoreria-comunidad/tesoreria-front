import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TUser } from "@/models";
import { UserCell } from "./PersonCell";
import { RamaCell } from "./RamaCell";
import { FamilyCell } from "./FamilyCell";
import { UserBalanceCell } from "./UserBalanceCell";
import UsersActionsDropdown from "../UsersActionsDropdown";
import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { BulkUpdateRamaDialog } from "./components/BulkUpdateRamaDialog";
import { useUsersQuery } from "@/queries/user.queries";
import { RoleGuardWrapper } from "@/components/guards/RoleGuardWrapper";

interface UsersTableProps {
  usersInput?: TUser[];
  ramaId?: string; // esto se usa cuando la tabla se usa en la vista de una rama
}
export function UsersTable({ usersInput, ramaId }: UsersTableProps) {
  const { data: users } = useUsersQuery();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns: TColumnDef<TUser>[] = [
    {
      accessorKey: "is_active",
      header: "Estado",
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
      accessorKey: "birthdate",
      header: "Fecha de Nacimiento",
      cell: ({ getValue }) => (
        <div className="flex justify-center ">
          {new Date(getValue<string>()).toLocaleDateString()}
        </div>
      ),
      hidden: true,
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => (
        <UserBalanceCell user={row.original} ramaId={ramaId} />
      ),
    },
    {
      accessorKey: "address",
      cell: ({ getValue }) => <p className="truncate">{getValue<string>()}</p>,
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
      accessorKey: "role",
      hidden: true,
    },
    {
      accessorKey: "email",
      hidden: true,
    },
    {
      accessorKey: "username",
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
      header: "Fecha de creacion",
      cell: ({ getValue }) => (
        <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Fecha de modificacion",
      hidden: true,
      cell: ({ getValue }) => (
        <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
      ),
    },
    {
      accessorKey: "id",
      header: "-",
      hidden: false,
      size: 50,
      cell: ({ row: { original: user } }) => (
        <UsersActionsDropdown user={user} />
      ),
    },
  ];

  const sortedUsers = (usersInput ? [...usersInput] : users || []).sort(
    (a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      return lastNameComparison !== 0
        ? lastNameComparison
        : a.name.localeCompare(b.name);
    }
  );
  const selectedUsers = sortedUsers.filter((u) => rowSelection[u.id]);

  const handleBulkRamaSuccess = () => {
    setRowSelection({});
  };

  return (
    <div className="flex flex-col gap-2 pt-2">
      <RoleGuardWrapper roles={["MASTER", "DIRIGENTE"]}>
        {Object.keys(rowSelection).length > 0 && (
          <div className="flex items-center gap-3 px-1 py-1.5 rounded-lg border bg-muted/40">
            <span className="text-sm text-muted-foreground flex-1">
              {selectedUsers.length} seleccionado{selectedUsers.length !== 1 ? "s" : ""}
            </span>
            <BulkUpdateRamaDialog
              users={selectedUsers}
              onSuccess={handleBulkRamaSuccess}
            />
          </div>
        )}
      </RoleGuardWrapper>

      <RootTable
        columns={columns}
        data={sortedUsers}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection
      />
    </div>
  );
}
