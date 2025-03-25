import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      gcTime: 1000 * 60 * 60 * 24, // garbage collection time,
      retry: 0,
    },
  },
});
