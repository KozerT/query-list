import { useInfiniteQuery } from "@tanstack/react-query";
import { TodoListApi } from "./api";
import { useCallback, useRef, useState } from "react";

export const TodoList = () => {
  const [enabled, setEnabled] = useState(true);

  const {
    data: toDoItems,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["tasks, list"],
    queryFn: (meta) => TodoListApi.getTodoList({ page: meta.pageParam }, meta),
    enabled: enabled,
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
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
        {toDoItems?.map((todo) => (
          <div
            key={todo.id}
            className="border border-slate-400 rounded p-3 md:w-1/2 sm:w-full text-center"
          >
            {todo.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4" ref={cursorRef}>
        {!hasNextPage && <div>No data available</div>}
        {isFetchingNextPage && <div>Loading...</div>}
      </div>
    </div>
  );
};

const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});
  return useCallback(
    (element: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });

      if (element) {
        observer.observe(element);
        unsubscribe.current = () => observer.disconnect();
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect],
  );
};
