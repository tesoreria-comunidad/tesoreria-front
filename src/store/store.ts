import { configureStore } from "@reduxjs/toolkit";
import BalanceReducer from "./features/balance/balanceSlice";
import CuotaReducer from "./features/cuota/cuotaSlice";
import FamilyReducer from "./features/family/familySlice";
import FolderReducer from "./features/folder/folderSlice";
import PaymentReducer from "./features/payments/paymentsSlice";
import RamaReducer from "./features/ramas/rama-slice";
import SessionReducer from "./features/session/session-slice";
import UserReducer from "./features/user/usersSlice";
import PersonsReducer from "./features/persons/personSlice";
import TransactionsReducer from "./features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    balance: BalanceReducer,
    cuota: CuotaReducer,
    family: FamilyReducer,
    folder: FolderReducer,
    payments: PaymentReducer,
    ramas: RamaReducer,
    session: SessionReducer,
    users: UserReducer,
    persons: PersonsReducer,
    transactions: TransactionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
