import BloodImage from "@/assets/images/image 22.png";
import { HiDocumentAdd } from "react-icons/hi";
import { FaCertificate, FaCircleCheck, FaMessage } from "react-icons/fa6";
import { FaEdit, FaEye } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetUserDetailQuery,
  useEditUserMutation,
  useSuspendUnsuspendUserMutation,
} from "../../store/services/dashboardApi";

const DetailedUserProfile = ({ userId, isOpen, onClose }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  const { data, isLoading, error } = useGetUserDetailQuery(userId, {
    skip: !userId || !isOpen,
  });
  const [editUser, { isLoading: isSaving }] = useEditUserMutation();
  const [suspendUnsuspend] = useSuspendUnsuspendUserMutation();

  if (!isOpen) return null;

  const { header, personal_information, professional_information, activity_summary, document_verification } = data || {};

  const handleSuspendToggle = async () => {
    const isSuspended = header?.status === "suspended";
    try {
      await suspendUnsuspend({ user_id: header?.user_id ?? userId, suspend: !isSuspended }).unwrap();
      toast.success(`User ${isSuspended ? "unsuspended" : "suspended"} successfully!`);
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  const handleEditOpen = () => {
    setEditForm({
      full_name: header?.full_name || "",
      email: personal_information?.email || "",
      phone_number: personal_information?.phone_number || "",
      dob: "",
      license_number: personal_information?.license_number || "",
      years_of_experience: professional_information?.years_of_experience || "",
      skills: professional_information?.skills?.join(", ") || "",
    });
    setIsEditOpen(true);
  };

  const handleEditSave = async () => {
    const role = header?.role?.toLowerCase();
    const body = {
      full_name: editForm.full_name,
      email: editForm.email,
      phone_number: editForm.phone_number,
    };
    if (editForm.dob) body.dob = editForm.dob;
    if (role === "phlebotomist") {
      if (editForm.license_number) body.license_number = editForm.license_number;
      if (editForm.years_of_experience) body.years_of_experience = Number(editForm.years_of_experience);
      if (editForm.skills) body.skills = editForm.skills.split(",").map((s) => s.trim()).filter(Boolean);
    }
    try {
      await editUser({ user_id: header?.user_id ?? userId, body }).unwrap();
      toast.success("Profile updated successfully.");
      setIsEditOpen(false);
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const statusColor =
    header?.status === "active"
      ? "bg-green-100 text-green-800"
      : header?.status === "suspended"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white shadow-xl max-w-[70vw] w-full max-h-[90vh] pt-7 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
        {/* Close */}
        <div className="sticky top-0">
          <div className="absolute top-0 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading && <p className="p-10 text-center text-gray-500">Loading profile...</p>}
        {error && <p className="p-10 text-center text-red-600">Error loading profile.</p>}

        {data && !isLoading && !error && (
          <>
            {/* Header */}
            <div className="px-6 mt-5">
              <div className="flex items-center justify-between p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={header?.profile_picture}
                    alt={header?.full_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{header?.full_name}</h2>
                    <p className="text-gray-600 capitalize">{header?.role}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {header?.status}
                      </span>
                      <span className="text-sm text-gray-500">Member since {header?.member_since}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Overall Rating</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-lg font-semibold text-gray-900">{header?.overall_rating}</span>
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Personal Information */}
                  <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {personal_information?.email && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <p className="text-gray-500">{personal_information.email}</p>
                        </div>
                      )}
                      {personal_information?.phone_number && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <p className="text-gray-500">{personal_information.phone_number}</p>
                        </div>
                      )}
                      {personal_information?.dob && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                          <p className="text-gray-500">{personal_information.dob}</p>
                        </div>
                      )}
                      {personal_information?.address && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <p className="text-gray-500">{personal_information.address}</p>
                        </div>
                      )}
                      {personal_information?.license_number && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                          <p className="text-gray-500">{personal_information.license_number}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Professional Information */}
                  {professional_information && (
                    <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                      {professional_information.years_of_experience != null && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                          <p className="text-gray-900">{professional_information.years_of_experience} years</p>
                        </div>
                      )}
                      {professional_information.skills?.length > 0 && (
                        <div>
                          <label className="block text-md font-semibold text-gray-900 mb-2">Skills</label>
                          <div className="flex flex-wrap gap-2">
                            {professional_information.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-[#0C1A2A]">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Document Verification */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Verification</h3>
                    <div className="space-y-4">
                      {document_verification?.length > 0 ? (
                        document_verification.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <HiDocumentAdd className="text-[24px] text-[#00A6A6]" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{doc.document_name}</p>
                                <p className="text-sm text-gray-500">Uploaded {doc.uploaded_on}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {doc.approved && (
                                <span className="inline-flex gap-1 items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <FaCircleCheck /> Approved
                                </span>
                              )}
                              <a
                                href={doc.document_file}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 px-3 py-1 bg-[#C9A14A] text-white text-xs rounded"
                              >
                                <FaEye /> View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No documents available.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-8">
                  {/* Activity Summary */}
                  {activity_summary && (
                    <div className="shadow-sm border border-gray-100 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Jobs Completed</span>
                          <span className="text-2xl font-bold text-teal-600">{activity_summary.jobs_completed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Success Rate</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="font-semibold text-gray-900">{activity_summary.success_rate}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Active</span>
                          <span className="text-gray-900">{activity_summary.last_active}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={handleEditOpen}
                        className="w-full gap-1 bg-[#00A6A6] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                      >
                        <FaEdit /> Edit Profile
                      </button>
                      <button
                        onClick={handleSuspendToggle}
                        className={`w-full gap-1 font-medium py-2 px-4 rounded-lg flex items-center justify-center text-white ${
                          header?.status === "suspended" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {header?.status === "suspended" ? "Unsuspend User" : "Suspend User"}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <img src={BloodImage} alt="Mascot" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
              <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            <div className="space-y-4">
              {[
                { label: "Full Name", key: "full_name" },
                { label: "Email", key: "email", type: "email" },
                { label: "Phone Number", key: "phone_number" },
                // { label: "Date of Birth", key: "dob", type: "date" },
              ].map(({ label, key, type = "text" }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={editForm[key] || ""}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>
              ))}

              {header?.role?.toLowerCase() === "phlebotomist1" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input
                      type="text"
                      value={editForm.license_number || ""}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, license_number: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={editForm.years_of_experience || ""}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, years_of_experience: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                    <input
                      type="text"
                      value={editForm.skills || ""}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, skills: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                      placeholder="venipuncture, iv_insertion"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditSave}
                disabled={isSaving}
                className="flex-1 bg-[#C9A14A] text-white py-2 rounded-lg font-medium disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedUserProfile;
