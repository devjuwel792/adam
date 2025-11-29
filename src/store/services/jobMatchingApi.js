import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobMatchingApi = createApi({
  reducerPath: 'jobMatchingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.13.22:8000' }),
  endpoints: (builder) => ({
    getJobMatchingList: builder.query({
      query: () => '/dashboard/jobs/matching/list/',
    }),
  }),
});

export const { useGetJobMatchingListQuery } = jobMatchingApi;
