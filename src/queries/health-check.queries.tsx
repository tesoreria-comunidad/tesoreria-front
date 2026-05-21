import { setAuthInterceptor } from "@/config/axios.config";
import type { THealthAlert } from "@/models";
import { HealthCheckService } from "@/services/health-check.service";
import { useQuery } from "@tanstack/react-query";

const fetchHealthCheck = async (): Promise<THealthAlert[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return HealthCheckService.get();
};

export function useHealthCheckQuery() {
  return useQuery({
    queryKey: ["health-check"],
    queryFn: fetchHealthCheck,
    staleTime: 1000 * 60 * 5,
  });
}
