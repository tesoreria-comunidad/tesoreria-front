/* ============================
 * Fetchers
 * ============================ */

import { setAuthInterceptor } from "@/config/axios.config";
import { LogsService } from "@/services/logs.service";
import { useQuery } from "@tanstack/react-query";
export const fetchLogs = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));

  return await LogsService.getAll();
};

/* ============================
 * Queries
 * ============================ */

export function useLogsQuery() {
  return useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });
}

// Devuelve solo los logs de tipo BALANCE_UPDATE en el mes actual
export function useMonthBalanceLogQuery() {
  return useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
    select(data) {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return data.filter((log) => {
        const logDate = new Date(log.createdAt);
        return (
          log.action_type === "BALANCE_UPDATE" &&
          log.status === "SUCCESS" &&
          logDate >= firstDay &&
          logDate <= lastDay
        );
      })[0];
    },
  });
}
