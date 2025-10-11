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
