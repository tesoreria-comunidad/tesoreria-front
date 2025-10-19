// src/pages/ActionLogsPage.tsx
import { useMemo, useState } from "react";
import { PageLoader } from "@/components/common/PageLoader";
import { useLogsQuery } from "@/queries/logs.queries";
import {
  ActionType,
  ActionStatus,
  ActionTargetTable,
} from "@/models/logs.schema";
import { ActionLogsTable } from "./components/table/ActionLogsTable";

export default function ActionLogsPage() {
  const { isLoading, data } = useLogsQuery();
  const [actionType, setActionType] = useState<keyof typeof ActionType | "">(
    ""
  );
  const [status, setStatus] = useState<keyof typeof ActionStatus | "">("");
  const [targetTable, setTargetTable] = useState<
    keyof typeof ActionTargetTable | ""
  >("");
  const [targetId, setTargetId] = useState("");
  const [userId, setUserId] = useState("");
  const [q, setQ] = useState("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const resetFilters = () => {
    setActionType("");
    setStatus("");
    setTargetTable("");
    setTargetId("");
    setUserId("");
    setQ("");
    setFrom("");
    setTo("");
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    const fromDate = from ? new Date(from) : null;
    const toDateExclusive = to
      ? new Date(new Date(to).getTime() + 24 * 60 * 60 * 1000)
      : null;

    return [...data]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .filter((log) => {
        if (actionType && log.action_type !== actionType) return false;
        if (status && log.status !== status) return false;
        if (targetTable && log.target_table !== targetTable) return false;
        if (
          targetId &&
          (log.target_id ?? "")
            .toLowerCase()
            .indexOf(targetId.toLowerCase()) === -1
        )
          return false;
        if (
          userId &&
          (log.id_user ?? "").toLowerCase().indexOf(userId.toLowerCase()) === -1
        )
          return false;

        if (fromDate || toDateExclusive) {
          const created = new Date(log.createdAt);
          if (fromDate && created < fromDate) return false;
          if (toDateExclusive && created >= toDateExclusive) return false;
        }

        if (q) {
          const needle = q.toLowerCase();
          const hay = [
            log.message ?? "",
            log.requestId ?? "",
            log.ip ?? "",
            log.userAgent ?? "",
            log.id ?? "",
            log.id_transaction ?? "",
            log.id_family ?? "",
          ]
            .join(" | ")
            .toLowerCase();
          if (!hay.includes(needle)) return false;
        }

        return true;
      });
  }, [data, actionType, status, targetTable, targetId, userId, q, from, to]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-6 space-y-6 bg-white  size-full rounded-lg ">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Registros de acciones</h1>
        <div className="text-sm text-muted-foreground">
          {filtered.length} resultados
        </div>
      </header>

      {/* Filtros */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">
            Tipo de acción
          </label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value as any)}
            className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">Todas</option>
            {Object.keys(ActionType).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">Todos</option>
            {Object.keys(ActionStatus).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">
            Tabla objetivo
          </label>
          <select
            value={targetTable}
            onChange={(e) => setTargetTable(e.target.value as any)}
            className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">Todas</option>
            {Object.keys(ActionTargetTable).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Target ID</label>
          <input
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            placeholder="transactionId / familyId…"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="uuid del actor…"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Desde</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Hasta</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">
            Buscar en mensaje / requestId / IP / UA
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="texto libre…"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </section>

      <div className="flex items-center justify-between">
        <button
          onClick={resetFilters}
          className="text-sm rounded-md px-3 py-2 border border-gray-300 hover:bg-gray-50"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Tabla */}
      <ActionLogsTable logs={filtered} />
    </div>
  );
}
