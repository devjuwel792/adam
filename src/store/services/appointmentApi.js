import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getServicePackages: builder.query({
      query: () => "/appointments/service-packages/",
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

export const { useGetServicePackagesQuery, useCreateAppointmentMutation } =
  appointmentApi;
