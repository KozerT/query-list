import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type UserDto = {
  id: string;
  login: string;
  password: string;
};

export const authApi = {
  basekey: "users",
  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [authApi.basekey, "byId", id],
      queryFn: (meta) =>
        jsonApiInstance<UserDto>(`/users/${id}`, {
          signal: meta.signal,
          json: false,
        }),
    });
  },

  loginUser: async (login: string, password: string) => {
    const r = await jsonApiInstance<UserDto[]>(
      `/users?login=${login}&password=${password}`,
      { json: false },
    );
    return r[0] as UserDto | undefined;
  },
};
