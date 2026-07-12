import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCheck, FaClock } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import CaseDetails from "./CaseDetails";
import {
  useGetDisputeStatisticsQuery,
  useGetDisputesListQuery,
} from "../../store/services/dashboardApi";

function DisputeManagement() {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All Status");
  const [openDisputeId, setOpenDisputeId] = useState(null);

  const { data: stats, isLoading: statsLoading } = useGetDisputeStatisticsQuery();
  const { data: disputesData, isLoading, isError } = useGetDisputesListQuery();

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "solved": return "bg-green-100 text-green-800";
      case "pending": return "bg-orange-100 text-orange-800";
      case "under review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityClass = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high": return "text-red-600";
      case "medium": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  const filteredDisputes = disputesData?.results?.filter((d) =>
    selectedStatusFilter === "All Status" ||
    (d.status_display || "").toLowerCase() === selectedStatusFilter.toLowerCase()
  );

  return (
    <div style={{ fontFamily: "Montserrat" }}>
      {/* Stats Cards */}
      <div className="flex gap-3 mb-8">
        <div className="w-[400px] shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Issues</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {statsLoading ? "..." : stats?.pending_issues ?? 0}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100">
              <span className="text-lg text-orange-600"><FaClock /></span>
            </div>
          </div>
        </div>
        <div className="w-[400px] shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Under Review</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {statsLoading ? "..." : stats?.under_review ?? 0}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
              <span className="text-lg text-blue-600"><FaEye /></span>
            </div>
          </div>
        </div>
        <div className="w-[400px] shadow-sm rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Resolved Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {statsLoading ? "..." : stats?.resolved_today ?? 0}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
              <span className="text-lg text-green-600"><FaCheck /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-600 text-sm">Status:</span>
        <select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Under Review</option>
          <option>Solved</option>
        </select>
      </div>

      {/* Issues Queue */}
      <div className="rounded-lg shadow-sm border py-5 border-gray-200 bg-[#E5E7EB]">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pending Issues Queue</h2>
        </div>
        <div>
          {isLoading && <div className="mx-6 p-4">Loading...</div>}
          {isError && <div className="mx-6 p-4 text-red-500">Failed to load issues.</div>}
          {!isLoading && !isError && filteredDisputes?.length === 0 && (
            <div className="mx-6 p-4">No issues found.</div>
          )}
          {!isLoading && !isError && filteredDisputes?.map((dispute) => (
            <div
              key={dispute.id}
              onClick={() => setOpenDisputeId(dispute.id)}
              className="mx-6 p-4 mb-3 cursor-pointer rounded-md bg-gray-50 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100">
                    <span className="text-lg text-gray-600"><IoIosWarning /></span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{dispute.title}</h3>
                    <div className="flex flex-col mt-1 text-sm text-gray-500">
                      <span>Reported by: {dispute.reported_by}</span>
                      <span>Reported user: {dispute.reported_user}</span>
                      <span>Case ID: {dispute.case_id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 flex flex-col items-end gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(dispute.status_display)}`}>
                    {dispute.status_display}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityClass(dispute.priority)}`}>
                    Priority: {dispute.priority}
                  </span>
                  <span>{new Date(dispute.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CaseDetails
        isOpen={!!openDisputeId}
        reportId={openDisputeId}
        onClose={() => setOpenDisputeId(null)}
      />
    </div>
  );
}

export default DisputeManagement;
