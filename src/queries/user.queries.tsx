import { userAdapter } from "@/adapters";
import type { TCreateUser, TUser } from "@/models";
import { AuthServices } from "@/services/auth.service";
import { UserServices } from "@/services/user.service";
import {
  addUser,
  setUsers,
  updateUser,
} from "@/store/features/user/usersSlice";
import { useAppDispatch } from "@/store/hooks";
export function useUserQueries() {
  const dispatch = useAppDispatch();

  const fetchUsers = async () => {
    try {
      const apiUserResponse = await UserServices.getAll();
      const adaptedUsers = apiUserResponse.map((apiUser) =>
        userAdapter(apiUser)
      );
      dispatch(setUsers(adaptedUsers));
    } catch (error) {
      console.log("Error fetching users", error);
      throw error;
    }
  };

  const createUser = async (body: Omit<TCreateUser, "confirmPassword">) => {
    try {
      const newUser = await AuthServices.register(body);
      const adaptedNewUser = userAdapter(newUser);
      dispatch(addUser(adaptedNewUser));
    } catch (error) {
      console.log("Error creating new user", error);
      throw error;
    }
  };

  const editUser = async (body: Partial<TUser>, userId: string) => {
    try {
      await UserServices.update(body, userId);
      dispatch(updateUser(body));
    } catch (error) {
      console.log("Error creating new user", error);
      throw error;
    }
  };
  return { fetchUsers, createUser, editUser };
}
