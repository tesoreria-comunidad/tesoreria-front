import { familyAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateFamily, TFamily } from "@/models";
import { FamilyServices } from "@/services/family.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchFamilies = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const res = await FamilyServices.getAll();
  return res.map((apiFamily) => familyAdapter(apiFamily));
};
export const createFamily = async (body: TCreateFamily) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const res = await FamilyServices.create(body);
  return familyAdapter(res);
};
export const editFamily = async (id: string, body: Partial<TFamily>) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await FamilyServices.edit(id, body);
};

/* ============================
 * Queries
 * ============================ */

export function useFamiliesQuery() {
  return useQuery({
    queryKey: ["families"],
    queryFn: fetchFamilies,
  });
}

/* ============================
 * Mutations
 * ============================ */

export function useCreateFamilyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
    },
  });
}
export function useEditFamilyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      familyId,
    }: {
      body: Partial<TFamily>;
      familyId: string;
    }) => editFamily(familyId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
    },
  });
}
