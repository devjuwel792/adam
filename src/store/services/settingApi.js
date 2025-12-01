import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Setting API slice
const baseUrl = "http://10.10.13.22:8000";

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
    getPrivacyPolicy: builder.query({
      query: () => "/dashboard/privacy-policy/",
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTermsAndConditionsQuery,
  useGetPrivacyPolicyQuery,
} = settingApi;
