import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Job Management API slice
const baseUrl = import.meta.env.VITE_BASE_URL;

export const disputeManagementApi = createApi({
  reducerPath: "disputeManagementApi",
  tagTypes: ["Disputes"],
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
    // GET all reports lists for admin dispute management
    getReportsList: builder.query({
      query: () => "/accounts/admin/reports/list/",
      providesTags: ["Reports"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetReportsListQuery } = disputeManagementApi;
