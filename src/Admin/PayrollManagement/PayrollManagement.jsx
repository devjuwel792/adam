import { useState } from "react";
import { FaAngleDown, FaDownload, FaEye } from "react-icons/fa6";
import PayrollManagementDetails from "./PayrollManagementDetails";
import ActionDropdown from "../ActionDropdown";
import SelectionDropdown from "../Dashboard/SelectionDropdown";
// import PaymentProcessingModal from "./PaymentProcessingModal"

const PayrollManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("Last 30 days");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransactionAction, setSelectedTransactionAction] = useState(
    {}
  );

  const [openDropdown, setOpenDropdown] = useState(null);

  const transactions = [
    {
      id: "JOB-2025-001",
      client: "Dr. Ratul Hossain",
      phlebotomist: "FA Kabita",
      amount: 125.0,
      date: "Jan 15, 2025",
      status: "Completed",
      action: "Approved",
    },
    {
      id: "JOB-2025-002",
      client: "Dr. Ratul Hossain",
      phlebotomist: "FA Kabita",
      amount: 89.5,
      date: "Jan 14, 2025",
      status: "Completed",
      action: "Pending",
    },
    {
      id: "JOB-2025-003",
      client: "Dr. Ratul Hossain",
      phlebotomist: "FA Kabita",
      amount: 156.75,
      date: "Jan 13, 2025",
      status: "Pending",
      action: "Pending",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.phlebotomist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    console.log("Exporting transaction data...");
  };

  const handleActionClick = (transactionId, action) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    setSelectedTransaction(transaction);
    setShowPaymentModal(true);
  };

  const handleDropdownAction = (transactionId, action) => {
    console.log(`${action} action for transaction ${transactionId}`);
    setOpenDropdown(null);

    if (action === "Process Payment" || action === "Review Payment") {
      const transaction = transactions.find((t) => t.id === transactionId);
      setSelectedTransaction(transaction);
      setShowPaymentModal(true);
    }
  };

  const toggleDropdown = (transactionId) => {
    setOpenDropdown(openDropdown === transactionId ? null : transactionId);
  };
  return (
    <div className="bg-white rounded-lg   ">
      {/* Metrics Cards */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white border w-[300px] border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Transactions
              </p>
              <p className="text-3xl  text-gray-900">2,847</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white  w-[300px] border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Amount Paid
              </p>
              <p className="text-3xl  text-gray-900">$284,750</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white  w-[300px] border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Active Users
              </p>
              <p className="text-3xl  text-gray-900">1,456</p>
            </div>
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col justify-between shadow-sm sm:flex-row gap-4 mb-6 border p-6 rounded-lg">
        <div className="min-w-80">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by Job ID, Client, or Phlebotomist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg "
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg "
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg "
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>

          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#C9A14A] text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <FaDownload />
            Export
          </button>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="mb-6 rounded-lg border">
        <h2 className="text-lg  bg-gray-100 text-gray-900 p-3 border-b ">
          Transaction History
        </h2>

        <div className="">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 border-gray-200">
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Job ID
                </th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Client
                </th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Phlebotomist
                </th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Amount
                </th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Date
                </th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4  text-gray-700">{transaction.id}</td>
                  <td className="py-4 px-4 font-medium text-gray-700">
                    {transaction.client}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-700">
                    {transaction.phlebotomist}
                  </td>
                  <td className="py-4 px-4  text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-500"
                          : "bg-yellow-100 text-yellow-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-[#C9A14A]">
                      <FaEye
                        onClick={() => setShowPaymentModal(true)}
                        className="cursor-pointer"
                      />

                      <div className="w-32">
                        <SelectionDropdown
                          options={["Pending", "Approved"]} // action options
                          selected={
                            selectedTransactionAction[transaction.id] ||
                            transaction.action
                          }
                          onSelect={(action) =>
                            setSelectedTransactionAction((prev) => ({
                              ...prev,
                              [transaction.id]: action,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 p-5 bg-gray-100">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 rounded-lg py-2 text-sm border text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 border text-sm rounded-lg transition-colors duration-200 ${
                currentPage === page
                  ? "bg-[#C9A14A] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 rounded-lg py-2 border text-sm text-gray-500 hover:text-gray-700"
          >
            Next
          </button>
        </div>
      </div>

      {/* Payment Processing Modal */}
      <PayrollManagementDetails
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedTransaction(null);
        }}
        // transaction={selectedTransaction}
        transaction={true}
      />
    </div>
  );
};

export default PayrollManagement;
