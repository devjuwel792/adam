import { useState, useMemo, useEffect } from "react";
import { FaCertificate, FaCalendar, FaClock, FaFilePdf } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useApproveDocumentMutation } from "../../store/services/dashboardApi";

const DocumentManager = ({ isOpen, onClose, data = [], count }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [approveDocument] = useApproveDocumentMutation();
  const documentsPerPage = 6;

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      (doc) =>
        doc.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / documentsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * documentsPerPage,
    currentPage * documentsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    const max = 4;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const handleApprove = async (doc, approve) => {
    try {
      await approveDocument({ user_id: doc.user_id, document_id: doc.id, approve }).unwrap();
      toast.success(`Document ${approve ? "approved" : "rejected"} successfully!`);
    } catch {
      toast.error("Failed to update document status.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f9fafb] rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-end p-6">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light bg-[#eeeff1] rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-6 mx-4 rounded-md bg-white">
          <div className="relative w-4/12">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by user name or document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((doc) => (
              <div key={doc.id} className="bg-[#f1f1f1] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-md flex items-center justify-center">
                    <FaCertificate className="text-purple-500 text-[34px]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{doc.document_name}</h3>
                    <p className="text-sm text-gray-600">
                      {doc.user_name} ({doc.user_role})
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendar /> Uploaded: {doc.uploaded_on}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaClock /> {doc.uploaded_ago}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={doc.document_file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#878787] text-white text-sm rounded-md"
                  >
                    <FaFilePdf /> View File
                  </a>
                  {!doc.approved ? (
                    <button
                      onClick={() => handleApprove(doc, true)}
                      className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-md"
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="flex-1 flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 text-sm rounded-md">
                      Approved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * documentsPerPage + 1, filteredData.length)}–
              {Math.min(currentPage * documentsPerPage, filteredData.length)} of {filteredData.length} documents
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-[7px] text-gray-400 border rounded-md hover:text-gray-600 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md border text-sm font-medium ${
                    currentPage === page ? "bg-[#C9A14A] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-[7px] border rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
