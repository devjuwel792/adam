// import { useEffect, useState } from "react";
// import { useLocation, useSearchParams } from "react-router-dom"; // Assuming react-router-dom is used for routing

// export const PaymentSuccess = () => {
//   const [appointmentId, setAppointmentId] = useState(null);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const bookingId = searchParams.get("booking_id");
//     setAppointmentId(bookingId);
//   }, [searchParams]);

//   console.log("Appointment ID:", appointmentId);
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-7xl w-full pb-20">
//         {/* Header */}
//         <div className="max-w-4xl mx-auto">
//           {/* Title */}
//           <h2 className="text-4xl font-bold text-[#2C2C2C] mb-3 text-center">
//             Payment Successful!
//           </h2>
//           <p className="text-gray-600 text-lg mb-6 text-center max-w-3xl mx-auto">
//             Your payment has been successfully processed. A confirmation notice
//             with your service details has been sent to your email.
//           </p>

//           {/* Booking Confirmation */}
//           <div className="text-center bg-white shadow-md rounded-xl p-6 border border-gray-200 max-w-2xl mx-auto">
//             <h3 className="text-[#C9A14A] font-semibold text-xl ">
//               "Your Booking is Confirmed!"
//             </h3>
//             <p className="text-[#2c2c2c] text-xl font-semibold my-5">
//               Your Booking ID: {appointmentId}
//             </p>
//             <p className="text-gray-500 text-base font-medium mb-5">
//               "You will be contacted by a healthcare professional soon."
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const PaymentSuccess = () => {
  const [appointmentId, setAppointmentId] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const bookingId = searchParams.get("booking_id");
    setAppointmentId(bookingId);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full pb-20">
        <div className="max-w-4xl mx-auto px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-3 text-center">
            Payment Successful!
          </h2>

          <p className="text-gray-600 text-base md:text-lg mb-6 text-center max-w-3xl mx-auto">
            Your payment has been successfully processed.
          </p>

          <div className="text-center bg-white shadow-md rounded-xl p-4 sm:p-6 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-[#C9A14A] font-semibold text-lg sm:text-xl">
              Your Booking is Confirmed!
            </h3>

            <p className="text-[#2c2c2c] text-lg sm:text-xl font-semibold my-5">
              Your Booking ID: {appointmentId}
            </p>

            <p className="text-gray-500 text-sm sm:text-base font-medium mb-5">
              You will be contacted soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
