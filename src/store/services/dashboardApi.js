import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard", "PendingRegistrations", "PendingDocuments", "UserDetails", "Jobs", "Users"],
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
      query: (user_id) => `/dashboard/home/user-details-for-approval/${user_id}/`,
      providesTags: (result, error, user_id) => [{ type: "UserDetails", id: user_id }],
    }),
    approveUser: builder.mutation({
      query: ({ user_id, approve }) => ({
        url: `/dashboard/home/user-approval/${user_id}/`,
        method: "POST",
        body: { approve },
      }),
      invalidatesTags: ["PendingRegistrations", "Dashboard"],
    }),
    suspendUnsuspendUser: builder.mutation({
      query: ({ user_id, suspend }) => ({
        url: `/dashboard/home/suspend-unsuspend/${user_id}/`,
        method: "patch",
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
        method: "POST",
        body: { approve },
      }),
      invalidatesTags: ["PendingDocuments", "Dashboard"],
    }),
    getJobsList: builder.query({
      query: ({ search = "", status = "", date = "" } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (date) params.append("date", date);
        const qs = params.toString();
        return `/dashboard/job-managements/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Jobs"],
    }),
    getJobDetail: builder.query({
      query: (job_id) => `/dashboard/job-managements/${job_id}/`,
      providesTags: (result, error, job_id) => [{ type: "Jobs", id: job_id }],
    }),
    updateJobStatus: builder.mutation({
      query: ({ job_id, status }) => ({
        url: `/dashboard/job-managements/${job_id}/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Jobs"],
    }),
    getUsersList: builder.query({
      query: () => "/dashboard/user-managements/",
      providesTags: ["Users"],
    }),
    getUserDetail: builder.query({
      query: (user_id) => `/dashboard/user-managements/${user_id}/`,
      providesTags: (result, error, user_id) => [{ type: "Users", id: user_id }],
    }),
    editUser: builder.mutation({
      query: ({ user_id, body }) => ({
        url: `/dashboard/user-managements/${user_id}/edit/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { user_id }) => [
        { type: "Users", id: user_id },
        "Users",
      ],
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
  useGetJobsListQuery,
  useGetJobDetailQuery,
  useUpdateJobStatusMutation,
  useGetUsersListQuery,
  useGetUserDetailQuery,
  useEditUserMutation,
} = dashboardApi;
