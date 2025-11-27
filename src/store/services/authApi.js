import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Example API slice using RTK Query. Update `baseUrl` and endpoints as needed.

const baseUrl = "http://10.10.13.22:8000";
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
    getUsers: builder.query({
      query: () => "/users",
    }),
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
