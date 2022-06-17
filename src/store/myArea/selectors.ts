import { RootState } from "../store";

export const selectSecret = (state: RootState): string | undefined =>
  state.myArea.secret;
