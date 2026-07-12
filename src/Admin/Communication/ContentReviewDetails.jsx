import { FaBan, FaCheck, FaStar, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import {
  useGetReviewDetailQuery,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
} from "../../store/services/dashboardApi";

const ContentReviewDetails = ({ isOpen, onClose, reviewId }) => {
  const { data, isLoading, isError } = useGetReviewDetailQuery(reviewId, {
    skip: !reviewId,
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateReviewStatusMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleStatus = async (status) => {
    try {
      await updateStatus({ id: reviewId, status }).unwrap();
      toast.success(`Review marked as ${status}.`);
      onClose();
    } catch {
      toast.error("Failed to update review status.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted.");
      onClose();
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  if (!isOpen) return null;

  const busy = isUpdating || isDeleting;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-md">
        {/* Close */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading && <div className="p-10 text-center">Loading review details...</div>}
        {isError && <div className="p-10 text-center text-red-500">Failed to load review.</div>}

        {!isLoading && !isError && data && (
          <div className="px-6 pb-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Review Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                Submitted on {new Date(data.created_at).toLocaleString()}
              </p>
            </div>

            {/* Review Info */}
            <div className="shadow-md rounded-md p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Job:</span>
                <span className="font-medium text-gray-900">{data.job}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reviewer:</span>
                <span className="text-gray-900">
                  {data.reviewer_name} <span className="text-gray-400 capitalize">({data.reviewer_role})</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reviewed:</span>
                <span className="text-gray-900">
                  {data.reviewed_name} <span className="text-gray-400 capitalize">({data.reviewed_role})</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating:</span>
                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                  {data.rating} <FaStar className="text-sm" />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="capitalize font-medium text-gray-800">{data.status}</span>
              </div>
              <div>
                <span className="text-gray-600 block mb-1">Comment:</span>
                <p className="text-gray-700 bg-gray-50 rounded-md p-3">{data.comment}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="shadow-md rounded-md p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Moderation Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleStatus("approved")}
                  disabled={busy || data.status === "approved"}
                  className="px-5 py-2 flex items-center gap-2 rounded-md text-sm font-medium border border-green-700 bg-green-100 text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheck className="text-xs" /> Approve
                </button>
                <button
                  onClick={() => handleStatus("rejected")}
                  disabled={busy || data.status === "rejected"}
                  className="px-5 py-2 flex items-center gap-2 rounded-md text-sm font-medium border border-orange-600 bg-orange-100 text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaBan className="text-xs" /> Reject
                </button>
                <button
                  onClick={handleDelete}
                  disabled={busy}
                  className="px-5 py-2 flex items-center gap-2 rounded-md text-sm font-medium border border-red-700 bg-red-100 text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaTrash className="text-xs" /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentReviewDetails;
