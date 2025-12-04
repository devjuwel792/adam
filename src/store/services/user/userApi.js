import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.10.13.22:8000" }),
  endpoints: (builder) => ({
    // GET all services for landing page
    getServices: builder.query({
      query: () => "/accounts/get/all/service/list/",
      providesTags: ["Services"],
    }),

    // POST to create a service request
    createServiceRequest: builder.mutation({
      query: (body) => ({
        url: "/accounts/user/service/request/",
        method: "POST",
        body,
      }),
      // This will refetch queries with the 'Appointments' tag after a successful request.
      invalidatesTags: ["Appointments"],
    }),

    // POST to update billing and create Stripe checkout session
    updateBillingAndCreateStripeSession: builder.mutation({
      query: (body) => ({
        url: "/accounts/appointment/update-billing-and-create-stripe-checkout/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceRequestMutation,
  useUpdateBillingAndCreateStripeSessionMutation,
} = userApi;
