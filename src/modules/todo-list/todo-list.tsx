import { useQuery } from "@tanstack/react-query";
import { TodoListApi } from "./api";

export const TodoList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks, list"],
    queryFn: TodoListApi.getTodoList,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="bg-red-400 text-3xl  font-bold underline">
      {data?.map((todo) => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
};
