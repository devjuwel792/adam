import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import { sub } from "date-fns";

// Dispute Management API slice

export const disputeManagementApi = createApi({
  reducerPath: "disputeManagementApi",
  tagTypes: ["Disputes"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // GET all reports lists for admin dispute management
    getReportsList: builder.query({
      query: () => "/accounts/admin/reports/list/",
      providesTags: ["Reports"],
    }),

    // GET report details by ID
    getReportDetails: builder.query({
      query: (reportId) => `/accounts/admin/reports/${reportId}/`,
      providesTags: ["Reports"],
    }),

    // POST - Send Summary To Both Parties
    submitReportSummary: builder.mutation({
      query: ({ reportId, ...body }) => ({
        url: `/accounts/admin/report/${reportId}/send-message/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reports"],
    }),

    // POST - Do Action Against Reported User
    takeReportAction: builder.mutation({
      query: ({ reportId, actionType, ...body }) => ({
        url: `/accounts/admin/report/${reportId}/action/${actionType}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetReportsListQuery,
  useGetReportDetailsQuery,
  useSubmitReportSummaryMutation,
  useTakeReportActionMutation,
} = disputeManagementApi;
