import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Login"],
  endpoints: build => ({
    login: build.mutation({
      query(body) {
        return {
          url: "/auth/admin-login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Login"],
    }),
  }),
});

export const { useLoginMutation } = adminApi;
