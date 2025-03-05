import { MutationObserver, useMutation } from "@tanstack/react-query";
import { AppThunk } from "../../shared/api/redux";
import { queryClient } from "../../shared/api/query-client";
import { TodoDto, todoListApi } from "./api";
import { nanoid } from "nanoid";
import { authSlice } from "../auth/auth.slice";
import { authApi } from "../auth/api";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (_dispatch, getState) => {
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("User not logged in");
    }

    const user = await queryClient.fetchQuery(authApi.getUserById(userId));
    const newTodo: TodoDto = {
      id: nanoid(),
      done: false,
      text: ` ${text}. Owner: ${user.login}`,
      userId: userId,
    };

    queryClient.cancelQueries({
      queryKey: [todoListApi.basekey],
    });

    const prevTasks = queryClient.getQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
    );

    queryClient.setQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
      (tasks) => [...(tasks ?? []), newTodo],
    );

    try {
      await new MutationObserver(queryClient, {
        mutationFn: todoListApi.createTodo,
      }).mutate(newTodo);
    } catch {
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        prevTasks,
      );
    } finally {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.basekey],
      });
    }
  };

export const useCreateLoading = () =>
  useMutation({
    mutationKey: ["login"],
  }).isPending;
