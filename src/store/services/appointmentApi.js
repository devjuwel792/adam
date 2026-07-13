import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    getServicePackages: builder.query({
      query: () => "/appointments/service-packages/",
    }),
    getAppointmentList: builder.query({
      query: () => "/appointments/list/",
      providesTags: ["Appointments"],
    }),
    getAppointmentDetail: builder.query({
      query: (id) => `/appointments/detail/${id}/`,
      providesTags: (result, error, id) => [{ type: "Appointments", id }],
    }),
    getAllPhlebotomists: builder.query({
      query: () => "/dashboard/appointment-managements/all-phlebotomists/",
    }),
    assignPhlebotomist: builder.mutation({
      query: ({ appointment_id, user_id }) => ({
        url: `/dashboard/appointment-managements/${appointment_id}/assign/`,
        method: "POST",
        body: { user_id },
      }),
      invalidatesTags: ["Appointments"],
    }),
    createAppointment: builder.mutation({
      query: (body) => ({
        url: "/appointments/create/",
        method: "POST",
        body,
        formData: true,
      }),
    }),
    confirmPaymentSuccess: builder.query({
      query: (params) => ({
        url: "/appointments/payment-success/",
        params,
      }),
    }),
  }),
});

export const {
  useGetServicePackagesQuery,
  useGetAppointmentListQuery,
  useGetAppointmentDetailQuery,
  useGetAllPhlebotomistsQuery,
  useAssignPhlebotomistMutation,
  useCreateAppointmentMutation,
  useConfirmPaymentSuccessQuery,
} = appointmentApi;
