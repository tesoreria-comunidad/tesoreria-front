// src/components/logs/ActionLogsList.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogsQuery } from "@/queries/logs.queries";
import type { TLog } from "@/models/logs.schema";
import { ActionType, ActionStatus } from "@/models/logs.schema";
import {
  History,
  RefreshCw,
  PlusCircle,
  Pencil,
  Trash2,
  User,
  Eye,
} from "lucide-react";
import React from "react";
import { useUserQueryById } from "@/queries/user.queries";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TransactionPreview } from "./TransactionPreview";

/** pequeño helper sin dependencias para “hace 3 min”, “ayer”, etc */
function relativeTimeFromNow(dateInput: string | Date) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const diff = Date.now() - date.getTime();
  const abs = Math.abs(diff);
  const MIN = 60 * 1000;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  const rtf = new Intl.RelativeTimeFormat("es-AR", { numeric: "auto" });
  if (abs < MIN) return "justo ahora";
  if (abs < HOUR) return rtf.format(Math.round(-diff / MIN), "minute");
  if (abs < DAY) return rtf.format(Math.round(-diff / HOUR), "hour");
  return rtf.format(Math.round(-diff / DAY), "day");
}

const statusClass: Record<keyof typeof ActionStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  SUCCESS: "bg-green-100 text-green-800 border-green-200",
  ERROR: "bg-red-100 text-red-800 border-red-200",
};

const actionIcon: Partial<Record<keyof typeof ActionType, React.ElementType>> =
  {
    BALANCE_UPDATE: RefreshCw,
    TRANSACTION_CREATE: PlusCircle,
    TRANSACTION_UPDATE: Pencil,
    TRANSACTION_DELETE: Trash2,
  };

function ItemIcon({ type }: { type: keyof typeof ActionType }) {
  const Icon = actionIcon[type] ?? History;
  return <Icon className="size-4 text-gray-700 " />;
}

function StatusBadge({ status }: { status?: keyof typeof ActionStatus }) {
  if (!status) return <span className="text-gray-400 text-xs">—</span>;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${statusClass[status]}`}
    >
      {status}
    </span>
  );
}
const actionClass: Partial<Record<keyof typeof ActionType, string>> = {
  BALANCE_UPDATE: "bg-indigo-100 text-indigo-800 ring-indigo-600/20",
  TRANSACTION_CREATE: "bg-sky-100 text-sky-800 ring-sky-600/20",
  TRANSACTION_UPDATE: "bg-amber-100 text-amber-800 ring-amber-600/20",
  TRANSACTION_DELETE: "bg-rose-100 text-rose-800 ring-rose-600/20",
};
function Line({ log }: { log: TLog }) {
  const time = relativeTimeFromNow(log.createdAt);
  const { data: user } = useUserQueryById(log.id_user);
  return (
    <div className="flex items-start gap-3 py-2 pr-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <ItemIcon type={log.action_type as keyof typeof ActionType} />
          <span
            className={`inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-800 ring-1 ring-gray-300 ${
              actionClass[log.action_type]
            }`}
          >
            {log.action_type}
          </span>
          {log.target_table === "TRANSACTIONS" && (
            <Popover>
              <PopoverTrigger>
                <Button variant={"ghost"}>
                  <Eye />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <TransactionPreview transactionId={log.target_id!} />
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-1">
            <User className="size-3.5" />
            <span className="font-mono text-[11px] max-w-[220px] truncate">
              {user ? `${user.name} ${user.last_name}` : "n/a"}
            </span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <StatusBadge
          status={log.status as keyof typeof ActionStatus | undefined}
        />
        <span className="text-[11px] text-gray-500">{time}</span>
      </div>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="flex items-start gap-3 py-2 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-gray-200" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-2/3 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
        <div className="h-3 w-1/3 rounded bg-gray-200" />
      </div>
      <div className="h-5 w-16 rounded bg-gray-200" />
    </div>
  );
}

export function ActionLogsList({
  limit = 100,
  onViewAll,
}: {
  limit?: number;
  onViewAll?: () => void;
}) {
  const { data: logs, isLoading } = useLogsQuery();

  return (
    <Card className="size-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Acciones</CardTitle>
            <CardDescription>
              Últimas acciones realizadas en la app
            </CardDescription>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm text-primary hover:underline"
            >
              Ver todo
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 h-full ">
        {isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonItem key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!logs || logs.length === 0) && (
          <div className="flex flex-col items-center justify-center py-8 text-sm text-gray-500">
            <History className="mb-2 size-5 text-gray-400" />
            No hay acciones registradas todavía.
          </div>
        )}

        {!isLoading && !!logs?.length && (
          <div className="max-h-[90%] overflow-auto">
            <div className="divide-y">
              {logs
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, limit)
                .map((log) => (
                  <Line key={log.id} log={log as TLog} />
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
