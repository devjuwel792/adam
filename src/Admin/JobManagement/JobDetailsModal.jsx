import { MessageCircle } from "lucide-react";
import {
  FaBriefcase,
  FaCalendar,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaLocationDot,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Avatar from "../../assets/images/Image-52.png";
import { toast } from "react-toastify";
import {
  useGetJobDetailQuery,
  useUpdateJobStatusMutation,
} from "../../store/services/dashboardApi";

const JobDetailsModal = ({ isOpen, jobId, onClose, onMessage }) => {
  const { data: job, isLoading, error } = useGetJobDetailQuery(jobId, {
    skip: !jobId || !isOpen,
  });
  const [updateJobStatus] = useUpdateJobStatusMutation();

  const handleDecision = async (status) => {
    try {
      await updateJobStatus({ job_id: jobId, status }).unwrap();
      toast.success(`Job ${status} successfully!`);
      onClose();
    } catch {
      toast.error(`Failed to update job status.`);
    }
  };

  if (!isOpen) return null;

  const CloseBtn = () => (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-10 relative">
          <CloseBtn />
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-10 relative">
          <CloseBtn />
          <p className="text-red-600">Error loading job details.</p>
        </div>
      </div>
    );

  const { header, job_description, payment_and_timeline, client_information, location_and_work_type, status } = job || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-[70vw] w-full max-h-[90vh] overflow-y-auto relative">
        <CloseBtn />

        {/* Header */}
        <div className="p-6 pt-16 border-b border-gray-200">
          <div className="border p-4 rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
              {header?.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>Job ID: {header?.job_id}</span>
              <span>Posted: {header?.posted_on}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                <FaBriefcase className="text-[#00A6A6]" />
                <span className="text-sm">{header?.job_type?.replace("_", " ")}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaDollarSign className="text-[#00A6A6]" />
                <span className="text-sm">
                  ${header?.pay_rate}/{header?.pay_type}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendar className="text-[#00A6A6]" />
                <span className="text-sm">Shift: {header?.shift_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-8">
            {/* Left */}
            <div className="space-y-6 flex-[2]">
              {/* Job Description */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h3>
                <p className="text-gray-600 leading-relaxed">{job_description}</p>
              </div>

              {/* Payment & Timeline */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment & Timeline
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pay Rate</p>
                    <p className="font-medium text-gray-900">
                      ${payment_and_timeline?.pay_rate}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      Per {payment_and_timeline?.pay_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Shift Duration</p>
                    <p className="font-medium text-gray-900">
                      {payment_and_timeline?.shift_duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Shift Date</p>
                    <p className="font-medium text-gray-900">
                      {payment_and_timeline?.shift_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Work Schedule</p>
                    <p className="font-medium text-gray-900">
                      {payment_and_timeline?.work_schedule}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Decision */}
              {status === "pending_approval" && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Review Decision
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDecision("open")}
                      className="bg-[#C9A14A] flex items-center gap-1 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      <FaCheck /> Approve Job
                    </button>
                    <button
                      onClick={() => handleDecision("cancelled")}
                      className="bg-white flex items-center gap-1 text-red-600 border border-red-600 px-4 py-2 rounded-lg font-medium"
                    >
                      <FaTimes /> Deny Job
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right */}
            <div className="space-y-6 flex-[1]">
              {/* Client Information */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Client Information
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <img src={Avatar} alt="" className="w-12 h-12 rounded-full" />
                  <div>
                    <h4 className="font-medium text-[#003366]">
                      {client_information?.business_name}
                    </h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {client_information?.business_type}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FaUsers className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {client_information?.no_of_employees}+ employees
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarCheck className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Member since {client_information?.member_since}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location & Work Type */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Location & Work Type
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaLocationDot className="w-4 h-4 text-teal-500" />
                    <span className="text-gray-700">
                      {location_and_work_type?.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-teal-500" />
                    <span className="text-gray-700">
                      {location_and_work_type?.work_schedule}
                    </span>
                  </div>
                </div>
              </div>

              {/* Need Clarification */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Need Clarification?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this job posting? Contact the client directly.
                </p>
                <button
                  onClick={() => { onMessage(); onClose(); }}
                  className="w-full bg-[#C9A14A] text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
