import type { TCuota } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  cuotas: TCuota[];
  inmutableCuotas: TCuota[];
}

const initialState: SessionState = {
  cuotas: [],
  inmutableCuotas: [],
};

export const cuotaSlice = createSlice({
  name: "cuota",
  initialState,
  reducers: {
    setCuotas: (state, action: PayloadAction<TCuota[]>) => {
      state.cuotas = action.payload;
      state.inmutableCuotas = action.payload;
    },
    addCuota: (state, action: PayloadAction<TCuota>) => {
      state.cuotas.push(action.payload);
      state.inmutableCuotas.push(action.payload);
    },
  },
});

export const { setCuotas, addCuota } = cuotaSlice.actions;
export default cuotaSlice.reducer;
