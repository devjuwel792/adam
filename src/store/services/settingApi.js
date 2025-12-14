import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

// Setting API slice

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => "/dashboard/terms-and-conditions/",
    }),
    updateTermsAndConditions: builder.mutation({
      query: (body) => ({
        url: "/dashboard/terms-and-conditions/",
        method: "PATCH",
        body,
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => "/dashboard/privacy-policy/",
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (body) => ({
        url: "/dashboard/privacy-policy/",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} = settingApi;
