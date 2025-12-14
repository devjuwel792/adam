import AvatarImage from "@/assets/images/Image-52.png";
import BloodImage from "@/assets/images/image 22.png";
import { HiDocumentAdd } from "react-icons/hi";
import {
  FaAngleDown,
  FaCertificate,
  FaCircleCheck,
  FaMessage,
} from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import {
  useGetUserProfileQuery,
  useUpdateUserStatusMutation,
} from "../../store/services/userManagementApi";
import { useState } from "react";
import { toast } from "react-toastify";

const DetailedUserProfile = ({ user, isOpen, onClose }) => {
  console.log("🚀 ~ DetailedUserProfile ~ user:", user);
  if (!user) return null;
  const { data, isLoading, error } = useGetUserProfileQuery(user?.id);

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSkillRemove = (skillToRemove) => {
    // Handle skill removal logic here
    console.log("Removing skill:", skillToRemove);
  };

  const handleUpdateStatus = async (status) => {
    try {
      await updateUserStatus({ userId: user?.id, status }).unwrap();
      setDropdownOpen(false);
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (!isOpen) return null;

  const profile = data?.user_profile;
  if (!profile) return null;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white  shadow-xl max-w-[70vw] w-full max-h-[90vh]  pt-7 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        {/* Header */}
        <div className="sticky top-0 ">
          <div className="absolute top-0 right-4">
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
        {
          /* Profile Overview */
          isLoading ? (
            <p>Loading profile...</p>
          ) : (
            error && (
              <p className=" p-10 text-red-600">Error loading profile.</p>
            )
          )
        }
        {data && !isLoading && !error && (
          <>
            <div className="px-6 mt-5">
              {" "}
              <div className="flex items-center justify-between p-6   shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={profile.image || ""}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {profile.full_name}
                    </h2>
                    <p className="text-gray-600">{profile.role}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          profile.status.toLowerCase() === "approved"
                            ? "bg-green-100 text-green-800"
                            : profile.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        } `}
                      >
                        {profile.status.toLowerCase() === "approved"
                          ? "🟢"
                          : profile.status.toLowerCase() === "pending"
                          ? "🟡"
                          : "🔴"}

                        {profile.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        Member since{" "}
                        {new Date(profile.date_joined).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Overall Rating</p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        4.8
                      </span>
                      <div className="flex ml-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 ">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Personal & Professional Info */}
                <div className="lg:col-span-2 space-y-8 ">
                  {/* Personal Information */}
                  <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.email && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <p className="text-gray-500">{profile.email}</p>
                        </div>
                      )}
                      {profile.phone && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <p className="text-gray-500">{profile.phone}</p>
                        </div>
                      )}
                      {profile.birth_date && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          <p className="text-gray-500">
                            {new Date(profile.birth_date).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </p>
                        </div>
                      )}
                      {profile.gender && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <p className="text-gray-500">{profile.gender}</p>
                        </div>
                      )}
                      {profile.service_area && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service Area
                          </label>
                          <p className="text-gray-500">
                            {profile.service_area}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Professional Information */}
                  {profile.role.toLowerCase() == "phlebotomist" && (
                    <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Professional Information
                      </h3>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Years of Experience
                        </label>
                        <p className="text-gray-900">3.5 years</p>
                      </div>
                      {profile?.skills && profile.skills.trim() && (
                        <div>
                          <label className="block text-md font-semibold text-gray-900 mb-2">
                            Skill
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {profile.skills.split(", ").map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-[#0C1A2A]"
                              >
                                {skill.trim()}
                                {/* <button
                                  onClick={() => handleSkillRemove(skill)}
                                  className="ml-2 text-gray-700 "
                                >
                                  <svg
                                    className="w-4 h-4"
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
                                </button> */}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Document Verification */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Document Verification
                    </h3>
                    <div className="space-y-4">
                      <div className="flex  flex-col p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                            <HiDocumentAdd className="text-[24px] text-[#00A6A6]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Phlebotomy License
                            </p>
                            <p className="text-sm text-gray-500">
                              Uploaded Jan 15, 2024
                            </p>
                          </div>
                        </div>
                        <div className="self-center mt-5">
                          No License Available
                        </div>
                        {/* <span className="inline-flex gap-1 items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCircleCheck />
                          Approved
                        </span> */}
                      </div>
                      <div className="flex flex-col p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                            <FaCertificate className="text-[20px] text-[#00A6A6]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              CPR Certification
                            </p>
                            <p className="text-sm text-gray-500">
                              Uploaded Jan 10, 2024
                            </p>
                          </div>
                        </div>
                        {/* <span className="inline-flex gap-1 items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCircleCheck />
                          Approved
                        </span> */}
                        <div className="self-center mt-5">
                          No Certification Available{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Activity & Actions */}
                <div className="space-y-8">
                  {/* Activity Summary */}
                  <div className="shadow-sm border border-gray-100 p-6 rounded-lg min-h-[250px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Activity Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Jobs Completed</span>
                        <span className="text-2xl font-bold text-teal-600">
                          247
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Success Rate</span>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-400 fill-current mr-1"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="font-semibold text-gray-900">
                            4.8
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Active</span>
                        <span className="text-gray-900">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  {/* Weekly Availability */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Weekly Availability
                    </h4>
                    <div className="space-y-2">
                      {profile?.weekly_schedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-900">
                            {schedule.day}
                          </span>
                          <span className="text-sm text-gray-600">
                            {schedule.start_time} - {schedule.end_time}
                          </span>
                        </div>
                      )) || (
                        <div className="text-sm text-gray-600">
                          No schedule available
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      {/* <button className="w-full gap-1 bg-[#00A6A6] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                        <FaEdit />
                        Edit Profile
                      </button> */}
                      {profile?.status.toLowerCase() === "approved" && (
                        <button className="w-full gap-2 bg-[#3B82F6] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                          <FaMessage />
                          Send Message
                        </button>
                      )}

                      <div className="relative">
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full justify-center items-center flex gap-2 bg-[#EAB308] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          <FaAngleDown />
                          {profile?.status}
                        </button>
                        {dropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleUpdateStatus("pending")}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Pending
                            </button>
                            <button
                              onClick={() => handleUpdateStatus("approved")}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Approved
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mascot */}
                  <div className="flex justify-center">
                    <img src={BloodImage} alt="Mascot" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailedUserProfile;
