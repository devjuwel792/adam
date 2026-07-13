import { useState } from "react";
import { FaBan, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useGetDisputeDetailQuery,
  useUpdateDisputeMutation,
} from "../../store/services/dashboardApi";

function CaseDetails({ isOpen, reportId, onClose }) {
  const [adminNotes, setAdminNotes] = useState("");

  const { data, isLoading, isError } = useGetDisputeDetailQuery(reportId, {
    skip: !reportId,
  });

  const [updateDispute, { isLoading: isUpdating }] = useUpdateDisputeMutation();

  const handleAction = async (status) => {
    if (!adminNotes.trim()) {
      toast.error("Please enter admin notes before submitting.");
      return;
    }
    try {
      await updateDispute({
        report_id: reportId,
        status,
        admin_notes: adminNotes,
        resolved_at: new Date().toISOString(),
      }).unwrap();
      toast.success("Dispute updated successfully.");
      onClose();
    } catch {
      toast.error("Failed to update dispute.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-xl max-w-[70vw] w-full max-h-[90vh] overflow-y-auto">
        {isLoading && <div className="p-10 text-center">Loading case details...</div>}
        {isError && <div className="p-10 text-center text-red-500">Failed to load details.</div>}

        {!isLoading && !isError && data && (
          <div className="py-9">
            {/* Close Button */}
            <div className="flex justify-end px-4">
              <button
                onClick={onClose}
                className="text-gray-400 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Header */}
            <div className="p-6 border-b shadow-md m-5 rounded-md border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Case Details</h2>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 border-b pb-2">
                <span>Case ID: {data.case_id}</span>
                <span className="capitalize">Status: {data.status_display}</span>
              </div>

              <div className="flex justify-between items-start gap-10 pt-3">
                {/* Complaint Information */}
                <div className="flex-[3]">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Complaint Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Filed At:</span>
                      <span className="text-gray-900">{data.filed_at}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reported User:</span>
                      <span className="text-gray-500">{data.complaint_information?.reported_user}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-gray-500">{data.complaint_information?.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reported By:</span>
                      <span className="text-gray-500">{data.complaint_information?.filed_by}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform:</span>
                      <span className="text-gray-500">{data.complaint_information?.platform}</span>
                    </div>
                  </div>
                </div>

                {/* Report Content */}
                <div className="flex-[2] p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Report Summary</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.initial_report_summary}</p>
                  {data.resolved_at && (
                    <p className="text-xs text-gray-400 mt-2">
                      Resolved: {new Date(data.resolved_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Actions */}
                <div className="w-full lg:w-1/2 p-6 shadow-md rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Decision & Action</h3>

                  {/* Action History */}
                  {data.action_history?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Action History</p>
                      {data.action_history.map((item, i) => (
                        <div key={i} className="text-xs text-gray-500 border-l-2 border-gray-300 pl-3 mb-2">
                          <p className="font-medium text-gray-700">{item.action}</p>
                          <p>{item.details}</p>
                          <p>{new Date(item.timestamp).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-800 mb-3 font-semibold">Available Actions</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAction("resolved")}
                      disabled={isUpdating}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-teal-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <FaCheckCircle /> Resolve Case
                    </button>
                    <button
                      onClick={() => handleAction("under_review")}
                      disabled={isUpdating}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-blue-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <FaBan /> Mark Under Review
                    </button>
                    {/* <button
                      onClick={() => handleAction("dismissed")}
                      disabled={isUpdating}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-gray-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <FaTimesCircle /> Dismiss Case
                    </button> */}
                  </div>
                </div>

                {/* Right: Notes & Recommended Action */}
                <div className="w-full lg:w-1/2 space-y-6 shadow-md rounded-md p-5">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Notes</h3>
                    <textarea
                      rows={5}
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Enter your decision summary and reasoning here..."
                      className="text-gray-700 rounded-md p-3 border w-full text-[13px] leading-relaxed"
                      disabled={isUpdating}
                    />
                    {data.admin_notes && (
                      <p className="text-xs text-gray-400 mt-1">
                        Previous notes: {data.admin_notes}
                      </p>
                    )}
                  </div>

                  {data.decision_summary?.recommended_action && (
                    <div className="bg-[#ffe9b836] p-4 rounded-md">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Recommended Action</h3>
                      <p className="text-gray-700 text-sm">{data.decision_summary.recommended_action}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAction("resolved")}
                      disabled={isUpdating}
                      className="bg-[#C9A14A] text-white font-medium py-2 px-5 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Submitting..." : "Submit Decision"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseDetails;
