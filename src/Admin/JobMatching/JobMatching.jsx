import { useState } from "react";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import AvailablePhlebotomists from "./AvailablePhlebotomists";
import { useGetJobMatchingListQuery } from "../../store/services/dashboardApi";

const statusClass = {
  open: "bg-green-100 text-green-700",
  approved: "bg-blue-100 text-blue-700",
  pending_approval: "bg-yellow-100 text-yellow-700",
};

const JobMatching = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const { data, isLoading, isError } = useGetJobMatchingListQuery();

  const allSkills = [...new Set(data?.jobs?.flatMap((j) => j.skills_required) ?? [])];

  const filtered = data?.jobs?.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill =
      skillFilter === "All" || job.skills_required.includes(skillFilter);
    return matchesSearch && matchesSkill;
  });

  return (
    <div style={{ fontFamily: "Montserrat" }} className="bg-white w-full">
      {/* Search and Filters */}
      <div className="p-6 border rounded-md mb-5 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-[450px] relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Job ID, Title, or Client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="All">All Skills</option>
            {allSkills.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="border shadow-sm rounded-md overflow-y-auto">
        {isLoading && <div className="text-center py-8 text-gray-500">Loading jobs...</div>}
        {isError && <div className="text-center py-8 text-red-500">Failed to load jobs.</div>}
        {!isLoading && !isError && filtered?.length === 0 && (
          <div className="text-center py-8 text-gray-500">No jobs found.</div>
        )}
        <div className="divide-y divide-gray-200">
          {!isLoading && !isError && filtered?.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusClass[job.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {job.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{job.client_name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaLocationDot className="text-[#00A6A6]" />
                      <span>{job.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-[#00A6A6]" />
                      <span>{job.shift_time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendar className="text-[#00A6A6]" />
                      <span>{job.shift_date}</span>
                    </div>
                  </div>
                  {job.skills_required?.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {job.skills_required.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 ml-4">
                  <div className="text-sm text-gray-500">{job.duration}</div>
                  <div className="text-lg font-semibold text-gray-900">{job.pay_rate}</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                    className="text-white bg-gradient-to-r from-[#887113] to-[#C9A14A] text-sm px-4 py-1 rounded-lg font-medium"
                  >
                    Invite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AvailablePhlebotomists
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobMatching;
