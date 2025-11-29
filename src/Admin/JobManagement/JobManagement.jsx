import { useState } from "react";
import { Search, Bell, MapPin, ChevronRight, Calendar } from "lucide-react";
import DatePicker from "../DataPicker";
import { FaAngleDown, FaBuilding } from "react-icons/fa6";
import JobDetailsModal from "./JobDetailsModal";
import SelectionDropdown from "../Dashboard/SelectionDropdown";
import { useGetJobsListQuery } from "../../store/services/jobManagementApi";

const JobManagement = ({ onMessage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [visibleJobsCount, setVisibleJobsCount] = useState(10);

  const { data, error, isLoading } = useGetJobsListQuery();

  const jobs = data?.jobs?.map((job) => ({
    id: job.id,
    title: job.title,
    jobId: `#JOB-${job.id}`,
    company: job.created_by,
    location: job.location,
    payRate: `$${job.pay_rate}/${job.pay_type}`,
    postedTime: `Posted ${job.posted_hours_ago} hours ago`,
    status: job.active_status,
  })) || [];

  // state for selected job status
  const [selectedJobStatus, setSelectedJobStatus] = useState({}); // { jobId: "Published" }

  // replace the span with SelectionDropdown
  const getStatusDropdown = (job) => {
    return (
      <div className="w-32">
        <SelectionDropdown
          options={["Published", "Approved"]}
          selected={selectedJobStatus[job.id] || job.status}
          onSelect={(status) =>
            setSelectedJobStatus((prev) => ({
              ...prev,
              [job.id]: status,
            }))
          }
          icon={<FaAngleDown />} // icon pass করো
        />
      </div>
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const visibleJobs = filteredJobs.slice(0, visibleJobsCount);

  const handleLoadMore = () => {
    setVisibleJobsCount((prev) => prev + 10);
  };

  return (
    <div style={{ fontFamily: "Montserrat" }} className=" ">
      {/* Header */}
      {/* <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-1">Review and manage job postings on the platform</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <img src="/professional-woman-headshot.png" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          </div>
        </div>
      </div> */}

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg   "
              >
                <option>All Status</option>
                <option>Published</option>
                <option>Active</option>
                <option>Approved</option>
                <option>Pending</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Date:</span>
              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 pr-10 border border-gray-300 rounded-lg "
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div> */}
              <DatePicker />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Total Jobs: <span className="font-semibold text-gray-900">247</span>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-3xl bg-gray-50 w-full rounded-md my-7">
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {visibleJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg p-4  transition-colors "
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {job.title}
                          </h3>
                        </div>

                        <div className="flex items-center space-x-4 text-sm  mb-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm ">Job ID : {job.jobId}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaBuilding />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {job.payRate}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getStatusDropdown(job)}
                          <span className="text-sm text-gray-500">
                            {job.postedTime}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        onClick={() => {
                          setSelectedJob(job);
                          setIsModalOpen(true);
                        }}
                        className="w-5 h-5 cursor-pointer self-start text-gray-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {visibleJobsCount < filteredJobs.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <JobDetailsModal
        isOpen={isModalOpen}
        job={selectedJob}
        onMessage={() => onMessage()}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
      />
    </div>
  );
};

export default JobManagement;
