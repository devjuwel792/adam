import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Job Management API slice
const baseUrl = "http://10.10.13.22:8000";

export const jobManagementApi = createApi({
  reducerPath: "jobManagementApi",
  tagTypes: ['Jobs'],
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
