"use client";

import AvatarImg from "../../assets/images/Image-52.png";
import { FaBriefcase, FaCalendar, FaClock, FaDownload, FaHashtag } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useGetPayrollDetailQuery,
  useConfirmPaymentMutation,
} from "../../store/services/dashboardApi";

const StarRating = ({ rating }) => (
  <div className="flex items-center mt-1">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`} />
    ))}
    <span className="text-sm text-gray-600 ml-1">{rating}</span>
  </div>
);

const PayrollManagementDetails = ({ isOpen, onClose, jobId }) => {
  const { data, isLoading, isError } = useGetPayrollDetailQuery(jobId, {
    skip: !jobId,
  });

  const [confirmPayment, { isLoading: isConfirming }] = useConfirmPaymentMutation();

  const handleConfirmPayment = async () => {
    try {
      await confirmPayment(jobId).unwrap();
      toast.success("Payment confirmed successfully.");
      onClose();
    } catch {
      toast.error("Failed to confirm payment.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
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

        {isLoading && <div className="p-10 text-center">Loading payment details...</div>}
        {isError && <div className="p-10 text-center text-red-500">Failed to load details.</div>}

        {!isLoading && !isError && data && (
          <>
            {/* Profiles */}
            <div className="p-6 flex items-center justify-between">
              {/* Phlebotomist */}
              <div>
                <h3 className="font-medium text-gray-500 mb-3">Phlebotomist</h3>
                <div className="flex items-center gap-3">
                  <img src={AvatarImg} alt={data.phlebotomist?.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-lg font-bold text-gray-900">{data.phlebotomist?.name}</p>
                    <p className="text-sm text-gray-600">{data.phlebotomist?.role}</p>
                    <p className="text-xs text-gray-400">{data.phlebotomist?.specialty}</p>
                    <StarRating rating={data.phlebotomist?.rating} />
                    <p className="text-xs text-gray-400">{data.phlebotomist?.reviews_count} reviews</p>
                  </div>
                </div>
              </div>

              {/* Client */}
              <div>
                <h3 className="font-medium text-gray-500 mb-3">Client</h3>
                <div className="flex items-center gap-3">
                  <img src={AvatarImg} alt={data.client?.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-lg font-bold text-gray-900">{data.client?.name}</p>
                    <p className="text-sm text-gray-600">{data.client?.role}</p>
                    <StarRating rating={data.client?.rating} />
                    <p className="text-xs text-gray-400">{data.client?.reviews_count} reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Payment Processing</h2>
                  <p className="text-gray-600">Job ID: {data.job_id}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium ${
                    data.status === "Completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {data.status}
                  </span>
                </div>
                <button className="px-4 py-2 bg-[#C9A14A] text-white rounded-lg font-medium flex items-center gap-2">
                  <FaDownload /> Export
                </button>
              </div>

              <div className="flex items-start gap-4">
                {/* Left Column */}
                <div className="flex-1 space-y-4">
                  {/* Job Information */}
                  <div className="border shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                    <div className="space-y-3 text-gray-400">
                      <div className="flex items-center gap-3">
                        <FaBriefcase />
                        <span className="text-gray-700">{data.job_info?.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCalendar />
                        <span className="text-gray-700">{data.job_info?.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaClock />
                        <span className="text-gray-700">{data.job_info?.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaHashtag />
                        <span className="text-gray-700">{data.job_info?.job_code}</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{data.job_info?.description}</p>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="border shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium text-gray-900">{data.additional_details?.payment_method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Date</span>
                        <span className="font-medium text-gray-900">{data.additional_details?.payment_date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job ID</span>
                        <span className="font-medium text-gray-900">{data.additional_details?.job_id_ref}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex-1 space-y-4">
                  {/* Payment Details */}
                  <div className="border shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                    <div className="divide-y-2 divide-gray-100">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-700">Hourly Rate</span>
                        <span className="font-medium text-gray-900">${data.payment_details?.hourly_rate}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-700">Total Hours</span>
                        <span className="font-medium text-gray-900">{data.payment_details?.total_hours} hrs</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-700">Subtotal</span>
                        <span className="font-medium text-gray-900">${data.payment_details?.subtotal}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-700">Service Fee</span>
                        <span className="font-medium text-gray-900">${data.payment_details?.service_fee}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-700">Tax Withholding</span>
                        <span className="font-medium text-gray-900">${data.payment_details?.tax_withholding}</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between bg-yellow-50 rounded-lg px-2 py-2">
                          <span className="text-lg font-semibold text-gray-900">Total Earnings</span>
                          <span className="text-lg font-bold text-yellow-600">${data.payment_details?.total_earnings}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Payment */}
                  <div className="border shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Process Payment</h3>
                    <p className="text-gray-600 mb-6">Please review all details before confirming the payment</p>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                      </button>
                      <button
                        onClick={handleConfirmPayment}
                        disabled={isConfirming || data.status === "Completed"}
                        className="px-6 py-2 bg-[#C9A14A] text-white rounded-lg font-medium flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isConfirming ? "Processing..." : "Confirm Pay"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PayrollManagementDetails;
