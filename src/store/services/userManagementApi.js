import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// User Management API slice
const baseUrl = "http://10.10.13.22:8000";

export const userManagementApi = createApi({
  reducerPath: "userManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      let token = getState()?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => "/dashboard/users/list/",
    }),
    getUserProfile: builder.query({
      query: (userId) => `/dashboard/users/${userId}/profile/`,
      providesTags: ['UserProfile'],
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/dashboard/users/${userId}/update-status/`,
        method: 'PATCH',
        body: { account_status: status },
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersListQuery, useGetUserProfileQuery, useUpdateUserStatusMutation } = userManagementApi;
