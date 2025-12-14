import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

// Communication & Reviews API slice
const baseUrl = import.meta.env.VITE_BASE_URL;

export const communicationApi = createApi({
  reducerPath: "communicationApi",
  tagTypes: ["Communication", "InappropriateMessages"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Get Report Message List
    getInappropriateMessages: builder.query({
      query: () => "/communication/admin/reports/inappropriate/",
      providesTags: ["InappropriateMessages"],
    }),

    // Get Single Report Message Details View
    getInappropriateMessageDetails: builder.query({
      query: (reportId) =>
        `/communication/admin/reports/inappropriate/${reportId}/`,
      providesTags: (result, error, reportId) => [
        { type: "InappropriateMessages", id: reportId },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetInappropriateMessagesQuery,
  useGetInappropriateMessageDetailsQuery,
} = communicationApi;
