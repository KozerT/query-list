import { useTodoList } from "./use-todo-list";

export const TodoList = () => {
  const { cursor, error, isLoading, toDoItems, isFetching } = useTodoList();

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
        {toDoItems?.map((todo) => (
          <div
            key={todo.id}
            className="border border-slate-400 rounded p-3 md:w-1/2 sm:w-full text-center"
          >
            {todo.text}
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
};
