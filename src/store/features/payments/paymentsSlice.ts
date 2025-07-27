import type { TPayment } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  payments: TPayment[];
  inmutablePayments: TPayment[];
}

const initialState: SessionState = {
  payments: [],
  inmutablePayments: [],
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<TPayment[]>) => {
      state.payments = action.payload;
      state.inmutablePayments = action.payload;
    },
    addPayment: (state, action: PayloadAction<TPayment>) => {
      state.payments.push(action.payload);
      state.inmutablePayments.push(action.payload);
    },
  },
});

export const { setPayments, addPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
