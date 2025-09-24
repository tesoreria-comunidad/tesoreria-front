import { cuotaAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateCuota } from "@/models";
import { CuotaServices } from "@/services/cuota.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchCuotas = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiCuotasResponse = await CuotaServices.getAll();
  return apiCuotasResponse.map((apiCuota) => cuotaAdapter(apiCuota));
};
export const createCuota = async (body: TCreateCuota) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await CuotaServices.create(body);
};

/* ============================
 * Queries
 * ============================ */
export function useCuotasQuery() {
  return useQuery({
    queryKey: ["cuotoas"],
    queryFn: fetchCuotas,
  });
}

/* ============================
 * Mutations
 * ============================ */
export function useCreateCuotaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCuota,
    onSuccess: () => {
      // Refresca lista de usuarios al crear uno nuevo
      queryClient.invalidateQueries({ queryKey: ["cuotoas"] });
    },
  });
}
