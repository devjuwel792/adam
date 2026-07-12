"use client";

import { useState } from "react";
import { FaCertificate, FaLocationDot, FaStar } from "react-icons/fa6";
import Avatar from "../../assets/images/Image-52.png";
import ProfessionalComparison from "./ProfessionalComparison";
import toast from "react-hot-toast";
import { useGetAvailableUsersQuery, useAssignJobMutation } from "../../store/services/dashboardApi";

const AvailablePhlebotomists = ({ isOpen, onClose, job }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showCount, setShowCount] = useState(3);

  const { data, isLoading, isError } = useGetAvailableUsersQuery(undefined, {
    skip: !isOpen,
  });
  const [assignJob, { isLoading: isAssigning }] = useAssignJobMutation();

  const handleAssign = async (userId) => {
    try {
      await assignJob({ job_id: job?.id, phlebotomist_id: userId }).unwrap();
      toast.success("Job assigned successfully!");
      onClose();
    } catch {
      toast.error("Failed to assign job.");
    }
  };

  const users = data?.results ?? [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-[#003366]">Available Phlebotomists</h2>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">{data?.count ?? 0} found</p>
            <button
              onClick={onClose}
              className="text-gray-400 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {isLoading && <div className="text-center text-gray-500">Loading...</div>}
          {isError && <div className="text-center text-red-500">Error loading phlebotomists.</div>}
          {!isLoading && !isError && users.slice(0, showCount).map((user) => (
            <div key={user.id} className="shadow-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar ? `${import.meta.env.VITE_API_BASE_URL ?? ""}${user.avatar}` : Avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm text-gray-600">{user.rating} ({user.reviews_count})</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.is_available ? "bg-green-100 text-green-800" : "bg-yellow-100 text-orange-800"
                }`}>
                  {user.status}
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                <FaLocationDot className="text-[#00A6A6]" />
                {user.distance}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <FaCertificate className="text-[#00A6A6]" />
                {user.specialty} · {user.experience}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUserId(user.id)}
                  className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  View Profile
                </button>
                {user.is_available ? (
                  <button
                    onClick={() => handleAssign(user.id)}
                    disabled={isAssigning}
                    className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded-md text-sm font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAssigning ? "Assigning..." : "Assign Job"}
                  </button>
                ) : (
                  <button disabled className="flex-1 px-3 py-2 bg-gray-300 text-gray-500 rounded-md text-sm font-medium cursor-not-allowed">
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          ))}

          {showCount < users.length && (
            <button
              onClick={() => setShowCount((p) => p + 3)}
              className="w-full text-center text-[#C9A14A] font-medium text-sm py-2"
            >
              Load More Phlebotomists
            </button>
          )}
        </div>
      </div>

      <ProfessionalComparison
        isOpen={!!selectedUserId}
        onClose={() => setSelectedUserId(null)}
        userId={selectedUserId}
        job={job}
      />
    </div>
  );
};

export default AvailablePhlebotomists;
