import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/api/redux";

type AuthState = {
  userId: string | undefined;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId"),
  } as AuthState,
  selectors: {
    userId: (state) => state.userId,
  },
  reducers: {
    addUser(state, action: PayloadAction<{ userId: string }>) {
      localStorage.setItem("userId", action.payload.userId);
      state.userId = action.payload.userId;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeUser(state, action: PayloadAction<{ userId: string }>) {
      state.userId = undefined;
    },
  },
}).injectInto(rootReducer);
