import { familyAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateFamily, TFamily, TUser } from "@/models";
import { FamilyServices } from "@/services/family.service";
import { useAppSelector } from "@/store/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchFamilies = async (user: TUser): Promise<TFamily[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  if (!user) {return []}; // guard against missing user

  if (user.role === "MASTER") {
    const res = await FamilyServices.getAll();
    return res.map((apiFamily) => familyAdapter(apiFamily));
  }

  if (!user.id_rama) {return []}; // requiere id_rama for non-master roles

  const res = await FamilyServices.getByIdRama(user.id_rama);
  return res.map((apiFamily) => familyAdapter(apiFamily));
};
export const fetchFamilyById = async (id: string) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  if (!id) return null as any; // para evitar llamar el servicio con id undefined
  const res = await FamilyServices.getById(id);
  return familyAdapter(res);
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
  const { user } = useAppSelector((s) => s.session);
  return useQuery({
    queryKey: ["families"],
    queryFn: () => fetchFamilies(user!),
    enabled: !!user && (user.role === "MASTER" || !!user.id_rama), // solo ejecutar si user existe y si es MASTER o tiene id_rama
  });
}
export function useFamilyByIdQuery(id?: string) { 
  return useQuery({
    queryKey: ["families", id],
    queryFn: () => fetchFamilyById(id as string), // forzamos el tipo porque el query no se ejecuta si id es undefined
    enabled: !!id, // solo ejecutar si id esta definido
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
