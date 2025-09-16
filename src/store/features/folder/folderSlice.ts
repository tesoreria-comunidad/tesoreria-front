import type { TFolder } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  folders: TFolder[];
  inmutableFolders: TFolder[];
}

const initialState: SessionState = {
  folders: [],
  inmutableFolders: [],
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<TFolder[]>) => {
      state.folders = action.payload;
      state.inmutableFolders = action.payload;
    },
    addFolder: (state, action: PayloadAction<TFolder>) => {
      state.folders.push(action.payload);
      state.inmutableFolders.push(action.payload);
    },
  },
});

export const { setFolders, addFolder } = folderSlice.actions;
export default folderSlice.reducer;
