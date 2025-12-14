import { useState } from "react";
import { FaEye } from "react-icons/fa";
import {
  useGetAppointmentsListQuery,
} from "../../store/services/patientManagementApi";
import AppointmentDetails from "./AppointmentDetails";

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const { data: appointmentsData, isLoading, error } = useGetAppointmentsListQuery();

  const filteredAppointments = appointmentsData?.filter((appointment) =>
    appointment.user_full_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="w-full mx-auto mt-6 bg-white rounded-lg shadow-sm"
    >
      {/* Header with Search */}
      <div className="p-6 border rounded-md border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-12 mt-9 text-center">
          <p className="text-gray-500">Loading appointments...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-12 mt-9 text-center">
          <p className="text-red-500">Error loading appointments: {error.message}</p>
        </div>
      )}

      {/* Appointments List */}
      <div className="space-y-3 my-6">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.appointment_id}>
            <div className="p-6 rounded-md bg-[#f6f6f6] hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {appointment.user_full_name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">
                        Appointment ID: {appointment.appointment_id}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedAppointmentId(appointment.appointment_id);
                      setIsAppointmentOpen(true);
                    }}
                    className="px-3 flex gap-1 items-center justify-center py-1 bg-[#C9A14A] text-white text-sm rounded-md transition-colors"
                  >
                    <FaEye /> View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAppointments.length === 0 && !isLoading && (
        <div className="p-12 mt-9 text-center">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500">No appointments found matching your criteria</p>
        </div>
      )}

      <AppointmentDetails
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setSelectedAppointmentId(null);
        }}
        appointmentId={selectedAppointmentId}
      />
    </div>
  );
};

export default PatientManagement;
