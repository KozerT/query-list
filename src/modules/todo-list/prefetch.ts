import { queryClient } from "../../shared/api/query-client";
import { store } from "../../shared/api/redux";
import { authSlice } from "../auth/auth.slice";
import { prefetchAuth } from "../auth/prefetch";
import { todoListApi } from "./api";

export const prefetchTodoList = () => {
  const userId = authSlice.selectors.userId(store.getState());
  if (userId) {
    prefetchAuth();
    queryClient.prefetchQuery(
      todoListApi.getTodoListQueryOptions({ userId: userId }),
    );
  }
};
