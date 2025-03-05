import { useSuspenseQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const { data: toDoItems, refetch } = useSuspenseQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: (data) => (data ? data.toReversed() : undefined),
  });

  return {
    toDoItems,
    refetch,
  };
};
