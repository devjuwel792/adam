import { useState } from "react";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { HiDocumentPlus } from "react-icons/hi2";
import { PiTestTubeFill } from "react-icons/pi";
import toast from "react-hot-toast";
import {
  useGetAppointmentDetailQuery,
  useGetAllPhlebotomistsQuery,
  useAssignPhlebotomistMutation,
} from "../../store/services/appointmentApi";

const AppointmentDetails = ({ isOpen, onClose, appointmentId }) => {
  const [selectedPhlebotomistId, setSelectedPhlebotomistId] = useState("");

  const { data, isLoading, error } = useGetAppointmentDetailQuery(appointmentId, {
    skip: !appointmentId,
  });
  const { data: phlebotomistsData } = useGetAllPhlebotomistsQuery(undefined, {
    skip: !isOpen,
  });
  const [assignPhlebotomist, { isLoading: isAssigning }] = useAssignPhlebotomistMutation();

  const phlebotomists = phlebotomistsData?.results ?? [];

  const handleAssign = async () => {
    if (!selectedPhlebotomistId) return toast.error("Please select a phlebotomist.");
    try {
      await assignPhlebotomist({ appointment_id: appointmentId, user_id: Number(selectedPhlebotomistId) }).unwrap();
      toast.success("Phlebotomist assigned successfully.");
      setSelectedPhlebotomistId("");
    } catch {
      toast.error("Failed to assign phlebotomist.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-600 text-2xl h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"
          >
            ×
          </button>
        </div>

        {isLoading && <div className="p-10 text-center text-gray-500">Loading appointment details...</div>}
        {error && <div className="p-10 text-center text-red-500">Failed to load appointment details.</div>}

        {!isLoading && !error && data && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Patient Information */}
              <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{data.patient?.first_name} {data.patient?.last_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{data.patient?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{data.patient?.phone_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium">{data.patient?.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium capitalize">{data.patient?.gender}</span>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>

                {data.prescription ? (
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-800 font-medium text-sm">
                      <HiDocumentPlus />
                      Prescription attached
                    </div>
                    <a
                      href={data.prescription}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm px-3 py-1 border border-blue-300 rounded"
                    >
                      View
                    </a>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-gray-500">No prescription available</div>
                )}

                <div className="space-y-2 text-sm">
                  {data.current_medications && (
                    <div>
                      <span className="text-gray-600 font-medium">Current Medications:</span>
                      <p className="text-gray-800 mt-1">{data.current_medications}</p>
                    </div>
                  )}
                  {data.known_allergies && (
                    <div>
                      <span className="text-gray-600 font-medium">Known Allergies:</span>
                      <p className="text-gray-800 mt-1">{data.known_allergies}</p>
                    </div>
                  )}
                  {data.medical_conditions && (
                    <div>
                      <span className="text-gray-600 font-medium">Medical Conditions:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(Array.isArray(data.medical_conditions)
                          ? data.medical_conditions
                          : data.medical_conditions.split(",")
                        ).map((c, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{c.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.special_requests && (
                    <div>
                      <span className="text-gray-600 font-medium">Special Requests:</span>
                      <p className="text-gray-800 mt-1">{data.special_requests}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
                <div className="flex items-start gap-3">
                  <FaLocationDot className="text-[#C9A14A] mt-1 text-lg" />
                  <div>
                    <p className="font-medium text-gray-800 capitalize">{data.location_type}</p>
                    <p className="text-sm text-gray-600">{data.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Service Details */}
              <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{data.service_package?.name}</span>
                  <PiTestTubeFill className="text-[#C9A14A] text-xl" />
                </div>
                <p className="text-sm text-gray-600 mb-3">{data.service_package?.description}</p>
                {data.service_package?.features?.length > 0 && (
                  <div className="space-y-1">
                    {data.service_package.features.map((f) => (
                      <div key={f.id} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A14A] inline-block" />
                        {f.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Service Overview */}
              <div className="bg-[#eff6ff] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Overview</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{data.service_package?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{data.appointment_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-medium">{data.start_time}</span>
                  </div>
                  {data.end_time && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Time:</span>
                      <span className="font-medium">{data.end_time}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">{data.status}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-xl font-bold text-[#C9A14A]">
                      ${data.service_package?.price ?? "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Notification Preferences</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Result Notification:</span>
                    <span className={data.email_result_notification ? "text-green-600 font-medium" : "text-gray-400"}>
                      {data.email_result_notification ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SMS Appointment Reminders:</span>
                    <span className={data.sms_appointment_reminders ? "text-green-600 font-medium" : "text-gray-400"}>
                      {data.sms_appointment_reminders ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Assign Phlebotomist */}
              <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assign Phlebotomist</h3>
                <div className="space-y-3">
                  {phlebotomists.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPhlebotomistId(String(p.id))}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPhlebotomistId === String(p.id)
                          ? "border-[#C9A14A] bg-amber-50"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {p.profile_picture
                          ? <img src={p.profile_picture} alt={p.full_name} className="w-full h-full object-cover" />
                          : <span className="text-gray-600 font-semibold text-sm">{p.full_name?.charAt(0)}</span>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm">{p.full_name}</p>
                        <p className="text-xs text-gray-500 capitalize">{p.specialty?.replace(/_/g, " ")} · {p.service_area}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <FaStar className="text-yellow-400 text-xs" />
                          <span className="text-xs text-gray-500">{p.avg_rating} ({p.total_review_count} reviews)</span>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        p.availability_status === "Available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {p.availability_status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAssign}
                  disabled={isAssigning || !selectedPhlebotomistId}
                  className="mt-4 w-full bg-[#C9A14A] text-white font-medium py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isAssigning ? "Assigning..." : "Assign Phlebotomist"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
