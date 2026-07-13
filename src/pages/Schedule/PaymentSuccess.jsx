import { useSearchParams, useNavigate } from "react-router-dom";
import { useConfirmPaymentSuccessQuery } from "../../store/services/appointmentApi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");

  const { data, isLoading, isError } = useConfirmPaymentSuccessQuery(
    { session_id: sessionId, booking_id: bookingId },
    { skip: !sessionId && !bookingId }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Confirming your payment...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white shadow-md rounded-xl p-8 border border-gray-200 max-w-md w-full">
          <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Payment Failed</h2>
          <p className="text-gray-500 mb-6">
            We could not confirm your payment. Please contact support.
          </p>
          <button
            onClick={() => navigate("/schedule")}
            className="bg-[#C9A14A] text-white font-medium py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center bg-white shadow-md rounded-xl p-8 border border-gray-200">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />

          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            Your payment has been successfully processed. A confirmation has been sent to your email.
          </p>

          <div className="bg-gray-50 rounded-lg p-5 text-left space-y-3 mb-6">
            <h3 className="text-[#C9A14A] font-semibold text-lg text-center mb-3">
              Booking Confirmed!
            </h3>

            {(data?.booking_id || bookingId) && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-semibold text-[#2c2c2c]">
                  {data?.booking_id || bookingId}
                </span>
              </div>
            )}
            {data?.appointment_date && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Appointment Date</span>
                <span className="font-semibold text-[#2c2c2c]">{data.appointment_date}</span>
              </div>
            )}
            {data?.start_time && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-semibold text-[#2c2c2c]">{data.start_time}</span>
              </div>
            )}
            {data?.service_package && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service</span>
                <span className="font-semibold text-[#2c2c2c]">{data.service_package}</span>
              </div>
            )}
            {data?.location && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-semibold text-[#2c2c2c]">{data.location}</span>
              </div>
            )}
            {data?.status && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="font-semibold text-green-600 capitalize">{data.status}</span>
              </div>
            )}
          </div>

          <p className="text-gray-400 text-sm mb-6">
            You will be contacted by a healthcare professional soon.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-[#C9A14A] text-white font-medium py-2 px-8 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
