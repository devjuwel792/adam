import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Setting API slice
const baseUrl = import.meta.env.VITE_BASE_URL;

export const settingApi = createApi({
  reducerPath: "settingApi",
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
