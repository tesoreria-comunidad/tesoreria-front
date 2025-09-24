import { ramaAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateRama } from "@/models";
import { RamaServices } from "@/services/rama.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchRamas = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await RamaServices.getAllRamas();
  return apiRes.map((rama) => ramaAdapter(rama));
};
export const createRama = async (body: TCreateRama) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await RamaServices.createRama(body);
  return ramaAdapter(apiRes);
};

/* ============================
 * Queries
 * ============================ */

export function useRamasQuery() {
  return useQuery({
    queryKey: ["ramas"],
    queryFn: fetchRamas,
  });
}

/* ============================
 * Mutations
 * ============================ */

export function useCreateRamaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRama,
    onSuccess: () => {
      // Refresca lista de usuarios al crear uno nuevo
      queryClient.invalidateQueries({ queryKey: ["ramas"] });
    },
  });
}
