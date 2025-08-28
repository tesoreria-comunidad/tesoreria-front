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
    updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
      state.inmutableUsers = state.inmutableUsers.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    },
  },
});

export const { setUsers, addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
