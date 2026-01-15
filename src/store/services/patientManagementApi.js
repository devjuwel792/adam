import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

// Patient Management API slice

export const patientManagementApi = createApi({
  reducerPath: "patientManagementApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAppointmentsList: builder.query({
      query: () => "/accounts/admin/appointments/view/list/",
    }),
    getAppointmentDetails: builder.query({
      query: (appointmentId) => `/accounts/admin/appointment/${appointmentId}/details/`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAppointmentsListQuery, useGetAppointmentDetailsQuery } = patientManagementApi;
