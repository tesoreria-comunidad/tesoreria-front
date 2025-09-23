import { userAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TCreateUser, TUser } from "@/models";
import { AuthServices } from "@/services/auth.service";
import { UserServices } from "@/services/user.service";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */
export const fetchUsers = async (): Promise<TUser[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiUserResponse = await UserServices.getAll();
  return apiUserResponse.map((apiUser) => userAdapter(apiUser));
};

export const createUser = async (
  body: Omit<TCreateUser, "confirmPassword">
): Promise<TUser> => {
  const newUser = await AuthServices.register(body);
  return userAdapter(newUser);
};

export const editUser = async (
  body: Partial<TUser>,
  userId: string
): Promise<TUser> => {
  const updatedUser = await UserServices.update(body, userId);
  return userAdapter(updatedUser);
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
