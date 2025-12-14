import { FaCalendar, FaCalendarCheck, FaLocationDot } from "react-icons/fa6";
import { HiDocumentPlus } from "react-icons/hi2";
import { PiTestTubeFill } from "react-icons/pi";
import { FaStar, FaUsers } from "react-icons/fa";
import AvatarImage from "../../assets/images/Image-52.png";
import { useGetAppointmentDetailsQuery } from "../../store/services/patientManagementApi";

const AppointmentDetails = ({ isOpen, onClose, appointmentId }) => {
  const { data: appointmentData, isLoading, error } = useGetAppointmentDetailsQuery(appointmentId, { skip: !appointmentId });

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <p className="text-center">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <p className="text-center text-red-500">Error loading appointment details: {error.message}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white  shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-end p-4 ">
          <button
            onClick={onClose}
            className="text-gray-600 text-2xl  h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Patient Information */}
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Patient Information
              </h3>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-black font-semibold">Name:</span>
                  <div className="font-medium ">{appointmentData?.patient_full_name || 'N/A'}</div>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-semibold">ID:</span>
                  <div className="font-medium">{appointmentId || 'N/A'}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <div className="font-medium">{appointmentData?.patient_contact || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Time:</span>
                  <div className="font-medium">{appointmentData?.request_time || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Age:</span>
                  <div className="font-medium">{appointmentData?.patient_age || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <div className="font-medium">{appointmentData?.request_date || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Medical Information
              </h3>
              {appointmentData?.prescription ? (
                <div className="bg-blue-50 border-blue-100 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium text-blue-800 flex items-center gap-2 ">
                          <HiDocumentPlus /> {appointmentData.prescription}
                        </div>
                        <div className="text-xs text-blue-500">
                          Uploaded recently
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2  text-blue-600 rounded-lg text-sm ">
                      View
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-gray-100 p-4 rounded-lg mb-4">
                  <div className="text-sm text-gray-600">No prescription available</div>
                </div>
              )}
              <div className=" p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  Special Instructions
                </div>
                <div className="text-sm text-gray-800">
                  {appointmentData?.special_instruction || 'No special instructions provided'}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Location
              </h3>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 text-[#C9A14A] mt-1">
                  <FaLocationDot />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Patient's Home
                  </div>
                  <div className="text-sm text-gray-600">
                    Oak Oak Street, Apt 5B
                  </div>
                  <div className="text-sm text-gray-600">
                    Springfield, IL 62701
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Client Information */}
          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <div className="bg-[#f1f1f1] p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Client Information
                </h3>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      <img
                        className="w-full"
                        src={AvatarImage}
                        alt="AvatarImage"
                      />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#003366]">
                      {appointmentData?.client_name || 'Community Health Center'}
                    </p>
                    <div className="text-sm text-gray-600">Healthcare</div>
                  </div>
                </div>
                <div className="flex  items-center justify-between gap-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">
                        <FaStar />
                      </span>
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-600">(107 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">
                        <FaUsers />
                      </span>
                      <span className="text-gray-600">250+ employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">
                        <FaCalendarCheck />
                      </span>
                      <span className="text-gray-600">Member since 2019</span>
                    </div>
                  </div>

                  <button className="mt-4 px-4 py-2 border bg-white border-[#C9A14A] text-[#C9A14A] rounded-lg text-sm hover:bg-gray-100">
                    View Client Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="shadow-sm border border-gray-100 p-6 rounded-lg bg-[#f9fafb]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Service Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">
                    {appointmentData?.service_name || 'N/A'}
                  </span>
                  <button className="text-[#C9A14A]">
                    <PiTestTubeFill className="text-xl" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Complete Blood Count (CBC), Lipid Profile, Glucose Test
                </div>
                <div className="text-sm text-gray-600">
                  Estimated duration: 45 minutes
                </div>
              </div>
            </div>

            {/* Service Overview */}
            <div className="bg-[#eff6ff]   p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Service Overview
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{appointmentData?.service_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-600">
                    {appointmentData?.request_date || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-600">{appointmentData?.request_time || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-xl font-bold text-[#C9A14A]">
                    ${appointmentData?.total_amount || '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AppointmentDetails;
