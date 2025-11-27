import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Job Management API slice
const baseUrl = "http://10.10.13.22:8000";

export const jobManagementApi = createApi({
  reducerPath: "jobManagementApi",
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
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetJobsListQuery } = jobManagementApi;
