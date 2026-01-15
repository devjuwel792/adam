import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const jobMatchingApi = createApi({
  reducerPath: "jobMatchingApi",
  baseQuery: baseQueryWithReauth,
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
