import { useState } from "react";
import Avatar from "../../assets/images/Image-52.png";
import { FaCheck } from "react-icons/fa6";
import { useGetPhlebotomistProfileQuery, useAssignJobToPhlebotomistMutation } from "../../store/services/jobMatchingApi";
import { toast } from "react-toastify";

const ProfessionalComparison = ({ isOpen, onClose, phlebotomistId, jobId }) => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetPhlebotomistProfileQuery(phlebotomistId);
  const [assignJob] = useAssignJobToPhlebotomistMutation();

  const skills = profile?.skills ? profile.skills.split(", ") : [];
  const removeSkill = (index) => {
    // Note: Since skills come from API, we might not need to remove them
    // This could be removed or modified based on requirements
  };

  const handleAssignJob = async () => {
    try {
      await assignJob({
        job_id: jobId,
        phlebotomist_user_id: phlebotomistId,
      }).unwrap();
      toast.success("Job assigned successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to assign job:", error);
      toast.error("Failed to assign job. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="bg-white rounded-lg max-w-[50vw] w-full max-h-[90vh] overflow-y-auto">
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
        <div className="flex justify-between gap-10 items-start p-6 pt-9 ">
          {/* Phlebotomist Profile */}
          <div className="flex flex-1 items-center min-w-[400px] space-x-3 p-3  shadow-sm rounded-md">
            <img
              src={profile?.image || Avatar}
              alt={profile?.user?.full_name || "Phlebotomist"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {profile?.user?.full_name || "Loading..."}
              </h3>
              <p className="text-sm text-gray-600">Certified Phlebotomist</p>
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <span className="text-sm text-gray-600">4.9 (127 reviews)</span>
              </div>
            </div>
          </div>

          {/* Client Profile */}
          <div className="flex items-center flex-1 space-x-3 p-3 shadow-sm   rounded-md">
            <img
              src={Avatar}
              alt="Client"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">Client</h3>
              <p className="text-sm text-gray-600">Client</p>
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                <span className="text-sm text-gray-600">4.5 (127 reviews)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="flex-1">
            {/* Statistics */}
            <div className="px-6 py-4 ">
              <div className="flex justify-center space-x-12">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-yellow-500">
                    247
                  </div>
                  <div className="text-sm text-gray-600">Jobs Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-yellow-500">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-yellow-500">
                    3.2
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            {/* Left Side - Ratings & Reviews */}
            <div className="flex-1 p-6 ">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-[#003366]">
                  Ratings & Reviews
                </h4>
                <button className="text-[#C9A14A] text-sm">View All</button>
              </div>

              {/* Overall Rating */}
              <div className="bg-[#F1F1F1] rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    4.9
                  </div>
                  <div className="flex justify-center text-xl text-yellow-400 mb-2">
                    {"★".repeat(5)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on 127 reviews
                  </div>
                </div>
              </div>

              {/* Individual Review */}
              <div className="space-y-4 pb-3 border-b">
                <div className="flex space-x-3">
                  <img
                    src={Avatar}
                    alt="Fahim Tamim"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Fahim Tamim
                        </h5>
                        <div className="flex justify-start text-xl text-yellow-400 mb-2">
                          {"★".repeat(5)}
                        </div>
                      </div>

                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Excellent service! Kabita was very professional and made
                      the process comfortable. Highly recommend!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side - Credentials */}
          <div className="flex-1">
            {/* Skills Section */}
            <div className="px-6 py-4 rounded m-5 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">Skill</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-gray-600 hover:text-gray-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Credentials</h4>

              <div className="space-y-4">
                {/* Phlebotomy License */}
                <div className="flex items-center justify-between p-3 bg-[#FFFCFA] cursor-pointer hover:bg-[#FFF8EF] border hover:border-[#C9A14A] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#EFB944] text-white rounded-full flex items-center justify-center">
                      <FaCheck />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Phlebotomy License
                      </div>
                      <div className="text-sm text-gray-600">
                        {profile?.license_number
                          ? `Valid • Expires ${profile.license_expiry_date}`
                          : "Not Available"}
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* CPR Certification */}
                <div className="flex items-center justify-between p-3 bg-[#FFFCFA] cursor-pointer hover:bg-[#FFF8EF] border hover:border-[#C9A14A] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#EFB944] rounded-full text-white font-sm flex items-center justify-center">
                      <FaCheck />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        CPR Certification
                      </div>
                      <div className="text-sm text-gray-600">
                        Verified • Expires 08/2025
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Assign Job Button */}
              <div className="mt-6">
                <button
                  onClick={handleAssignJob}
                  className="w-full bg-[#C9A14A] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Assign Job
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default ProfessionalComparison;
