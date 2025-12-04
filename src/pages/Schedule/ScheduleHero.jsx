import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/services/service-hero-image.png";

export function ScheduleHero() {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/schedule");
  };
  return (
    <section className="bg-gradient-to-b from-white via-[#FAF6ED] to-[#FAF6ED] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0C1A2A] leading-tight">
                Schedule Your Service
              </h1>
              <p className="text-base font-medium text-[#2C2C2C] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Book your mobile phlebotomy or TRT service with our secure,
                HIPAA-compliant booking system. We'll confirm your appointment
                within 2 hours.
              </p>
              <p className="text-base font-medium text-[#C9A14A] leading-relaxed max-w-lg mx-auto lg:mx-0">
                HIPAA Compliant <br />
                Same-day availability <br />
                24/7 emergency support
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleBook}
                className="bg-gradient-to-r from-[#877018] to-[#C9A14A] text-white w-full sm:w-64 py-4 rounded-lg font-semibold text-lg"
              >
                Book an Appointment
              </button>
            </div>
          </div>

          {/* Right Image - Order changed for mobile */}
          <div className="order-first lg:order-last">
            <img
              src={heroImage}
              alt="Healthcare professionals conducting blood test"
              className="w-full h-auto max-h-[300px] md:max-h-[440px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
