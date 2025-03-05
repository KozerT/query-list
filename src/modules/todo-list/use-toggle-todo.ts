"use server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    // When mutate is called:
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [todoListApi.basekey] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
      );

      // Optimistically update to the new value
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo,
          ),
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [todoListApi.basekey] });
    },
  });

  const toggleTodo = (id: string, done: boolean) => {
    updateTodoMutation.mutate({
      id,
      done: !done,
    });
  };

  return { toggleTodo };
};
