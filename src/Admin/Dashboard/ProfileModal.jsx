import { FaEye } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import Avatar from "../../assets/images/Image-52.png";
import { toast } from "react-toastify";
import {
  useGetUserDetailsForApprovalQuery,
  useApproveUserMutation,
  useApproveDocumentMutation,
} from "../../store/services/dashboardApi";

const ProfileModal = ({ isOpen, onClose, professional_id }) => {
  const { data, isLoading } = useGetUserDetailsForApprovalQuery(professional_id, {
    skip: !professional_id,
  });
  const [approveUser] = useApproveUserMutation();
  const [approveDocument] = useApproveDocumentMutation();

  const handleApproveReject = async (approve) => {
    try {
      await approveUser({ user_id: professional_id, approve }).unwrap();
      toast.success(`Profile ${approve ? "approved" : "rejected"} successfully!`);
      onClose();
    } catch {
      toast.error("Failed to update profile status.");
    }
  };

  const handleDocApprove = async (document_id, approve) => {
    try {
      await approveDocument({ user_id: professional_id, document_id, approve }).unwrap();
      toast.success(`Document ${approve ? "approved" : "rejected"} successfully!`);
    } catch {
      toast.error("Failed to update document status.");
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
        <div className="px-6 pb-6">
          <div className="border rounded-md mt-9 mb-3">
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
                src={data?.profile_picture || Avatar}
                alt={data?.name}
                className="w-16 h-16 m-3 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{data?.name}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Address</span>
                    <span className="text-gray-900">Registration Date</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{data?.email}</span>
                    <span className="text-gray-900">{data?.registration_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Number</span>
                    <span className="text-gray-600">User Type</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{data?.phone_number}</span>
                    <span className="text-gray-900 capitalize">{data?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address</span>
                    <span className="text-gray-600">Experience Level</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">{data?.address}</span>
                    <span className="text-gray-900">
                      {data?.experience ? `${data.experience} Years` : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
            {data?.uploaded_documents?.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <FaFilePdf className="text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {doc.document_name.replace(/_/g, " ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {doc.file_name} • {doc.file_size}
                    </div>
                    <div className="text-xs text-gray-400">Uploaded on {doc.uploaded_on}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={doc.document_file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-[#C9A14A] text-white text-xs rounded"
                  >
                    <FaEye /> View
                  </a>
                  {!doc.approved && (
                    <button
                      onClick={() => handleDocApprove(doc.id, true)}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded"
                    >
                      Approve
                    </button>
                  )}
                  {doc.approved && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded">
                      Approved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Final Decision */}
          {!data?.is_approved && (
            <div className="border p-3 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Decision</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleApproveReject(true)}
                  className="bg-[#C9A14A] text-white py-2 px-4 rounded-lg font-medium"
                >
                  ✓ Approve Profile
                </button>
                <button
                  onClick={() => handleApproveReject(false)}
                  className="border border-red-500 text-red-500 py-2 px-4 rounded-lg font-medium"
                >
                  ✗ Deny Profile
                </button>
              </div>
            </div>
          )}
          {data?.is_approved && (
            <div className="border p-3 rounded-md bg-green-50">
              <p className="text-green-700 font-medium">✓ This profile is already approved</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
