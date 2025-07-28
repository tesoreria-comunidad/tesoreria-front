import type { TPerson } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  persons: TPerson[];
  inmutablePersons: TPerson[];
}

const initialState: SessionState = {
  persons: [],
  inmutablePersons: [],
};

export const personSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    setPersons: (state, action: PayloadAction<TPerson[]>) => {
      state.persons = action.payload;
      state.inmutablePersons = action.payload;
    },
    addPerson: (state, action: PayloadAction<TPerson>) => {
      state.persons.push(action.payload);
      state.inmutablePersons.push(action.payload);
    },
  },
});

export const { addPerson, setPersons } = personSlice.actions;
export default personSlice.reducer;
