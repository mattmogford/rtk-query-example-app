import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Auth = {
  token?: string;
  isLoggedIn: boolean;
};

const initialState: Auth = { isLoggedIn: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      const token = action.payload.token;
      localStorage.setItem("token", token);
      state.isLoggedIn = true;
      state.token = token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
