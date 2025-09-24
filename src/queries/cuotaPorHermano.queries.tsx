import { setAuthInterceptor } from "@/config/axios.config";
import type {
  TCreateCuotaPorHermano,
  TCuotaPorHemanos,
} from "@/models/cuotaPorHermanos.schema";
import { CuotaPorHermanoServices } from "@/services/cuotaPorHermano.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchCPH = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await CuotaPorHermanoServices.getAll();
};
export const createCPH = async (body: TCreateCuotaPorHermano) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await CuotaPorHermanoServices.create(body);
};
export const editCPH = async (id: string, body: Partial<TCuotaPorHemanos>) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await CuotaPorHermanoServices.edit(id, body);
};

/* ============================
 * Queries
 * ============================ */

export function useCPHQuery() {
  return useQuery({
    queryKey: ["cph"],
    queryFn: fetchCPH,
  });
}

/* ============================
 * Mutations
 * ============================ */
export function useCreateCPHMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCPH,
    onSuccess: () => {
      // Refresca lista de usuarios al crear uno nuevo
      queryClient.invalidateQueries({ queryKey: ["cph"] });
    },
  });
}
export function useEditCPHMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      body,
      id,
    }: {
      body: Partial<TCreateCuotaPorHermano>;
      id: string;
    }) => editCPH(id, body),
    onSuccess: () => {
      // Refresca lista de usuarios al editar
      queryClient.invalidateQueries({ queryKey: ["cph"] });
    },
  });
}
