import { useState } from "react";
import { FaBan, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";
import toast from "react-hot-toast"; // Import toast library
import { IoWarning } from "react-icons/io5";
import {
  useGetReportDetailsQuery,
  useSubmitReportSummaryMutation,
  useTakeReportActionMutation,
} from "../../store/services/disputeManagementApi";

function CaseDetails({ isOpen, onClose, reportId }) {
  const [selectedAction, setSelectedAction] = useState("");
  const [images, setImages] = useState({ one: null, two: null });
  const [decisionSummary, setDecisionSummary] = useState("");

  const [submitReportSummary, { isLoading: isSubmitting }] =
    useSubmitReportSummaryMutation();

  const [takeReportAction, { isLoading: isTakingAction }] =
    useTakeReportActionMutation();

  const {
    data: reportDetails,
    isLoading,
    isError,
  } = useGetReportDetailsQuery(reportId, {
    skip: !reportId, // Only fetch if reportId is present
  });

  const info = reportDetails?.complaint_information;

  const handleSubmitDecision = async () => {
    if (!decisionSummary.trim()) {
      toast.error("Please enter a decision summary.");
      return;
    }
    try {
      const response = await submitReportSummary({
        reportId,
        message: decisionSummary,
      }).unwrap();
      toast.success(response.message); // Show success message from API response
      onClose(); // Close modal on success
    } catch (error) {
      toast.error(error.data?.message || "Failed to submit decision."); // Show error message
      console.error("Failed to submit decision:", error); // Log full error for debugging
    }
  };

  const handleTakeAction = async (actionType) => {
    // Ensure we have the necessary data before proceeding
    if (!info?.report_id) {
      toast.error("Reported user ID is missing. Cannot take action.");
      return;
    }

    try {
      const response = await takeReportAction({
        reportId,
        actionType,
        reported_id: info.report_id, // Pass reported_id in the body
        action: actionType, // Pass action in the body as per API requirement
      }).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data?.message || `Failed to ${actionType} user.`);
    }
  };
  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // preview purpose
      setImages((prev) => ({ ...prev, [key]: url }));
    }
  };

  const actions = [
    {
      id: "warn",
      label: "Resolve Case - Warning Issued",
      color: "bg-teal-500  text-white",
      icon: <FaCheckCircle />,
    },
    {
      id: "suspend",
      label: "Suspend User Account",
      color: "bg-red-500  text-white",
      icon: <FaBan />,
    },
    {
      id: "dismiss",
      label: "Dismiss Case",
      color: "bg-gray-500  text-white",
      icon: <FaTimesCircle />,
    },
  ]; // warn - suspend - dismiss

  const evidenceItems = [
    {
      id: 1,
      name: "Screenshot 1",
      date: "Dec 5, 2024 AM",
    },
    {
      id: 2,
      name: "Screenshot 2",
      date: "Dec 6, 2024 AM",
    },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white  shadow-xl max-w-[70vw] w-full max-h-[90vh] overflow-y-auto">
        {isLoading && (
          <div className="p-10 text-center">Loading case details...</div>
        )}
        {isError && (
          <div className="p-10 text-center text-red-500">
            Failed to load details.
          </div>
        )}
        {!isLoading && !isError && info && (
        <><div className="sticky top-0 ">
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
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div><div className="py-9">
              {/* Header */}
              <div
                style={{
                  // boxShadow: "0px 4px 6px 0px #0000001A",
                }}
                className=" p-6 border-b shadow-md m-5 rounded-md border-gray-200"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Case Details
                  </h2>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 border-b pb-2">
                    <span>Case ID : {info.report_id}</span>
                    <span>
                      Filed:{" "}
                      {new Date(info.reported_on).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex  justify-between items-center gap-10 pt-3 ">
                  {/* Complaint Information */}
                  <div className="flex-[3]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Complaint Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="text-gray-500">{info.type || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Filed By:</span>
                        <span className="text-gray-900">{info.filled_by}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reported User:</span>
                        <span className="text-gray-500">{info.reported_user}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform:</span>
                        <span className="text-gray-500">{info.platform}</span>
                      </div>
                    </div>
                  </div>
                  {/* Initial Report Summary */}
                  <div className="flex-[2] p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Initial Report Summary
                    </h3>
                    <div className=" rounded-lg ">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {info.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column */}
                  <div className="w-full lg:w-1/2">
                    {/* Decision & Action */}
                    <div className="p-6 shadow-md rounded-md h-full">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Decision & Action
                      </h3>
                      <div>
                        <p className="text-gray-800 mb-4 font-[600]">
                          Available Actions
                        </p>
                        <div className="space-y-3">
                          {actions.map((action) => (
                            <button
                              key={action.id}
                              onClick={() => handleTakeAction(action.id)}
                              disabled={isTakingAction}
                              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none ${action.color} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                            >
                              <span>{action.icon}</span>
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-full lg:w-1/2 space-y-6 shadow-md rounded-md p-5">
                    {/* Decision Summary */}
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Decision Summary
                      </h3>
                      <div className="rounded-lg">
                        <textarea
                          rows={10}
                          value={decisionSummary}
                          onChange={(e) => setDecisionSummary(e.target.value)}
                          placeholder="Enter your decision summary and reasoning here. This will be logged and may be shared with relevant parties..."
                          className="text-gray-700 rounded-md p-3 border h-[100px] w-full text-[13px] leading-relaxed"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Recommended Action */}
                    <div className="bg-[#ffe9b836] p-4 rounded-md">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Recommended Action
                      </h3>
                      <div className=" rounded-lg  mb-4">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Based on evidence review, suspend user account. Clear
                          violation of harassment policy with evidence of
                          inappropriate messaging and threatening language.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmitDecision}
                        disabled={isSubmitting}
                        className=" bg-[#C9A14A] text-white font-medium py-2 px-5 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Submit Decision
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div></>
        )}
      </div>
    </div>
  );
}

export default CaseDetails;
