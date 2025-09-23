import { ramaAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateRama } from "@/models";
import { RamaServices } from "@/services/rama.service";
import { addRama, setRamas } from "@/store/features/ramas/rama-slice";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRamasQueries() {
  const dispatch = useAppDispatch();
  const fetchRamas = async () => {
    try {
      const apiRamasResponse = await RamaServices.getAllRamas();
      const adaptedRamas = apiRamasResponse.map((rama) => ramaAdapter(rama));
      dispatch(setRamas(adaptedRamas));
    } catch (error) {
      console.log("error fetchin ramas", error);
      throw error;
    }
  };
  const createRama = async (body: TCreateRama) => {
    try {
      const apiRamasResponse = await RamaServices.createRama(body);
      const newRama = ramaAdapter(apiRamasResponse);
      dispatch(addRama(newRama));
    } catch (error) {
      console.log("error fetchin ramas", error);
      throw error;
    }
  };

  return { fetchRamas, createRama };
}

/* ============================
 * Fetchers
 * ============================ */

export const fetchRamas = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await RamaServices.getAllRamas();
  return apiRes.map((rama) => ramaAdapter(rama));
};
export const createRama = async (body: TCreateRama) => {
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
export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRama,
    onSuccess: () => {
      // Refresca lista de usuarios al crear uno nuevo
      queryClient.invalidateQueries({ queryKey: ["ramas"] });
    },
  });
}
