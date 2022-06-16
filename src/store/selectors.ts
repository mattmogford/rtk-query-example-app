import { RootState } from "./store";

export const selectToken = (state: RootState): string | undefined =>
  state.auth.token;

export const selectSecret = (state: RootState): string | undefined =>
  state.myArea.secret;
