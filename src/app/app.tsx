import { useQueryClient } from "@tanstack/react-query";
import { Login } from "../modules/auth/login";
import { LogoutButton } from "../modules/auth/logout-btn";
import { useUser } from "../modules/auth/use-user";
import { TodoList } from "../modules/todo-list/todo-list";
import { todoListApi } from "../modules/todo-list/api";

export const App = () => {
  const user = useUser();
  const queryClient = useQueryClient();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    queryClient.prefetchQuery(
      todoListApi.getTodoListQueryOptions({ userId: user.data.id }),
    );
    return (
      <>
        <LogoutButton />
        <TodoList />
      </>
    );
  }

  return <Login />;
};
