import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobMatchingApi = createApi({
  reducerPath: "jobMatchingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.10.13.22:8900" }),
  endpoints: (builder) => ({
    getJobMatchingList: builder.query({
      query: () => "/dashboard/jobs/matching/list/",
    }),
    getAvailablePhlebotomists: builder.query({
      query: () => "/dashboard/jobs/matching/phlebotomists/available/",
    }),
    getPhlebotomistProfile: builder.query({
      query: (id) => `/dashboard/jobs/matching/phlebotomist/${id}/profile/`,
    }),
    assignJobToPhlebotomist: builder.mutation({
      query: (body) => ({
        url: "/dashboard/jobs/matching/phlebotomist/assign/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetJobMatchingListQuery,
  useGetAvailablePhlebotomistsQuery,
  useGetPhlebotomistProfileQuery,
  useAssignJobToPhlebotomistMutation,
} = jobMatchingApi;
