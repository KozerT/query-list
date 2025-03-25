import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  userId: string;
};

export const todoListApi = {
  basekey: "tasks",
  getTodoListQueryOptions: ({ userId }: { userId: string }) => {
    return queryOptions({
      queryKey: [todoListApi.basekey, "list", userId],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/tasks?userId=${userId}`, {
          signal: meta.signal,
          json: false,
        }),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks, list"],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=4`,
          {
            signal: meta.signal,
            json: false,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>("/tasks", {
      method: "POST",
      json: data,
    });
  },

  updateTodo: (data: Partial<TodoDto> & { id: string }) => {
    return jsonApiInstance<TodoDto>(`/tasks/${data.id}`, {
      method: "PATCH",
      json: data,
    });
  },

  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: "DELETE",
      json: false,
    });
  },
};
