import { useState, useEffect, useMemo } from "react";
import {
  FaCertificate,
  FaAngleDown,
  FaFilePdf,
  FaCalendar,
  FaClock,
} from "react-icons/fa6";
import SelectionDropdown from "./SelectionDropdown";
import { useApproveRejectBusinessProfileMutation } from "../../store/services/dashboardApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocumentManager = ({ isOpen, onClose,data,count }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("All Document Types");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedAction, setSelectedAction] = useState({}); // { docId: action }
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const [approveRejectBusinessProfile] = useApproveRejectBusinessProfileMutation();

  // Sample document data
  // const documents = [
  //   {
  //     id: 1,
  //     type: "Medical Certificate",
  //     professional: "FA Kabita",
  //     role: "Phlebotomist",
  //     uploadDate: "Aug 15, 2025",
  //     timeAgo: "3 days ago",
  //     status: "pending",
  //   },
  //   {
  //     id: 2,
  //     type: "Medical Certificate",
  //     professional: "FA Kabita",
  //     role: "XYZ Business",
  //     uploadDate: "Aug 15, 2025",
  //     timeAgo: "3 days ago",
  //     status: "pending",
  //   },
  //   {
  //     id: 3,
  //     type: "Medical Certificate",
  //     professional: "FA Kabita",
  //     role: "XYZ Business",
  //     uploadDate: "Aug 15, 2025",
  //     timeAgo: "3 days ago",
  //     status: "pending",
  //   },
  //   {
  //     id: 4,
  //     type: "Medical Certificate",
  //     professional: "FA Kabita",
  //     role: "Phlebotomist",
  //     uploadDate: "Aug 15, 2025",
  //     timeAgo: "3 days ago",
  //     status: "pending",
  //   },
  //   {
  //     id: 5,
  //     type: "Medical Certificate",
  //     professional: "FA Kabita",
  //     role: "Phlebotomist",
  //     uploadDate: "Aug 15, 2025",
  //     timeAgo: "3 days ago",
  //     status: "pending",
  //   },
  //   {
  //     id: 6,
  //     type: "Medical Certificate",
  //     professional: "FA Kabita",
  //     role: "XYZ Business",
  //     uploadDate: "Aug 15, 2025",
  //     timeAgo: "3 days ago",
  //     status: "pending",
  //   },
  // ];

  // Filtered data based on search and filters
  const filteredData = useMemo(() => {
    let filtered = data || [];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((business) =>
        business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.user_full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Document type filter (using business_type)
    if (documentType !== "All Document Types") {
      filtered = filtered.filter((business) =>
        business.business_type.toLowerCase() === documentType.toLowerCase()
      );
    }

    // Date filter
    if (dateFilter !== "All Dates") {
      const now = new Date();
      let daysLimit;
      switch (dateFilter) {
        case "Last 7 days":
          daysLimit = 7;
          break;
        case "Last 30 days":
          daysLimit = 30;
          break;
        case "Last 90 days":
          daysLimit = 90;
          break;
        default:
          daysLimit = null;
      }
      if (daysLimit) {
        filtered = filtered.filter((business) => business.days_ago <= daysLimit);
      }
    }

    return filtered;
  }, [data, searchTerm, documentType, dateFilter]);

  const totalDocuments = filteredData.length;
  const documentsPerPage = 6;
  const totalPages = Math.ceil(totalDocuments / documentsPerPage);

  // Calculate pagination
  const startIndex = (currentPage - 1) * documentsPerPage;
  const endIndex = startIndex + documentsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, documentType, dateFilter]);

  const handleAction = async (docId, action) => {
    console.log(`Document ${docId} -> ${action}`);
    setSelectedAction((prev) => ({ ...prev, [docId]: action }));

    try {
      const result = await approveRejectBusinessProfile({
        user_id: docId.toString(),
        action: action === "approved" ? "approve" : "reject",
      });

      if (result.data) {
        console.log("Profile action successful:", result.data);
        toast.success("Business Owner account status updated to approved.");
        // Optionally, you can update the local state or refetch data here
      } else if (result.error) {
        console.error("Profile action failed:", result.error);
        toast.error("Business Owner account status updated faild");
      }
    } catch (error) {
      console.error("Error approving/rejecting profile:", error);
      toast.error("Business Owner account status updated faild");
    }

    setOpenDropdownId(null);
  };

  const handleViewDetails = (docId) => {
    console.log("Viewing details for document:", docId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f9fafb] rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-end p-6 ">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light bg-[#eeeff1] rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6  mx-4 rounded-md bg-white">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-4/12 relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
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
                  placeholder="Search by user name or document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="px-4 py-2 hidden border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Document Types</option>
                <option>Medical Certificate</option>
                <option>Professional License</option>
                <option>Insurance Certificate</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Dates</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="w-32 hidden">
              <SelectionDropdown
                options={["pending", "active", "draft"]}
                selected={selectedStatus}
                onSelect={(status) => setSelectedStatus(status)}
              />
            </div>
          </div>
        </div>

        {/* Document Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((business) => (
              <div key={business.id} className="bg-[#f1f1f1] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-md flex items-center justify-center">
                    <FaCertificate className="text-purple-500 text-[34px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {business.business_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {business.user_full_name} ({business.business_type})
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendar />
                    Created: {new Date(business.created).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaClock />
                    {business.days_ago} days ago
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(business.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#878787] text-white text-sm rounded-md  transition-colors"
                  >
                    <FaFilePdf />
                    View Details
                  </button>

                  {/* Dropdown Button */}
                  <div className="flex-1">
                    <SelectionDropdown
                      options={["approved", "deny"]}
                      selected={selectedAction[business.id]}
                      onSelect={(action) => handleAction(business.id, action)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * documentsPerPage + 1}-{Math.min(currentPage * documentsPerPage, totalDocuments)} of {totalDocuments} documents
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-[7px] text-gray-400 border border-gray rounded-md hover:text-gray-600 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md border text-sm font-medium ${
                    currentPage === page
                      ? "bg-[#C9A14A] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-[7px] border border-gray rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
