import heroImage from "../../assets/images/ProvidersHero.png";

export function ProvidersHero() {
  return (
    <section className="bg-gradient-to-b from-white via-[#FAF6ED] to-[#FAF6ED] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c2c2c] leading-tight">
                Extend Your Care <br /> to Your Patient's <br /> Home
              </h1>
              <p className="text-lg text-[#2C2C2C] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Partner with VeniX Lab to provide professional healthcare
                services directly to your patients' homes. Enhance care quality
                while reducing costs and improving patient satisfaction.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-[#877018] to-[#C9A14A] text-white w-full sm:w-72 py-4 rounded-lg font-semibold text-lg">
                Start Partnership Application
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
