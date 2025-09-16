import type { TCuota } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  cuotas: TCuota[];
  currentCuota?: TCuota;
  inmutableCuotas: TCuota[];
}

const initialState: SessionState = {
  cuotas: [],
  currentCuota: undefined,
  inmutableCuotas: [],
};

export const cuotaSlice = createSlice({
  name: "cuota",
  initialState,
  reducers: {
    setCuotas: (state, action: PayloadAction<TCuota[]>) => {
      state.cuotas = action.payload;
      state.inmutableCuotas = action.payload;
      state.currentCuota = action.payload.find((e) => e.is_active);
    },
    addCuota: (state, action: PayloadAction<TCuota>) => {
      state.cuotas.push(action.payload);
      state.inmutableCuotas.push(action.payload);
      state.currentCuota = action.payload;
    },
  },
});

export const { setCuotas, addCuota } = cuotaSlice.actions;
export default cuotaSlice.reducer;
