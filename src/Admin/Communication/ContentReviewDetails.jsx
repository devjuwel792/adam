import { useState } from "react";
import Avatar from "../../assets/images/Image-52.png";
import { useGetInappropriateMessageDetailsQuery } from "../../store/services/communicationApi";
import {
  FaArrowRight,
  FaBan,
  FaBriefcase,
  FaCheck,
  FaTrash,
} from "react-icons/fa6";

const ContentReviewDetails = ({ isOpen, onClose, reportId }) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const {
    data: details,
    isLoading,
    isError,
  } = useGetInappropriateMessageDetailsQuery(reportId, {
    skip: !reportId, // Don't fetch if reportId is not available
  });

  if (!isOpen) return null;

  const handleConfirmAction = () => {
    if (selectedAction) {
      console.log("Action confirmed:", selectedAction, "Notes:", adminNotes);
      // Handle the moderation action here
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white  shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
        {isLoading && <div className="p-10 text-center">Loading details...</div>}
        {isError && (
          <div className="p-10 text-center text-red-500">
            Failed to load details.
          </div>
        )}
        {!isLoading && !isError && details && (
          <>
            {/* Header */}
            <div className="flex items-center mt-12 justify-between p-6 ">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Content Review Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Flagged for review on{" "}
                  {new Date(details.created_on).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-6">
              {/* Contextual Information */}
              <div className="shadow-md rounded-md  ">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium  text-gray-900 ">
                    Contextual Information
                  </h3>
                  <p className="text-sm text-gray-600  ">
                    Additional details to help you make an informed decision
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
                  {/* Message Sender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Message Sender
                    </label>
                    <div className="flex items-center space-x-3">
                      <img
                        src={details.sender_image || Avatar}
                        alt={details.sender_full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {details.sender_full_name}
                        </p>
                        <button className="text-sm flex items-center gap-1">
                          View Profile <FaArrowRight className="text-[11px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Message Recipient */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Message Recipient
                    </label>
                    <div className="flex items-center space-x-3">
                      <img
                        src={details.receiver_image || Avatar}
                        alt={details.receiver_full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {details.receiver_full_name}
                        </p>
                        <button className="text-sm flex items-center gap-1">
                          View Profile <FaArrowRight className="text-[11px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Related Job */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Related Job
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className=" text-gray-400 mr-2 rounded-full">
                        <FaBriefcase />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {details.assigned_job}
                        </p>
                        <button className="text-sm flex items-center gap-1">
                          View Job Details{" "}
                          <FaArrowRight className="text-[11px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Report Reason */}
                  <div className="flex flex-col justify-center">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Report Reason
                    </label>
                    <div className="bg-red-100 rounded-lg px-2 py-1 inline-block self-start">
                      <span className="text-red-600 font-medium text-sm">
                        {details.reported_reason}
                      </span>
                    </div>
                  </div>{" "}
                  {/* Reporter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Reporter
                    </label>
                    <p className="text-gray-900 text-sm">
                      {details.receiver_full_name} (Message Recipient)
                    </p>
                  </div>
                  {/* Reported Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Reported Title
                    </label>
                    <p className="text-gray-600 text-sm">
                      {details.reported_title || "*No record*"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Moderation Actions */}
              <div className="shadow-md rounded-md ">
                <div className="p-6  border-b border-gray-200 ">
                  {" "}
                  <h3 className="text-lg font-medium text-gray-900 ">
                    Moderation Actions
                  </h3>
                  <p className="text-sm text-gray-600 ">
                    Choose the appropriate action for this content
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="p- flex flex-wrap gap-3 mb-4">
                    <button
                      onClick={() => setSelectedAction("delete")}
                      className={`px-6 py-2 flex items-center gap-2 rounded-md font-sm transition-colors border border-red-700 bg-red-100 text-red-700`}
                    >
                      <FaTrash className="text-[12px]" />
                      Delete Message
                    </button>
                    <button
                      onClick={() => setSelectedAction("approve")}
                      className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 border border-green-700 bg-green-100 text-green-700`}
                    >
                      <FaCheck className="text-[12px]" />
                      Approve Content
                    </button>
                    <button
                      onClick={() => setSelectedAction("suspend")}
                      className={`px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors border  text-gray-700`}
                    >
                      <FaBan className="text-[12px]" />
                      Suspend User
                    </button>
                  </div>

                  {/* Admin Notes */}
                  {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Notes (Optional)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any additional notes about this moderation decision..."
                  className="w-full shadow-sm  text-sm rounded-md focus:outline-none  resize-none"
                  rows={3}
                />
              </div> */}{/* Footer */}
                  {/* <div className="flex items-center justify-end space-x-3 p-4  border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700  text-sm rounded-md border transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={!selectedAction}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors bg-[#C9A14A] text-white`}
                >
                  Confirm Action
                </button>
              </div> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentReviewDetails;
