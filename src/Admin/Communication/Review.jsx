"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import ContentReviewDetails from "./ContentReviewDetails";
import { useGetReviewsListQuery } from "../../store/services/dashboardApi";

const statusClass = {
  pending: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const Review = ({ onPageShow }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, isError } = useGetReviewsListQuery();

  const filtered = data?.results?.filter((r) =>
    statusFilter === "all" ? true : r.status === statusFilter
  );

  return (
    <div>
      <div style={{ fontFamily: "Montserrat" }} className="p-5 bg-white rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mt-6 mb-6">
        <button className="px-4 py-2 font-medium text-sm border-b-2 border-[#C9A14A] text-[#C9A14A]">
          Content
        </button>
        <button
          onClick={onPageShow}
          className="px-4 py-2 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 ml-6"
        >
          Messages
        </button>
      </div>

      {/* Reviews List */}
      <div className="border mb-6 divide-y-2 max-w-[800px] rounded-md">
        {isLoading && <div className="p-4 text-center">Loading reviews...</div>}
        {isError && <div className="p-4 text-center text-red-500">Failed to load reviews.</div>}
        {!isLoading && !isError && filtered?.length === 0 && (
          <div className="p-4 text-center text-gray-500">No reviews found.</div>
        )}
        {!isLoading && !isError && filtered?.map((review) => (
          <div
            key={review.id}
            onClick={() => setSelectedId(review.id)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex gap-2 mb-2 items-center">
                <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${statusClass[review.status] || "bg-gray-100 text-gray-700"}`}>
                  {review.status}
                </span>
                <span className="flex items-center gap-1 text-xs text-yellow-500 font-medium">
                  {review.rating} <FaStar className="text-[11px]" />
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">
                {review.reviewer_name} <span className="text-gray-400 text-xs capitalize">({review.reviewer_role})</span>
                {" → "}
                {review.reviewed_name} <span className="text-gray-400 text-xs capitalize">({review.reviewed_role})</span>
              </h3>
              <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
              <p className="text-xs text-gray-400">Job: {review.job} · {new Date(review.created_at).toLocaleDateString()}</p>
            </div>
            <div className="ml-4 self-start">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <ContentReviewDetails
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        reviewId={selectedId}
      />
    </div>
  );
};

export default Review;
