import { Login } from "../modules/auth/login";
import { LogoutButton } from "../modules/auth/logout-btn";
import { useUser } from "../modules/auth/use-user";
import { prefetchTodoList } from "../modules/todo-list/prefetch";
import { TodoList } from "../modules/todo-list/todo-list";

export const App = () => {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    prefetchTodoList();
    return (
      <>
        <LogoutButton />
        <TodoList />
      </>
    );
  }

  return <Login />;
};
