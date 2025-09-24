import { familyAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateFamily, TFamily } from "@/models";
import { FamilyServices } from "@/services/family.service";
import {
  addFamily,
  setFamilies,
  updateFamily,
} from "@/store/features/family/familySlice";
import { useAppDispatch } from "@/store/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export function useFamilyQueries() {
  const dispatch = useAppDispatch();

  const fetchFamilies = async () => {
    try {
      const apiFamiliesResponse = await FamilyServices.getAll();
      const adaptedFamilies = apiFamiliesResponse.map((apiFamily) =>
        familyAdapter(apiFamily)
      );
      dispatch(setFamilies(adaptedFamilies));
    } catch (error) {
      console.log("error fetchin families", error);
      throw error;
    }
  };

  const createFamily = async (body: TCreateFamily): Promise<TFamily> => {
    try {
      const apiFamily = await FamilyServices.create(body);
      const adaptedFamily = familyAdapter(apiFamily);
      dispatch(addFamily(adaptedFamily));

      return adaptedFamily;
    } catch (error) {
      console.log("Error creating family", error);
      throw error;
    }
  };
  const editFamily = async (id: string, body: Partial<TFamily>) => {
    try {
      await FamilyServices.edit(id, body);
      dispatch(updateFamily({ id, changes: body }));
    } catch (error) {
      console.log("Error updating family", error);
      throw error;
    }
  };
  return { fetchFamilies, createFamily, editFamily };
}

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
