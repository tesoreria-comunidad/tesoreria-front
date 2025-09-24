import { configureStore } from "@reduxjs/toolkit";
import FolderReducer from "./features/folder/folderSlice";
import SessionReducer from "./features/session/session-slice";

export const store = configureStore({
  reducer: {
    folder: FolderReducer,
    session: SessionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
