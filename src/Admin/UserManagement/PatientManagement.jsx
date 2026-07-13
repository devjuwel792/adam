import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useGetAppointmentListQuery } from "../../store/services/appointmentApi";
import AppointmentDetails from "./AppointmentDetails";

const statusClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "booked": return "bg-blue-100 text-blue-700";
    case "completed": return "bg-green-100 text-green-700";
    case "cancelled": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-600";
  }
};

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const { data: appointmentsData, isLoading, error } = useGetAppointmentListQuery();

  const filteredAppointments = (appointmentsData?.results || appointmentsData || []).filter((a) => {
    const fullName = `${a.patient?.first_name ?? ""} ${a.patient?.last_name ?? ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ fontFamily: "Montserrat" }} className="w-full mx-auto mt-6 bg-white rounded-lg shadow-sm">
      {/* Header with Search */}
      <div className="p-6 border rounded-md border-gray-200">
        <div className="relative w-fit">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {isLoading && <div className="p-12 text-center text-gray-500">Loading appointments...</div>}
      {error && <div className="p-12 text-center text-red-500">Failed to load appointments.</div>}

      <div className="space-y-3 my-6">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="mx-6 p-4 rounded-md bg-[#f6f6f6] hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {appointment.patient?.first_name} {appointment.patient?.last_name}
                </h3>
                <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-500">
                  <span>ID: #{appointment.id}</span>
                  <span>{appointment.patient?.email}</span>
                  <span>{appointment.patient?.phone_number}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-500">
                  <span>Date: {appointment.appointment_date}</span>
                  <span>Time: {appointment.start_time}</span>
                  <span className="capitalize">Location: {appointment.location_type}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Service: {appointment.service_package?.name}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusClass(appointment.status)}`}>
                  {appointment.status}
                </span>
                <button
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                  className="px-3 flex gap-1 items-center py-1 bg-[#C9A14A] text-white text-sm rounded-md"
                >
                  <FaEye /> View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && !error && filteredAppointments.length === 0 && (
        <div className="p-12 text-center text-gray-500">No appointments found.</div>
      )}

      <AppointmentDetails
        isOpen={!!selectedAppointmentId}
        onClose={() => setSelectedAppointmentId(null)}
        appointmentId={selectedAppointmentId}
      />
    </div>
  );
};

export default PatientManagement;
