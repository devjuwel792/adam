import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dashboard API slice
const baseUrl = import.meta.env.VITE_BASE_URL;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
    getDashboardData: builder.query({
      query: () => "/dashboard/data/",
    }),
    getPendingPhlebotomists: builder.query({
      query: () => "/dashboard/phlebotomists/pending/list/",
      providesTags: ["PhlebotomistsPending"],
    }),
    getPendingBusinessOwners: builder.query({
      query: () => "/dashboard/business-owners/pending/list/",
      providesTags: ["PendingBusinessOwners"],
    }),
    getPendingPhlebotomistDetails: builder.query({
      query: (id) => `/dashboard/phlebotomists/pending/${id}/profile/view/`,
    }),
    approveRejectBusinessProfile: builder.mutation({
      query: (body) => ({
        url: "/dashboard/business-owners/profile/approve-reject/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PendingBusinessOwners"],
    }),
    approveRejectProfile: builder.mutation({
      query: (body) => ({
        url: "/dashboard/phlebotomists/profile/approve-reject/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PhlebotomistsPending"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetDashboardDataQuery,
  useGetPendingPhlebotomistsQuery,
  useGetPendingBusinessOwnersQuery,
  useGetPendingPhlebotomistDetailsQuery,
  useApproveRejectProfileMutation,
  useApproveRejectBusinessProfileMutation,
} = dashboardApi;
