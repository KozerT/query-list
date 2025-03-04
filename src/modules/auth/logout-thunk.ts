import { AppThunk } from "../../shared/api/redux";
import { queryClient } from "../../shared/api/query-client";
import { authSlice } from "./auth.slice";

export const logoutThunk = (): AppThunk => async (dispatch) => {
  dispatch(authSlice.actions.removeUser());
  queryClient.removeQueries();
  localStorage.removeItem("userId");

  dispatch(
    authSlice.actions.setError("Login failed. Incorrect password or username"),
  );
};
