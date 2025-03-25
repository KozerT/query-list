"use server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useSuspenseUser } from "../auth/use-user";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const user = useSuspenseUser();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    //invalidation onSettled
    async onSettled() {
      queryClient.invalidateQueries({ queryKey: [todoListApi.basekey] });
    },
    //Pessimistic updates (modifying cache right after mutation passes)
    async onSuccess(_, deletedId) {
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey,
        (todos) => todos?.filter((todo) => todo.id !== deletedId),
      );
    },
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
};
