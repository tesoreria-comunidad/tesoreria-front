// src/components/logs/ActionLogsTable.tsx
import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TLog } from "@/models/logs.schema";
import {
  ActionStatus,
  ActionType,
  ActionTargetTable,
} from "@/models/logs.schema";
import { UserCell } from "./UserCell";

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset " +
        (className ?? "")
      }
    >
      {children}
    </span>
  );
}

const statusClass: Record<keyof typeof ActionStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
  SUCCESS: "bg-green-100 text-green-800 ring-green-600/20",
  ERROR: "bg-red-100 text-red-800 ring-red-600/20",
};

const actionClass: Partial<Record<keyof typeof ActionType, string>> = {
  BALANCE_UPDATE: "bg-indigo-100 text-indigo-800 ring-indigo-600/20",
  TRANSACTION_CREATE: "bg-sky-100 text-sky-800 ring-sky-600/20",
  TRANSACTION_UPDATE: "bg-amber-100 text-amber-800 ring-amber-600/20",
  TRANSACTION_DELETE: "bg-rose-100 text-rose-800 ring-rose-600/20",
};

export function ActionLogsTable({ logs }: { logs: TLog[] }) {
  const columns: TColumnDef<TLog>[] = [
    { accessorKey: "id", hidden: true },
    {
      accessorKey: "createdAt",
      header: "Fecha",
      size: 240,
      enableSorting: true,
      cell: ({ getValue, row }) => (
        <div className="whitespace-nowrap">
          <div className="font-medium">
            {new Date(getValue<string>()).toLocaleString()}
          </div>
          <div className="text-[11px] text-gray-500">
            #{row.original.id.slice(0, 8)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "action_type",
      header: "Acción",
      size: 180,
      cell: ({ getValue }) => {
        const v = getValue<keyof typeof ActionType>();
        return (
          <Pill
            className={
              actionClass[v] ?? "bg-gray-100 text-gray-800 ring-gray-600/20"
            }
          >
            {v}
          </Pill>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Estado",
      size: 140,
      cell: ({ getValue }) => {
        const v = getValue<keyof typeof ActionStatus | undefined>();
        return v ? (
          <Pill className={statusClass[v]}>{v}</Pill>
        ) : (
          <span className="text-gray-400">—</span>
        );
      },
    },
    {
      accessorKey: "id_user",
      header: "Usuario",
      size: 260,
      cell: ({ getValue }) => (
        <span className="font-mono text-xs break-all">
          <UserCell userId={getValue<string>()} />
          {/* {getValue<string>()} */}
        </span>
      ),
    },
    {
      accessorKey: "target_table",
      header: "Target",
      size: 280,
      hidden: true,
      cell: ({ row }) => {
        const t = row.original.target_table as
          | keyof typeof ActionTargetTable
          | undefined;
        const id = row.original.target_id ?? "—";
        const extras =
          row.original.id_family || row.original.id_transaction
            ? ` · fam: ${row.original.id_family ?? "—"} | txn: ${
                row.original.id_transaction ?? "—"
              }`
            : "";
        return (
          <div className="text-xs">
            <div className="text-gray-700">{t ?? "—"}</div>
            <div className="font-mono break-all">{id}</div>
            {extras && (
              <div className="text-[11px] text-gray-500">{extras}</div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Mensaje",
      size: 420,
      cell: ({ getValue }) => (
        <p className="truncate" title={getValue<string>() ?? ""}>
          {getValue<string>() ?? "—"}
        </p>
      ),
    },
    { accessorKey: "updatedAt", hidden: true },
  ];

  return <RootTable columns={columns} data={logs} tableHeader />;
}
