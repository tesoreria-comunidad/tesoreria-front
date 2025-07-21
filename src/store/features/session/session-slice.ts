import type { TUser } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  user?: TUser;
}

const initialState: SessionState = {
  user: undefined,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: () => {},
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
