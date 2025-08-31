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
    updateUser: (state, action: PayloadAction<TUser>) => {
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) {
        state.users[idx] = action.payload;
      }

      const idxInmutable = state.inmutableUsers.findIndex(
        (u) => u.id === action.payload.id
      );
      if (idxInmutable !== -1) {
        state.inmutableUsers[idxInmutable] = action.payload;
      }
    },
  },
});

export const { setUsers, addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
