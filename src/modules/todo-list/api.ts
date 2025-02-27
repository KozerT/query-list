const BASE_URL = "http://localhost:3000";

export interface TodoDto {
  id: string;
  text: string;
  done: boolean;
}
export const TodoListApi = {
  getTodoList: ({ signal }: { signal: AbortSignal }) => {
    return fetch(`${BASE_URL}/tasks`, {
      signal,
    }).then((res) => res.json() as Promise<TodoDto[]>);
  },
};
