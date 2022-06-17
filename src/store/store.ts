import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import reducer from "./reducer";
import { alcumusAPI } from "./services/alcumusAPI";

export const store = configureStore({
  reducer,
  middleware: (gdm) => [...gdm().concat(alcumusAPI.middleware)],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
