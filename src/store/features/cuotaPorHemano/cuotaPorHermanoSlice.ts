import type { TCuotaPorHemanos } from "@/models/cuotaPorHermanos.schema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  cuotasPorHemano: TCuotaPorHemanos[];
}

const initialState: SessionState = {
  cuotasPorHemano: [],
};

export const cuotaPorHermanoSlice = createSlice({
  name: "cuota",
  initialState,
  reducers: {
    setCuotaPorHemanoss: (state, action: PayloadAction<TCuotaPorHemanos[]>) => {
      state.cuotasPorHemano = action.payload;
    },
    addCuotaPorHermano: (state, action: PayloadAction<TCuotaPorHemanos>) => {
      state.cuotasPorHemano.push(action.payload);
    },
    updateCuotaPorHermano: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<TCuotaPorHemanos> }>
    ) => {
      const { changes, id } = action.payload;
      const index = state.cuotasPorHemano.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.cuotasPorHemano[index] = {
          ...state.cuotasPorHemano[index],
          ...changes,
        };
      }
    },
  },
});

export const {
  setCuotaPorHemanoss,
  addCuotaPorHermano,
  updateCuotaPorHermano,
} = cuotaPorHermanoSlice.actions;
export default cuotaPorHermanoSlice.reducer;
