"use client";

import { useState } from "react";
import AvatarImg from "../../assets/images/Image-52.png";
import {
  FaBriefcase,
  FaCalendar,
  FaClock,
  FaDownload,
  FaIdBadge,
  FaOrcid,
} from "react-icons/fa6";

const PayrollManagementDetails = ({ isOpen, onClose, transaction }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !transaction) return null;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      console.log("Payment processed successfully");
    }, 2000);
  };

  const jobDetails = {
    title: "Blood Draw Station",
    date: "July 15, 2025",
    time: "9:00 AM - 1:00 PM (4 hours)",
    jobId: "#JB-2025-0315",
    description:
      "Perform venipuncture and capillary punctures. Ensure proper specimen handling and labeling. Maintain a clean and sterile work environment.",
  };

  const paymentDetails = {
    hourlyRate: 25.0,
    totalHours: 4.0,
    subtotal: 100.0,
    serviceFee: -5.0,
    taxWithholding: -15.0,
    totalEarnings: 80.0,
  };

  const additionalDetails = {
    paymentMethod: "Direct Deposit",
    paymentDate: "July 17, 2025",
    jobId: "#JB-2024-0315",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white  shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 ">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Header */}
        <div className=" p-6 mt-12 ">
          <div className="flex items-center justify-between ">
            {/* Phlebotomist Profile */}
            <div>
              <h3 className="font-medium text-gray-500">Phlebotomist</h3>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src={AvatarImg}
                    alt="FA Kabita"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">FA Kabita</p>
                  <p className="text-sm text-gray-600">
                    Certified Phlebotomist
                  </p>
                  <div className="flex items-center  mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      4.9 (127 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Profile */}
            <div>
              <h3 className="font-medium text-gray-500">Client</h3>{" "}
              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src={AvatarImg}
                    alt="Dr. Ratul Hossain"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    Dr. Ratul Hossain
                  </p>
                  <p className="text-sm text-gray-600">Client</p>
                  <div className="flex items-center  mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      4.9 (127 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Payment Processing Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Payment Processing
              </h2>
              <p className="text-gray-600">Job ID: JOB-2025-001</p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-[#C9A14A] text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                  <FaDownload />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex items-start justify-center gap-4">
            <div className="flex-1">
              {/* Job Information */}
              <div className="border shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Information
                </h3>
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-center gap-3">
                    <FaBriefcase />
                    <span className="text-gray-700">{jobDetails.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendar />
                    <span className="text-gray-700">{jobDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock />
                    <span className="text-gray-700">{jobDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaOrcid />
                    <span className="text-gray-700">{jobDetails.jobId}</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {jobDetails.description}
                  </p>
                </div>
              </div>
              {/* Additional Details */}
              <div className="border shadow-sm rounded-lg p-6 mt-4">
                <div className="mb-2 ">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Additional Details
                  </h3>
                  <div className="">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm text-gray-600 mb-1">
                        Payment Method
                      </p>
                      <p className="font-medium text-gray-900">
                        {additionalDetails.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm text-gray-600 mb-1">Payment Date</p>
                      <p className="font-medium text-gray-900">
                        {additionalDetails.paymentDate}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm text-gray-600 mb-1">Job ID</p>
                      <p className="font-medium text-gray-900">
                        {additionalDetails.jobId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              {" "}
              {/* Payment Details */}{" "}
              <div className="border shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Details
                </h3>
                <div className="divide-y-2 divide-gray-100">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Hourly Rate</span>
                    <span className="font-medium text-gray-900">
                      ${paymentDetails.hourlyRate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Total Hours</span>
                    <span className="font-medium text-gray-900">
                      {paymentDetails.totalHours} hrs
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${paymentDetails.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Service Fee</span>
                    <span className="font-medium text-gray-900">
                      -${Math.abs(paymentDetails.serviceFee).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Tax Withholding</span>
                    <span className="font-medium text-gray-900">
                      -${Math.abs(paymentDetails.taxWithholding).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 ">
                    <div className="flex justify-between bg-yellow-50 rounded-b-lg px-1 py-2 rounded-lg">
                      <span className="text-lg font-semibold text-gray-900">
                        Total Earnings
                      </span>
                      <span className="text-lg font-bold text-yellow-600">
                        ${paymentDetails.totalEarnings.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Ready to Process Payment */}
              <div className="border shadow-sm rounded-lg p-6 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to Process Payment
                </h3>
                <p className="text-gray-600 mb-6">
                  Please review all details before confirming the payment
                </p>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back
                  </button>

                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="px-6 py-1 bg-[#C9A14A] text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Confirm Pay"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagementDetails;
