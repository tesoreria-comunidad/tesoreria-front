import type { TUser } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  users: TUser[];
  inmutableUsers: TUser[];
}

const initialState: SessionState = {
  users: [],
  inmutableUsers: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<TUser[]>) => {
      state.users = action.payload;
      state.inmutableUsers = action.payload;
    },
    addUser: (state, action: PayloadAction<TUser>) => {
      state.users.push(action.payload);
      state.inmutableUsers.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<TUser> }>
    ) => {
      const { changes, id } = action.payload;

      const index = state.users.findIndex((user) => user.id === id);

      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...changes,
        };
        const immutableIndex = state.inmutableUsers.findIndex(
          (user) => user.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableUsers[immutableIndex] = {
            ...state.inmutableUsers[immutableIndex],
            ...changes,
          };
        }
      }
    },
  },
});

export const { setUsers, addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
