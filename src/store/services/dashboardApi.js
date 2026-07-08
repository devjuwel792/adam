import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard", "PendingRegistrations", "PendingDocuments", "UserDetails"],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "/dashboard/home/",
      providesTags: ["Dashboard"],
    }),
    getPendingRegistrations: builder.query({
      query: () => "/dashboard/home/pending-registrations/",
      providesTags: ["PendingRegistrations"],
    }),
    getUserDetailsForApproval: builder.query({
      query: (user_id) => `/dashboard/home/user-details-for-approval/${user_id}`,
      providesTags: (result, error, user_id) => [{ type: "UserDetails", id: user_id }],
    }),
    approveUser: builder.mutation({
      query: ({ user_id, approve }) => ({
        url: `/dashboard/home/user-approval/${user_id}/`,
        method: "PATCH",
        body: { approve },
      }),
      invalidatesTags: ["PendingRegistrations", "Dashboard"],
    }),
    suspendUnsuspendUser: builder.mutation({
      query: ({ user_id, suspend }) => ({
        url: `/dashboard/home/suspend-unsuspend/${user_id}/`,
        method: "PATCH",
        body: { suspend },
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getPendingDocuments: builder.query({
      query: () => "/dashboard/home/pending-documents/",
      providesTags: ["PendingDocuments"],
    }),
    approveDocument: builder.mutation({
      query: ({ user_id, document_id, approve }) => ({
        url: `/dashboard/home/doc-approval/${user_id}/${document_id}/`,
        method: "PATCH",
        body: { approve },
      }),
      invalidatesTags: ["PendingDocuments", "Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetPendingRegistrationsQuery,
  useGetUserDetailsForApprovalQuery,
  useApproveUserMutation,
  useSuspendUnsuspendUserMutation,
  useGetPendingDocumentsQuery,
  useApproveDocumentMutation,
} = dashboardApi;
