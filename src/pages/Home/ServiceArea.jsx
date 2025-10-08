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
    <div className="w-full">
      <section className="py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Service Areas</h2>
          <p className="text-xl text-gray-900 pt-2 max-w-3xl mx-auto">
            We provide home blood testing services across major cities. Check if
            we <br /> serve your area.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto my-14">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-[#FAF6ED] to-[#FAF6ED] rounded-xl shadow py-6 px-8 flex flex-col items-center text-center"
            >
              {s.icon}
              <h3 className="mt-3 font-semibold">{s.city}</h3>
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
      </section>

      {/* Ready to Get Started */}
      <section className="bg-[#EFE3C9] py-24 px-36 mx-32 mb-32 text-center flex flex-col justify-center items-center gap-3">
        <h3 className="text-4xl font-bold text-[#2c2c2c]">
          Ready to Get Started?
        </h3>
        <p className="text-[#6B6B6B] text-xl max-w-3xl mx-auto mb-5">
          Book your home blood test appointment today and experience the
          convenience of professional healthcare at your doorstep.
        </p>
        <button className="flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#C9A14A] px-6 py-3 rounded-lg shadow transition">
          <img src={book} alt="" />
          <p onClick={handleBook} className="text-lg font-semibold">Book an Appointment Now</p>
        </button>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 bg-[#FAF8F2] border border-[#E5E7EB]">
        <h3 className="text-3xl font-medium text-[#2c2c2c] mt-2 mb-8 text-center">
          What Our Customers Say
        </h3>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setOpen(true)}
            className="text-[#CBA135] text-base font-semibold underline mb-3"
          >
            Write a Review
          </button>
          {/* Modal */}
          {/* Modal */}
          {open && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#F5F5F5] rounded-xl p-6 w-[400px] shadow-lg relative">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg p-6 text-left"
              >
                <h4 className="text-base">{r.name}</h4>
                <div className="flex items-center space-x-1 my-2 text-yellow-500">
                  {Array(r.rating)
                    .fill("⭐")
                    .map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
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
