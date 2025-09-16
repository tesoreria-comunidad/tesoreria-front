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
    updateFamily: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<TFamily> }>
    ) => {
      const { changes, id } = action.payload;

      const index = state.families.findIndex((user) => user.id === id);

      if (index !== -1) {
        state.families[index] = {
          ...state.families[index],
          ...changes,
        };
        const immutableIndex = state.inmutableFamilies.findIndex(
          (family) => family.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableFamilies[immutableIndex] = {
            ...state.inmutableFamilies[immutableIndex],
            ...changes,
          };
        }
      }
    },
  },
});

export const { setFamilies, addFamily, setFamily, updateFamily } =
  familiSlice.actions;
export default familiSlice.reducer;
