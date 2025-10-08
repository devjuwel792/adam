import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/services/service-hero-image.png";

export function ServiceHero() {
    const navigate = useNavigate();

  const handleBook = () => {
    navigate("/schedule");
  };
  return (
    <section className="bg-gradient-to-b from-white via-[#FAF6ED] via-60% to-[#FAF6ED] to-100% py-16 lg:py-24 mb-52 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-[#0C1A2A] leading-tight">
                Professional
                <br />
                Healthcare <span className="text-[#C9A14A]">SERVICES</span>
              </h1>
              <p className="text-lg text-[#2C2C2C] leading-relaxed max-w-lg">
                Bringing quality healthcare directly to you. Convenient,
                personalized, and professional medical services at your
                doorstep.
              </p>
              <p className="text-lg text-[#2C2C2C] leading-relaxed max-w-lg">
                We understand that your health is your priority, and getting the
                care you need should be easy and stress-free. Our professional
                mobile healthcare services provide a convenient and high-quality
                alternative to traditional clinic visits.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-7">
              <button onClick={handleBook} className="bg-gradient-to-r from-[#877018] to-[#C9A14A] text-white w-64 h-16 rounded-lg font-semibold text-lg">
                Book an Appointment
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="">
              <img
                src={heroImage}
                alt="Healthcare professionals conducting blood test"
                className="w-full h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
