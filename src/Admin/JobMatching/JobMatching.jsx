import { useState } from "react";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import AvailablePhlebotomists from "./AvailablePhlebotomists";
import { useGetJobMatchingListQuery } from "../../store/services/jobMatchingApi";

const JobMatching = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("Last 30 days");
  const [skillFilter, setSkillFilter] = useState("Skill");

  const [openPhlebotomistsModal, setOpenPhlebotomistsModal] = useState(false);

  const { data, error, isLoading } = useGetJobMatchingListQuery();

  const jobs =
    data?.jobs?.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.created_by,
      distance: "2.1 miles away", // Placeholder, as not in API
      timeSlot: `${job.start_time} - ${job.end_time}`,
      date: new Date(job.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      duration: job.total_working_hour,
      payRate: `$${job.pay_rate}/${job.pay_type}`,
    })) || [];
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div style={{ fontFamily: "Montserrat" }} className="bg-white w-full  ">
      {/* Search and Filters */}
      <div className="p-6 border rounded-md m-5 ml-0 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="w-[450px] relative">
            <div className="absolute inset-y-0  left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
            </div>
            <input
              type="text"
              placeholder="Search by Job ID, Client, or Phlebotomist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg "
            />
          </div>

          {/* Time Filter */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg  bg-white"
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 24 hours</option>
            <option>All time</option>
          </select>

          {/* Skill Filter */}
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg  bg-white"
          >
            <option>Skill</option>
            <option>Blood Collection</option>
            <option>Phlebotomy</option>
            <option>Patient Care</option>
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="border shadow-sm  rounded-md overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div
                onClick={() => setSelectedJob(job)}
                key={job.id}
                className="  p-4  transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaLocationDot className="text-[#00A6A6]" />
                        <span>{job.distance}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaClock className="text-[#00A6A6]" />
                        <span>{job.timeSlot}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaCalendar className="text-[#00A6A6]" />
                        <span>{job.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {job.duration}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {job.payRate}
                      </div>
                    </div>

                    <button
                      onClick={() => setOpenPhlebotomistsModal(true)}
                      className=" text-white bg-gradient-to-r from-[#887113] to-[#C9A14A] text-sm px-4 py-1 rounded-lg font-medium transition-colors"
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AvailablePhlebotomists
        isOpen={openPhlebotomistsModal}
        onClose={() => setOpenPhlebotomistsModal(false)}
        job={selectedJob}
      />
    </div>
    // </div>
  );
};

export default JobMatching;
