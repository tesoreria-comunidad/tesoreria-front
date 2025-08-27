import { userAdapter } from "@/adapters";
import type { TCreateUser, TUpdateUser } from "@/models";
import { AuthServices } from "@/services/auth.service";
import { UserServices } from "@/services/user.service";
import { addUser, setUsers } from "@/store/features/user/usersSlice";
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

  const updateUser = async ({
    id,
    data,
  }: {
    id: string;
    data: TUpdateUser;
  }) => {
    try {
      const userUpdate = await UserServices.updateUser(id, data);
      return userUpdate;
    } catch (error) {
      console.log("Error updating a user", error);
      throw error;
    }
  };
  return { fetchUsers, createUser, updateUser };
}
