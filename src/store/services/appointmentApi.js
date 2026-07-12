import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
      }),
    }),
  }),
});

export const {
  useGetServicePackagesQuery,
  useGetAppointmentListQuery,
  useGetAppointmentDetailQuery,
  useAssignPhlebotomistMutation,
  useCreateAppointmentMutation,
} = appointmentApi;
