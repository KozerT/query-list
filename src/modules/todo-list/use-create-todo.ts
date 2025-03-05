"use server";
import { useAppDispatch } from "../../shared/api/redux";
import { createTodoThunk, useCreateLoading } from "./create-todo-thunk";

export const useCreateTodo = () => {
  const appDispatch = useAppDispatch();
  const isLoading = useCreateLoading();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    await appDispatch(createTodoThunk(text));
    e.currentTarget.reset();
  };

  return { handleCreate, isLoading };
};
