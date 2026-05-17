import { setAuthInterceptor } from "@/config/axios.config";
import { CobrabilidadServices } from "@/services/cobrabilidad.service";
import { useQuery } from "@tanstack/react-query";

type TQueryParams = {
  month: string;
  year: string;
};
/* ============================
 * Fetchers
 * ============================ */
export const fetchCobrabilidad = async ({ month, year }: TQueryParams) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return CobrabilidadServices.get(month, year);
};

export const fetchCobrabilidadResumen = async (
  month: number,
  year: number
) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return CobrabilidadServices.getResumen(month, year);
};

/* ============================
 * Queries
 * ============================ */

export function useCobrabilidadQuery(params: TQueryParams) {
  return useQuery({
    queryKey: ["cobrabilidad"],
    queryFn: () => fetchCobrabilidad(params),
    enabled: !!params,
  });
}
export function useCobrabilidadByRamaQuery(
  params: TQueryParams,
  ramaId: string
) {
  return useQuery({
    queryKey: ["cobrabilidad", ramaId],
    queryFn: () => fetchCobrabilidad(params),
    enabled: !!params,
    select: (data) => data.filter((item) => item.id_rama === ramaId)[0],
  });
}

export function useCobrabilidadResumenQuery(month: number, year: number) {
  return useQuery({
    queryKey: ["cobrabilidad", "resumen", month, year],
    queryFn: () => fetchCobrabilidadResumen(month, year),
    enabled: !!month && !!year,
  });
}
