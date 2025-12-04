import { useState } from "react";
import trust1 from "../../assets/images/trust1.png";
import trust2 from "../../assets/images/trust2.png";
import trust3 from "../../assets/images/trust3.png";
import trust4 from "../../assets/images/trust4.png";
import trust5 from "../../assets/images/trust5.png";

export function TrustSection() {
  const [isPaused, setIsPaused] = useState(false);

  const trustLogos = [trust1, trust2, trust3, trust4, trust5];

  return (
    <section className="bg-[#FDFCF8] py-12 sm:py-16 mb-16 sm:mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Trusted by Healthcare Leaders
          </h2>

          {/* Auto Slide Carousel */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex w-max"
              style={{
                animation: `trust-slide 12s linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt={`trust-${i}`}
                  className="w-28 sm:w-32 h-auto mx-4 sm:mx-6 object-contain"
                />
              ))}
            </div>
          </div>

          <style>
            {`
              @keyframes trust-slide {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}
          </style>
        </div>
      </div>
    </section>
  );
}
