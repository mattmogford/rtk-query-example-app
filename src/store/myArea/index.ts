import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MyArea = {
  secret?: string;
};

const initialState: MyArea = { secret: undefined };

export const myAreaSlice = createSlice({
  name: "myArea",
  initialState,
  reducers: {
    setSecret: (state, action: PayloadAction<{ secret: string }>) => {
      state.secret = action.payload.secret;
    },
  },
});

export const myAreaActions = myAreaSlice.actions;

export default myAreaSlice.reducer;
