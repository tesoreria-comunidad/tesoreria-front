import { ramaAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateRama, TUpdateRama } from "@/models";
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
export const fetchRamaById = async (ramaId: string) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await RamaServices.getRamaById(ramaId);
  return ramaAdapter(apiRes);
};
export const createRama = async (body: TCreateRama) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await RamaServices.createRama(body);
  return ramaAdapter(apiRes);
};

export const updateRama = async ({
  id,
  body,
}: {
  id: string;
  body: TUpdateRama;
}) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await RamaServices.updateRama(id, body);
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
export function useRamasByIdQuery(ramaId: string) {
  return useQuery({
    queryKey: ["ramas", ramaId],
    queryFn: () => fetchRamaById(ramaId),
    enabled: !!ramaId,
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
      queryClient.invalidateQueries({ queryKey: ["ramas"] });
    },
  });
}

export function useUpdateRamaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRama,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ramas"] });
    },
  });
}
