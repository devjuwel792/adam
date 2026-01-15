import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

// User Management API slice

export const userManagementApi = createApi({
  reducerPath: "userManagementApi",
  baseQuery: baseQueryWithReauth,
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
