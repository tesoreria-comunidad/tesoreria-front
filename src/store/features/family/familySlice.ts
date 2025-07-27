import type { TFamily } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  families: TFamily[];
  inmutableFamilies: TFamily[];
}

const initialState: SessionState = {
  families: [],
  inmutableFamilies: [],
};

export const familiSlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    setFamilies: (state, action: PayloadAction<TFamily[]>) => {
      state.families = action.payload;
      state.inmutableFamilies = action.payload;
    },
    addFamily: (state, action: PayloadAction<TFamily>) => {
      state.families.push(action.payload);
      state.inmutableFamilies.push(action.payload);
    },
  },
});

export const { setFamilies, addFamily } = familiSlice.actions;
export default familiSlice.reducer;
