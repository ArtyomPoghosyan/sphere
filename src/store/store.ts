import { useDispatch } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import loginSlice from "./slices/auth/index";
import userSLice from "./slices/user/index";
import managerSlice from "./slices/manager/index";
import supportSlice from "./slices/support/index";
import contentSlice from "./slices/content/index";
import transaction from "./slices/transaction/index"

export const store = configureStore({
  reducer: {
    login: loginSlice,
    user: userSLice,
    manager: managerSlice,
    support: supportSlice,
    content: contentSlice,
    transaction:transaction
  },
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>>
export const useAppDispatch: () => AppDispatch = useDispatch

