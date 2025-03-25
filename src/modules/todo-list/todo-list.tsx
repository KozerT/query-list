import { useTodoList } from "./use-todo-list";
import { useDeleteTodo } from "./use-delete-todo";
import { useToggleTodo } from "./use-toggle-todo";
import { useSuspenseUser } from "../auth/use-user";
import { useCreateTodo } from "./use-create-todo";

export const TodoList = () => {
  const { toDoItems } = useTodoList();
  const { data: user } = useSuspenseUser();

  const createToDo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline text-center">
        Todo List {user.login}
      </h1>
      <form
        onSubmit={createToDo.handleCreate}
        className="flex flex-col md:flex-row gap-4 justify-center items-center my-4 md:my-6"
      >
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Enter text"
          className="border border-slate-400 rounded p-3"
        />
        <button className="border border-slate-400 rounded  disabled:opacity-40 p-3">
          Create
        </button>
      </form>
      <div className={"flex flex-col gap-4 justify-center items-center my-10"}>
        {toDoItems?.map((todo) => (
          <div
            className="border border-slate-400 rounded p-3 md:w-1/2 sm:w-full text-center disabled:opacity-40 disabled:cursor-not-allowed flex justify-between  items-center h-full"
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id, todo.done)}
              className="size-4  cursor-pointer"
            />
            <span className="text-lg p-2 md:p-0">{todo.text}</span>
            <button
              disabled={deleteTodo.getIsPending(todo.id)}
              className="text-2xl cursor-pointer self-start"
              onClick={() => deleteTodo.handleDelete(todo.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
