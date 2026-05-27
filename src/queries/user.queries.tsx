import { userAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateUser, TUser } from "@/models";
import { AuthServices } from "@/services/auth.service";
import {
  UserServices,
  type TBulkUpdateRamaBody,
  type TBulkUpdateRamaResponse,
} from "@/services/user.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */
export const fetchUsers = async (): Promise<TUser[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiUserResponse = await UserServices.getAll();
  console.log("apiUserResponse", apiUserResponse);
  return apiUserResponse.map((apiUser) => userAdapter(apiUser));
};
export const fetchUserById = async (id: string): Promise<TUser> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiUser = await UserServices.getById(id);
  return userAdapter(apiUser);
};

export const createUser = async (
  body: Omit<TCreateUser, "confirmPassword">
): Promise<TUser> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const newUser = await AuthServices.register(body);
  return userAdapter(newUser);
};

export const editUser = async (
  body: Partial<TUser>,
  userId: string
): Promise<TUser> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const updatedUser = await UserServices.update(body, userId);
  return userAdapter(updatedUser);
};

export const deleteUser = async (id: string): Promise<void> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  await UserServices.delete(id);
};

/* ============================
 * Queries
 * ============================ */
export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
export function useUserQueryById(id: string) {
  const uuidRE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id && uuidRE.test(id),
  });
}

/* ============================
 * Mutations
 * ============================ */
export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Refresca lista de usuarios al crear uno nuevo
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useEditUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, userId }: { body: Partial<TUser>; userId: string }) =>
      editUser(body, userId),
    onSuccess: () => {
      // Refresca lista de usuarios al editar
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
export function useBulkEditUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: { id: string; data: Partial<TUser> }[]) => {
      // Aplica todas las actualizaciones en paralelo
      const results = await Promise.all(
        updates.map(({ id, data }) => editUser(data, id))
      );
      return results;
    },
    onSuccess: () => {
      // Refresca la lista de usuarios después de un bulk edit
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useBulkUpdateRamaMutation() {
  const queryClient = useQueryClient();

  return useMutation<TBulkUpdateRamaResponse, Error, TBulkUpdateRamaBody>({
    mutationFn: async (body: TBulkUpdateRamaBody) => {
      await setAuthInterceptor(localStorage.getItem("accessToken"));
      return UserServices.bulkUpdateRama(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUserRamaMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    TUser,
    Error,
    { userId: string; id_rama: string }
  >({
    mutationFn: async ({ userId, id_rama }) => {
      await setAuthInterceptor(localStorage.getItem("accessToken"));
      const apiUser = await UserServices.patchUserRama(userId, id_rama);
      return userAdapter(apiUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["ramas"] });
    },
  });
}
