import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useCallback, useRef } from "react";

export const useTodoList = () => {
  const {
    data: toDoItems,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfinityQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className="flex gap-2 mt-4" ref={cursorRef}>
      {!hasNextPage && <div>No data available</div>}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );

  return {
    toDoItems,
    error,
    isLoading,
    cursor,
    isFetching,
  };
};

export const useIntersection = (onIntersect: () => void) => {
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
