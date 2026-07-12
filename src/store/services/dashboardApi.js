import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard", "PendingRegistrations", "PendingDocuments", "UserDetails", "Jobs", "Users", "Disputes", "Reviews", "Payroll", "JobMatching", "Terms", "Analytics", "Chats"],
  endpoints: (builder) => ({
    getChatList: builder.query({
      query: () => "/communication/chats/",
      providesTags: ["Chats"],
    }),
    getChatMessages: builder.query({
      query: (partnerId) => `/communication/chats/${partnerId}/`,
      providesTags: (result, error, partnerId) => [{ type: "Chats", id: partnerId }],
    }),
    getAnalytics: builder.query({
      query: ({ job_type = "", business_name = "" } = {}) => {
        const params = new URLSearchParams();
        if (job_type && job_type !== "All") params.append("job_type", job_type);
        if (business_name && business_name !== "All") params.append("business_name", business_name);
        const qs = params.toString();
        return `/dashboard/analytics-reporting/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Analytics"],
    }),
    getDashboardData: builder.query({
      query: () => "/dashboard/home/",
      providesTags: ["Dashboard"],
    }),
    getTermsAndConditions: builder.query({
      query: () => "/dashboard/admin/terms-and-conditions/",
      providesTags: ["Terms"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: (body) => ({
        url: "/dashboard/admin/terms-and-conditions/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Terms"],
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
        url: `/dashboard/job-managements/${job_id}/update-status/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Jobs"],
    }),
    getDisputeStatistics: builder.query({
      query: () => "/dashboard/dispute-statistics/",
      providesTags: ["Disputes"],
    }),
    getDisputesList: builder.query({
      query: () => "/dashboard/disputes/",
      providesTags: ["Disputes"],
    }),
    getDisputeDetail: builder.query({
      query: (report_id) => `/dashboard/disputes/${report_id}/`,
      providesTags: (result, error, report_id) => [{ type: "Disputes", id: report_id }],
    }),
    updateDispute: builder.mutation({
      query: ({ report_id, ...body }) => ({
        url: `/dashboard/disputes/${report_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { report_id }) => [
        { type: "Disputes", id: report_id },
        "Disputes",
      ],
    }),
    getJobMatchingList: builder.query({
      query: () => "/dashboard/job-matching/",
      providesTags: ["JobMatching"],
    }),
    assignJob: builder.mutation({
      query: ({ job_id, phlebotomist_id }) => ({
        url: "/dashboard/job-matching/",
        method: "POST",
        body: { job_id, phlebotomist_id },
      }),
      invalidatesTags: ["JobMatching"],
    }),
    getAvailableUsers: builder.query({
      query: () => "/dashboard/job-matching/available-users/",
      providesTags: ["JobMatching"],
    }),
    getAvailableUserDetail: builder.query({
      query: (id) => `/dashboard/job-matching/available-users/${id}/`,
      providesTags: (result, error, id) => [{ type: "JobMatching", id }],
    }),
    getPayrollList: builder.query({
      query: () => "/dashboard/payroll/",
      providesTags: ["Payroll"],
    }),
    getPayrollDetail: builder.query({
      query: (job_id) => `/dashboard/payroll/${job_id}/`,
      providesTags: (result, error, job_id) => [{ type: "Payroll", id: job_id }],
    }),
    confirmPayment: builder.mutation({
      query: (job_id) => ({
        url: `/dashboard/payroll/${job_id}/`,
        method: "POST",
      }),
      invalidatesTags: ["Payroll"],
    }),
    getReviewsList: builder.query({
      query: () => "/dashboard/reviews/",
      providesTags: ["Reviews"],
    }),
    getReviewDetail: builder.query({
      query: (id) => `/dashboard/reviews/${id}/`,
      providesTags: (result, error, id) => [{ type: "Reviews", id }],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/dashboard/reviews/${id}/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Reviews", id }, "Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/dashboard/reviews/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
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
  useGetChatListQuery,
  useGetChatMessagesQuery,
  useGetAnalyticsQuery,
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
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
  useGetDisputeStatisticsQuery,
  useGetDisputesListQuery,
  useGetDisputeDetailQuery,
  useUpdateDisputeMutation,
  useGetJobMatchingListQuery,
  useAssignJobMutation,
  useGetAvailableUsersQuery,
  useGetAvailableUserDetailQuery,
  useGetPayrollListQuery,
  useGetPayrollDetailQuery,
  useConfirmPaymentMutation,
  useGetReviewsListQuery,
  useGetReviewDetailQuery,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
  useGetUsersListQuery,
  useGetUserDetailQuery,
  useEditUserMutation,
} = dashboardApi;
