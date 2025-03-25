import { useSuspenseQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useSuspenseUser } from "../auth/use-user";

export const useTodoList = () => {
  const user = useSuspenseUser();
  const { data: toDoItems, refetch } = useSuspenseQuery({
    ...todoListApi.getTodoListQueryOptions({ userId: user.data.id }),
    select: (data) => (data ? data.toReversed() : undefined),
  });

  return {
    toDoItems,
    refetch,
  };
};
