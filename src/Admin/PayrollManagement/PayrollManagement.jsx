import { useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa6";
import PayrollManagementDetails from "./PayrollManagementDetails";
import { useGetPayrollListQuery } from "../../store/services/dashboardApi";

const PayrollManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedJobId, setSelectedJobId] = useState(null);

  const { data, isLoading, isError } = useGetPayrollListQuery();

  const filtered = data?.transactions?.filter((t) => {
    const matchesSearch =
      t.job_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phlebotomist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg">
      {/* Metrics Cards */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white border w-[300px] border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Transactions</p>
              <p className="text-3xl text-gray-900">
                {isLoading ? "..." : data?.metrics?.total_transactions?.toLocaleString() ?? 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white w-[300px] border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Amount Paid</p>
              <p className="text-3xl text-gray-900">
                {isLoading ? "..." : `$${data?.metrics?.total_amount_paid?.toLocaleString() ?? 0}`}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white w-[300px] border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl text-gray-900">
                {isLoading ? "..." : data?.metrics?.active_users?.toLocaleString() ?? 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col justify-between shadow-sm sm:flex-row gap-4 mb-6 border p-6 rounded-lg">
        <div className="min-w-80">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by Job ID, Client, or Phlebotomist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <button className="px-4 py-2 bg-[#C9A14A] text-white rounded-lg font-medium flex items-center gap-2">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="mb-6 rounded-lg border">
        <h2 className="text-lg bg-gray-100 text-gray-900 p-3 border-b">Transaction History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 border-gray-200">
              {["Job ID", "Client", "Phlebotomist", "Amount", "Date", "Status", "Action", ""].map((h) => (
                <th key={h} className="text-left py-2 px-4 font-medium text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={8} className="py-6 text-center text-gray-500">Loading...</td></tr>
            )}
            {isError && (
              <tr><td colSpan={8} className="py-6 text-center text-red-500">Failed to load transactions.</td></tr>
            )}
            {!isLoading && !isError && filtered?.map((t) => (
              <tr key={t.job_id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">{t.job_id}</td>
                <td className="py-4 px-4 text-gray-700">{t.client}</td>
                <td className="py-4 px-4 text-gray-700">{t.phlebotomist}</td>
                <td className="py-4 px-4 text-gray-900">{t.amount}</td>
                <td className="py-4 px-4 text-gray-700">{t.date}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    t.status === "Completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    t.action === "Approve" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                  }`}>
                    {t.action}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <FaEye
                    onClick={() => setSelectedJobId(t.job_id)}
                    className="cursor-pointer text-[#C9A14A] text-lg"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PayrollManagementDetails
        isOpen={!!selectedJobId}
        jobId={selectedJobId}
        onClose={() => setSelectedJobId(null)}
      />
    </div>
  );
};

export default PayrollManagement;
