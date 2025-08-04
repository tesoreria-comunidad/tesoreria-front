import type { TTransaction } from "@/models/transaction.schema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  transactions: TTransaction[];
  inmutableTransactions: TTransaction[];
  isFetched: boolean;
}

const initialState: SessionState = {
  transactions: [],
  inmutableTransactions: [],
  isFetched: false,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<TTransaction[]>) => {
      state.transactions = action.payload;
      state.inmutableTransactions = action.payload;
      state.isFetched = true;
    },
    addTransaction: (state, action: PayloadAction<TTransaction>) => {
      state.transactions.push(action.payload);
      state.inmutableTransactions.push(action.payload);
    },
  },
});

export const { setTransactions, addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
