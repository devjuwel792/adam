import { FaEye } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import Avatar from "../../assets/images/Image-52.png";
import { useState } from "react";
import SelectionDropdown from "./SelectionDropdown";
import { useGetPendingPhlebotomistDetailsQuery, useApproveRejectProfileMutation } from "../../store/services/dashboardApi";
import { toast, ToastContainer } from 'react-toastify';

const ProfileModal = ({ isOpen, onClose, professional_id }) => {
  const [selectedAction, setSelectedAction] = useState("approved");
  const { data, isLoading } =
    useGetPendingPhlebotomistDetailsQuery(professional_id);
  const [approveRejectProfile] = useApproveRejectProfileMutation();

  const handleApproveReject = async (action) => {
    try {
      await approveRejectProfile({ user_id: professional_id, action }).unwrap();
      toast.success(`Profile ${action === "approve" ? "approved" : "rejected"} successfully!`);
      onClose();
    } catch (error) {
      toast.error(`Failed to ${action === "approve" ? "approve" : "reject"} profile. Please try again.`);
    }
  };

  if (!isOpen) return null;

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6">Loading...</div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-[961px] mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}

        {/* Profile Section */}
        <div className="px-6 pb-6 ">
          <div className="border-[1px] rounded-md mt-9 mb-3  border-b-[#E5E7EB] ">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold bg-[#F3F4F6] rounded-full w-8 h-8 flex items-center justify-center m-3"
              >
                ×
              </button>
            </div>
            <div className="flex p-4 pt-0 items-start gap-4 mb-6">
              <img
                src={data?.image || Avatar}
                alt={data?.full_name }
                className="w-16 h-16 m-3 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {data?.full_name }
                </h2>

                {/* Contact Information */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Address</span>
                    <span className="text-gray-900">Registration Date</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">
                      {data?.email}
                    </span>
                    <span className="text-gray-900">August 01, 2025</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="text-gray-600">User Type</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">
                      {data?.phone }
                    </span>
                    <span className="text-gray-900">Phlebotomist</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Address</span>
                    <span className="text-gray-600">Experience Level</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">
                      {data?.service_area }
                    </span>
                    <span className="text-gray-900">
                      {data?.years_of_experience } Years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Documents
            </h3>

            {/* Professional License */}
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <FaFilePdf className="text-[#2563EB]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Professional License
                  </div>
                  <div className="text-sm text-gray-500">
                    contractor_license_2025.pdf • 2.3 MB
                  </div>
                  <div className="text-xs text-gray-400">
                    Uploaded on August 15, 2025
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-[#C9A14A] text-white text-xs rounded ">
                  <FaEye className="text-white" /> View
                </button>
                <div className="w-36 hidden">
                  <SelectionDropdown
                    options={["approved", "deny"]}
                    selected={
                      selectedAction["professionalLicense"] || "approved"
                    } // unique key
                    onSelect={(action) =>
                      setSelectedAction((prev) => ({
                        ...prev,
                        professionalLicense: action,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Insurance Certificate */}
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <FaFilePdf className="text-[#16A34A]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Insurance Certificate
                  </div>
                  <div className="text-sm text-gray-500">
                    insurance_cert_2025.pdf • 1.9 MB
                  </div>
                  <div className="text-xs text-gray-400">
                    Uploaded on August 15, 2025
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-[#C9A14A] text-white text-xs rounded ">
                  <FaEye className="text-white" /> View
                </button>
                <div className="w-36 hidden">
                  <SelectionDropdown
                    options={["approved", "deny"]}
                    selected={
                      selectedAction["insuranceCertificate"] || "approved"
                    } // unique key
                    onSelect={(action) =>
                      setSelectedAction((prev) => ({
                        ...prev,
                        insuranceCertificate: action,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Final Decision Section */}
          <div className="border p-3 rounded-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Final Decision
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleApproveReject("approve")}
                className=" bg-[#C9A14A] text-white py-2 px-4 rounded-lg  font-medium"
              >
                ✓ Approve Profile
              </button>
              <button
                onClick={() => handleApproveReject("reject")}
                className="border border-red-500 text-red-500 py-2 px-4 rounded-lg  font-medium"
              >
                ✗ Deny Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProfileModal;
