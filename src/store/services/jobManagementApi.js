import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

// Job Management API slice
const baseUrl = import.meta.env.VITE_BASE_URL;

export const jobManagementApi = createApi({
  reducerPath: "jobManagementApi",
  tagTypes: ['Jobs'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getJobsList: builder.query({
      query: () => "/dashboard/jobs/list/",
      providesTags: ['Jobs'],
    }),
    getJobDetail: builder.query({
      query: (id) => `/dashboard/jobs/${id}/detail/`,
    }),
    updateJobStatus: builder.mutation({
      query: ({ id, active_status }) => ({
        url: `/dashboard/jobs/${id}/update-status/`,
        method: 'POST',
        body: { active_status },
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetJobsListQuery, useGetJobDetailQuery, useUpdateJobStatusMutation } = jobManagementApi;
