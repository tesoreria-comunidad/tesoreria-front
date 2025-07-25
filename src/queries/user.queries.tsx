import { userAdapter } from "@/adapters";
import { UserServices } from "@/services/user.service";
import { setUsers } from "@/store/features/user/usersSlice";
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
    } catch (error) {}
  };

  return { fetchUsers };
}
