import {
  X,
  MapPin,
  Star,
  Users,
  Calendar,
  Clock,
  MessageCircle,
} from "lucide-react";
import { FaTimes, FaUsers } from "react-icons/fa";
import {
  FaBriefcase,
  FaCalculator,
  FaCalendar,
  FaCalendarCheck,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaLocationDot,
} from "react-icons/fa6";
import Avatar from "../../assets/images/Image-52.png";
import { useGetJobDetailQuery } from "../../store/services/jobManagementApi";

const JobDetailsModal = ({ isOpen, onClose, job, onMessage }) => {
  if (!isOpen) return null;

  const { data: jobDetail, isLoading, error } = useGetJobDetailQuery(job?.id, {
    skip: !job?.id,
  });

  const handleApprove = () => {
    console.log("Job approved:", job?.jobId);
    // Handle approval logic here
  };

  const handleDeny = () => {
    console.log("Job denied:", job?.jobId);
    // Handle denial logic here
  };

  const handleMessage = () => {
    console.log("Message client for job:", job?.jobId);
    // Handle messaging logic here
  };

  const handleViewClientProfile = () => {
    console.log("View client profile");
    // Handle view client profile logic here
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white max-w-[70vw] w-full max-h-[90vh] overflow-y-auto flex items-center justify-center">
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white max-w-[70vw] w-full max-h-[90vh] overflow-y-auto flex items-center justify-center">
          <p className="text-red-600">Error loading job details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white  max-w-[70vw] w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 ">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-[80px] border-b  border-gray-200">
          <div className="flex-1">
            <div className="border p-4 rounded-md shadow-sm">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Blood Draw Station
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>Job ID: #JOB-{jobDetail?.id}</span>
                <span>Posted: {new Date(jobDetail?.created_on).toLocaleDateString()}</span>
              </div>
                <div className="flex items-center justify-between space-x-4 ">
                <div className="flex items-center  gap-1">
                  <FaBriefcase className="text-[#00A6A6]" />
                  <span className=" py-1 text-sm ">{jobDetail?.job_types} {jobDetail?.profession_type}</span>
                </div>
                <div className="flex items-center  gap-1">
                  <FaDollarSign className="text-[#00A6A6]" />
                  <span className=" py-1 text-sm ">${jobDetail?.pay_rate}/{jobDetail?.pay_type}</span>
                </div>

                <div className="flex items-center gap-1">
                  <FaCalendar className="text-[#00A6A6]" />
                  <span className=" py-1 text-sm ">Start: {new Date(jobDetail?.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex  gap-8">
            {/* Left Column */}
            <div className="space-y-6 flex-[2]">
              {/* Job Description */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A phlebotomist is responsible for the collection of blood
                  samples from patients for diagnostic testing, blood donations,
                  or medical procedures. This role is critical in ensuring the
                  proper handling, labeling, and delivery of blood samples to
                  the laboratory for analysis.
                </p>
              </div>

              {/* Payment & Timeline */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment & Timeline
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                    <p className="font-medium text-gray-900">$30</p>
                    <p className="text-xs text-gray-500">Per Hour</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Contract Duration
                    </p>
                    <p className="font-medium text-gray-900">1day</p>
                    <p className="text-xs text-gray-500">Full-time position</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Start Date</p>
                    <p className="font-medium text-gray-900">Aug 15, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Work Schedule</p>
                    <p className="font-medium text-gray-900">08 hrs</p>
                  </div>
                </div>
              </div>

              {/* Review Decision */}
              <div className="border  rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Review Decision
                </h3>
                <p className="text-sm text-gray-600 mb-4">Decision</p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleApprove}
                    className=" bg-[#C9A14A] flex items-center gap-1 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <FaCheck /> Approve Profile
                  </button>
                  <button
                    onClick={handleDeny}
                    className=" bg-white  flex items-center gap-1 text-red-600 border border-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <FaTimes /> Deny Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 flex-[1]">
              {/* Client Information */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Client Information
                </h3>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12  rounded-full flex items-center justify-center">
                    <img src={Avatar} alt="" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#003366]">
                      Community Health Center
                    </h4>
                    <p className="text-sm text-gray-600">HealthCare</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-gray-600">(127 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      250+ employees
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarCheck className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Member since 2020
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleViewClientProfile}
                  className="w-full bg-white  text-[#C9A14A] border border-[#C9A14A] px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  View Client Profile
                </button>
              </div>

              {/* Location & Work Type */}
              <div className="bg-[#f1f1f1] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Location & Work Type
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FaLocationDot className="w-4 h-4 text-teal-500" />
                    <span className="text-gray-700">XYZ XYZ XYZ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="w-4 h-4 text-teal-500" />
                    <span className="text-gray-700">10:00 am to 12:00 pm</span>
                  </div>
                </div>
              </div>

              {/* Need Clarification */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Need Clarification?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this job posting? Contact the client
                  directly for more information.
                </p>
                <button
                  onClick={() => {
                    handleMessage();
                    onMessage();
                    onClose();
                  }}
                  className="w-full bg-[#C9A14A] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
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
