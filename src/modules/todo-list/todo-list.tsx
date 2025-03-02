import { useMutation } from "@tanstack/react-query";
import { useTodoList } from "./use-todo-list";
import { todoListApi } from "./api";
import { nanoid } from "nanoid";

export const TodoList = () => {
  const { cursor, error, isLoading, toDoItems, isFetching } = useTodoList();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      text: text,
      userId: "1",
    });
    e.currentTarget.reset();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline text-center">Todo List</h1>
      <form
        onSubmit={handleCreate}
        method="POST"
        className="flex flex-col md:flex-row gap-4 justify-center items-center my-4 md:my-6"
      >
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Enter text"
          className="border border-slate-400 rounded p-3"
        ></input>
        <button className="border border-slate-400 rounded p-3">Create</button>
      </form>
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
