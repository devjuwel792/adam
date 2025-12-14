"use client";

import { useState } from "react";
import { useGetReportsListQuery } from "../../store/services/disputeManagementApi";
import { FaEye } from "react-icons/fa";
import { FaCheck, FaClock } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { LuMessageCircleOff } from "react-icons/lu";
import CaseDetails from "./CaseDetails";

function DisputeManagement() {
  const [selectedIssueFilter, setSelectedIssueFilter] = useState("All Issues");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All Status");
  const [openIssueDetails, setOpenIssueDetails] = useState(false);
  const { data, isLoading, isError } = useGetReportsListQuery();

  // Helper function to determine status color
  const getStatusClass = (status) => {
    // Convert status to lowercase for case-insensitive matching
    const lowerCaseStatus = (status || "").toLowerCase();
    switch (lowerCaseStatus) {
      case "solved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "under review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter logic for reports
  const filteredReports = data?.reports?.filter((report) => {
    const info = report.complaint_information;

    // Status filter
    const statusMatch =
      selectedStatusFilter === "All Status" ||
      (info.case_status || "").toLowerCase() === selectedStatusFilter.toLowerCase();

    // Issue type filter
    const issueMatch =
      selectedIssueFilter === "All Issues" || info.type === selectedIssueFilter;

    return statusMatch && issueMatch;
  });

  return (
    <div style={{ fontFamily: "Montserrat" }}>
      <div className="">
        {/* Stats Cards */}
        <div className="flex gap-3 mb-8">
          <div className={` w-[400px] shadow-sm rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Issues</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoading ? "..." : data?.summary?.total_pending_count ?? 0}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-orange-100`}>
                <span className={`text-lg text-orange-600`}><FaClock /></span>
              </div>
            </div>
          </div>
          <div className={` w-[400px] shadow-sm rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Solved</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoading ? "..." : data?.summary?.total_solved_count ?? 0}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-100`}>
                <span className={`text-lg text-blue-600`}><FaEye /></span>
              </div>
            </div>
          </div>
          <div className={` w-[400px] shadow-sm rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Solved Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {isLoading ? "..." : data?.summary?.total_solved_today_count ?? 0}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-green-100`}>
                <span className={`text-lg text-green-600`}><FaCheck /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Issues:</span>
            <select
              value={selectedIssueFilter}
              onChange={(e) => setSelectedIssueFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Issues</option>
              <option>Payment Issues</option>
              <option>Message Issues</option>
              <option>Harassment Reports</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Solved</option>
            </select>
          </div>
        </div>

        {/* Issues Queue */}
        <div className=" rounded-lg shadow-sm border py-5 border-gray-200 bg-[#E5E7EB]">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Issues Queue</h2>
          </div>
          <div className="">
            {isLoading && <div className="mx-6 p-4">Loading...</div>}
            {isError && <div className="mx-6 p-4 text-red-500">Failed to load issues.</div>}
            {!isLoading && !isError && filteredReports?.length === 0 && (
              <div className="mx-6 p-4">No issues found.</div>
            )}
            {!isLoading && !isError && filteredReports?.map((report, idx) => {
              const info = report.complaint_information;
              return (
                <div
                  key={info.report_id || idx}
                  onClick={() => setOpenIssueDetails(info.report_id)}
                  className="mx-6 p-4 mb-3 cursor-pointer rounded-md bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center bg-gray-100`}>
                        <span className={`text-lg text-gray-600`}><IoIosWarning /></span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{info.type || "Unknown Type"}</h3>
                        <div className="flex flex-col mt-1 text-sm text-gray-500">
                          <span>Reported by {info.filled_by}</span>
                          <span>Case ID: {info.report_id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="text-right text-sm text-gray-500 flex flex-col items-end">
                        <div
                          className={`w-20 h-6 text-center px-2 py-1 mb-1 rounded-full text-xs font-medium ${getStatusClass(info.case_status)}`}
                        >
                          {info.case_status || "Pending" }
                        </div>
                        <div className="mt-1">{new Date(info.reported_on).toLocaleString()}</div>
                        <div>Priority: {info.case_priority}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CaseDetails
        isOpen={!!openIssueDetails}
        reportId={openIssueDetails}
        onClose={() => setOpenIssueDetails(false)}
      />
    </div>
  );
}

export default DisputeManagement;
