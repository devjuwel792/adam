import { useState } from "react";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { FaBuilding } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  useGetJobsListQuery,
  useUpdateJobStatusMutation,
} from "../../store/services/dashboardApi";
import JobDetailsModal from "./JobDetailsModal";

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Pending Approval", value: "pending_approval" },
  { label: "Approved", value: "approved" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const statusColors = {
  draft: "bg-gray-100 text-gray-600",
  pending_approval: "bg-yellow-100 text-yellow-700",
  approved: "bg-teal-100 text-teal-700",
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const JobManagement = ({ onMessage }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetJobsListQuery({ search, status, date });
  const [updateJobStatus] = useUpdateJobStatusMutation();

  const jobs = data?.results || [];

  const handleStatusChange = async (job_id, newStatus) => {
    try {
      await updateJobStatus({ job_id, status: newStatus }).unwrap();
      toast.success("Job status updated successfully!");
    } catch {
      toast.error("Failed to update job status.");
    }
  };

  return (
    <div style={{ fontFamily: "Montserrat" }}>
      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4 flex-1 flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job title or job ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Total Jobs:{" "}
            <span className="font-semibold text-gray-900">
              {data?.pagination?.count ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-3xl bg-gray-50 w-full rounded-md my-7">
        <div className="p-6">
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No jobs found.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <span>Job ID: {job.id}</span>
                        <div className="flex items-center gap-1">
                          <FaBuilding />
                          <span>{job.client_business_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.city}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          ${job.pay_rate}/{job.pay_type}
                        </span>
                        <span>Shift: {job.shift_date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status badge + inline change */}
                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusChange(job.id, e.target.value)
                          }
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                            statusColors[job.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {STATUS_OPTIONS.filter((o) => o.value).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <span className="text-sm text-gray-500">
                          {job.posted_ago}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setIsModalOpen(true);
                      }}
                      className="w-5 h-5 cursor-pointer self-start text-gray-400 ml-3"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <JobDetailsModal
        isOpen={isModalOpen}
        jobId={selectedJobId}
        onMessage={onMessage}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJobId(null);
        }}
      />
    </div>
  );
};

export default JobManagement;
