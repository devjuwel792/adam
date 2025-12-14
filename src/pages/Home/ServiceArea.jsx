import newyork from "../../assets/images/newyork.png";
import losangles from "../../assets/images/losangles.png";
import houston from "../../assets/images/houston.png";
import chicago from "../../assets/images/chicago.png";
import book from "../../assets/images/book.png";
import { useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    city: "New York City",
    areas: "Manhattan, Brooklyn, Queens, Bronx",
    icon: <img src={newyork} alt="" />,
  },
  {
    city: "Los Angeles",
    areas: "Downtown, Hollywood, Santa Monica",
    icon: <img src={losangles} alt="" />,
  },
  {
    city: "Chicago",
    areas: "Loop, North Side, South Side",
    icon: <img src={chicago} alt="" />,
  },
  {
    city: "Houston",
    areas: "Downtown, Memorial, Galleria",
    icon: <img src={houston} alt="" />,
  },
];

const reviews = [
  {
    name: "Elma Khuki",
    rating: 5,
    text: "So convenient! The nurse came right on time and I got my results within 24 hours.",
  },
  {
    name: "Elma Khuki",
    rating: 5,
    text: "So convenient! The nurse came right on time and I got my results within 24 hours.",
  },
  {
    name: "Elma Khuki",
    rating: 5,
    text: "So convenient! The nurse came right on time and I got my results within 24 hours.",
  },
];

export const ServiceArea = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/schedule");
  };
  return (
    <div className="w-full overflow-hidden"> {/* Add overflow-hidden for safety */}
      {/* Service Areas Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Service Areas</h2>
          <p className="text-lg sm:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            We provide home blood testing services across major cities. Check if we serve your area.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto my-12 md:my-16">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-[#FAF6ED] to-[#FAF6ED] rounded-xl shadow-md p-6 flex flex-col items-center text-center"
              >
                {s.icon}
                <h3 className="mt-3 font-semibold text-lg">{s.city}</h3>
                <p className="text-gray-600 text-sm mt-1">{s.areas}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-base text-[#2c2c2c]">
              Don’t see your city? We’re expanding rapidly!
            </p>
            <button className="mt-3 border border-[#C9A14A] text-[#C9A14A] px-5 py-2 rounded-md hover:bg-yellow-50 transition">
              Request Service in Your Area
            </button>
          </div>
        </div>
      </section>

      {/* Ready to Get Started */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFE3C9] rounded-2xl p-8 sm:p-12 md:p-16 text-center flex flex-col justify-center items-center gap-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c]">
              Ready to Get Started?
            </h3>
            <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-3xl mx-auto mb-4">
              Book your home blood test appointment today and experience the
              convenience of professional healthcare at your doorstep.
            </p>
            <button
              onClick={handleBook}
              className="flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#C9A14A] px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition font-semibold text-lg"
            >
              <img src={book} alt="Calendar icon" />
              <span>Book an Appointment Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 md:py-20 bg-[#FAF8F2] border-t border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-8 md:mb-12 text-center">
            What Our Customers Say
          </h3>
          <button
            onClick={() => setOpen(true)}
            className="text-[#CBA135] text-base font-semibold underline mb-4 block mx-auto md:mx-0"
          >
            Write a Review
          </button>
          {/* Modal */}
          {open && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-[#F5F5F5] rounded-xl p-6 w-full max-w-md shadow-lg relative">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
                  <h2 className="text-base font-semibold">Write a review</h2>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 cursor-pointer ${
                        i <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => setRating(i)}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{rating}.0</span>
                </div>

                {/* Textarea */}
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border border-[#E5E7EB] rounded-md p-3 h-24 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Buttons */}
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => {
                      console.log("Review Submitted:", { rating, review });
                      setOpen(false);
                    }}
                    className="px-16 py-2 text-sm font-medium rounded-lg text-white hover:opacity-90 bg-gradient-to-r from-[#887113] from-[5%] to-[#C9A14A] to-[100%]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg p-6 text-left"
              >
                <h4 className="text-base">{r.name}</h4>
                <div className="flex items-center space-x-1 my-2 text-yellow-500">
                  {Array(r.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    )) }
                </div>
                <p className="text-[#4B5563] text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
