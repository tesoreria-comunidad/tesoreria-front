import type { TRama } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  ramas: TRama[];
  inmutableRamas: TRama[];
}

const initialState: SessionState = {
  ramas: [],
  inmutableRamas: [],
};

export const ramaSlice = createSlice({
  name: "ramas",
  initialState,
  reducers: {
    setRamas: (state, action: PayloadAction<TRama[]>) => {
      state.ramas = action.payload;
      state.inmutableRamas = action.payload;
    },
    addRama: (state, action: PayloadAction<TRama>) => {
      state.ramas.push(action.payload);
      state.inmutableRamas.push(action.payload);
    },
  },
});

export const { setRamas, addRama } = ramaSlice.actions;
export default ramaSlice.reducer;
