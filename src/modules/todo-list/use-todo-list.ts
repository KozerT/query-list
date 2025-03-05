import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const {
    data: toDoItems,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: (data) => (data ? data.toReversed() : undefined),
  });

  return {
    toDoItems,
    error,
    isLoading,
    isFetching,
    refetch,
  };
};
