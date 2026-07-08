import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
