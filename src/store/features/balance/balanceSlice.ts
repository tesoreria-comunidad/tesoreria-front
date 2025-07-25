import type { TBalance } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  blances: TBalance[];
  inmutableBalances: TBalance[];
}

const initialState: SessionState = {
  blances: [],
  inmutableBalances: [],
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<TBalance[]>) => {
      state.blances = action.payload;
      state.inmutableBalances = action.payload;
    },
    addBalance: (state, action: PayloadAction<TBalance>) => {
      state.blances.push(action.payload);
      state.inmutableBalances.push(action.payload);
    },
  },
});

export const { setBalances, addBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
