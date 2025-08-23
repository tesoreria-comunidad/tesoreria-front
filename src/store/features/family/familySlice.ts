import type { TFamily } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  families: TFamily[];
  family?: TFamily;
  inmutableFamilies: TFamily[];
}

const initialState: SessionState = {
  families: [],
  inmutableFamilies: [],
  family: undefined,
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
    setFamily: (state, action: PayloadAction<TFamily>) => {
      state.family = action.payload;
    },
  },
});

export const { setFamilies, addFamily, setFamily } = familiSlice.actions;
export default familiSlice.reducer;
