import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TodoListApi } from "./api";
import { useState } from "react";

export const TodoList = () => {
  const [page, setPage] = useState(1);
  const [enabled, setEnabled] = useState(true);

  const {
    data: toDoItems,
    error,
    isPending,
    isLoading,
    status,
    isFetching,
    fetchStatus,
  } = useQuery({
    queryKey: ["tasks, list", { page }],
    queryFn: (meta) => TodoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData, // for temporary
    enabled: enabled,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline text-center">Todo List</h1>
      <div
        className={
          "flex flex-col gap-4 justify-center items-center my-10" +
          (isFetching ? " opacity-45" : "")
        }
      >
        <button onClick={() => setEnabled((e) => !e)} className="">
          {enabled ? "disable" : "enable"}{" "}
        </button>
        {toDoItems?.data.map((todo) => (
          <div
            key={todo.id}
            className="border border-slate-400 rounded p-3 w-1/3 text-center"
          >
            {todo.text}
          </div>
        ))}

        <div className="flex gap-6 justify-center w-full items-center mt-4">
          <button
            className="p-3 rounded border border-slate-400"
            onClick={() => {
              setPage((p) => Math.max(p - 1, 1));
            }}
          >
            prev
          </button>
          <button
            className="p-3 rounded border border-slate-400"
            onClick={() => {
              setPage((p) => Math.min(p + 1, toDoItems?.pages || 1));
            }}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};
