import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Example API slice using RTK Query. Update `baseUrl` and endpoints as needed.

const baseUrl = import.meta.env.VITE_BASE_URL;
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      if (getState().auth.token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    // Add more endpoints here
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery, useLoginMutation } = api;
