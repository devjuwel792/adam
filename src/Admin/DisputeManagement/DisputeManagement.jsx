"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCheck, FaClock } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { LuMessageCircleOff } from "react-icons/lu";
import CaseDetails from "./CaseDetails";
function DisputeManagement() {
  const [selectedIssueFilter, setSelectedIssueFilter] = useState("All Issues");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState("All Status");
  const [openIssueDetails, setOpenIssueDetails] = useState(false);
  const stats = [
    {
      title: "Pending Issues",
      count: 12,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      icon: "⚠️",
    },
    {
      title: "Under Review",
      count: 5,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      icon: "👁️",
    },
    {
      title: "Resolved Today",
      count: 8,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      icon: "✅",
    },
  ];

  const issues = [
    {
      id: 1,
      type: "Payment Issue",
      reporter: "FA Kabita",
      caseId: "#105-2024-001",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
      time: "4 hours ago",
      priority: "High",
      icon: "warning",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 2,
      type: "Inappropriate Message",
      reporter: "FA Kabita",
      caseId: "#110-2024-006",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
      time: "2 hours ago",
      priority: "Medium",
      icon: "message",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 3,
      type: "Harassment Report",
      reporter: "FA Kabita",
      caseId: "#116-2024-003",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-800",
      time: "6 hours ago",
      priority: "High",
      icon: "report",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div style={{ fontFamily: "Montserrat" }}>
      <div className="">
        {/* Stats Cards */}
        <div className="flex gap-3 mb-8">
          <div
            className={` w-[400px] shadow-sm rounded-lg p-6 border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Pending Issues
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-orange-100`}
              >
                <span className={`text-lg text-orange-600`}>
                  <FaClock />
                </span>
              </div>
            </div>
          </div>
          <div
            className={` w-[400px] shadow-sm rounded-lg p-6 border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Solved
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-100`}
              >
                <span className={`text-lg text-blue-600`}>
                  {" "}
                  <FaEye />
                </span>
              </div>
            </div>
          </div>
          <div
            className={` w-[400px] shadow-sm rounded-lg p-6 border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Solved Today
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-green-100 `}
              >
                <span className={`text-lg text-green-600`}>
                  <FaCheck />
                </span>
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
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Issues Queue
            </h2>
          </div>

          <div className="">
            {issues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setOpenIssueDetails(issue.id)}
                className="mx-6 p-4 mb-3 cursor-pointer rounded-md bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {issue.icon == "warning" ? (
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center ${issue.iconBg}`}
                      >
                        {" "}
                        <span className={`text-lg text-red-600 `}>
                          <IoIosWarning />
                        </span>
                      </div>
                    ) : issue.icon == "report" ? (
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center bg-purple-100`}
                      >
                        {" "}
                        <span className={`text-lg text-purple-600 `}>
                          <IoIosWarning />
                        </span>
                      </div>
                    ) : issue.icon == "message" ? (
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center bg-yellow-100`}
                      >
                        {" "}
                        <span className={`text-lg text-[#CA8A04] `}>
                          <LuMessageCircleOff />
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center bg-gray-100`}
                      >
                        {" "}
                        <span className={`text-lg text-gray-600 `}>
                          <IoIosWarning />
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium text-gray-900">
                        {issue.type}
                      </h3>
                      <div className="flex  flex-col  mt-1 text-sm text-gray-500">
                        <span>Reported by {issue.reporter}</span>
                        <span>Case ID: {issue.caseId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm text-gray-500">
                      {" "}
                      {issue.status && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${issue.statusColor}`}
                        >
                          {issue.status}
                        </span>
                      )}
                      <div>{issue.time}</div>
                      <div>Priority: {issue.priority}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CaseDetails isOpen={openIssueDetails} onClose={()=>setOpenIssueDetails(false)} />
    </div>
  );
}

export default DisputeManagement;
