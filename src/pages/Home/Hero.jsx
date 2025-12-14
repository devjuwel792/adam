import heroImage from "../../assets/images/hero-image.png";
import star from "../../assets/images/star.png";
import user from "../../assets/images/user.png";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-[#FAF6ED] to-[#FAF6ED] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0C1A2A] leading-tight">
                Professional <br />
                Blood Tests <span className="text-[#C9A14A]">At Your Home</span>
              </h1>
              <p className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Skip the clinic queues. Get accurate, certified blood tests done
                in the comfort of your home by qualified healthcare
                professionals.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-[#877018] to-[#C9A14A] text-white w-full sm:w-64 py-4 rounded-lg font-semibold text-lg">
                Hire Healthcare Staff
              </button>
              <button
                variant="outline"
                className="border border-[#877018] bg-gradient-to-r from-[#877018] to-[#C9A14A] bg-clip-text text-transparent w-full sm:w-64 py-4 rounded-lg font-semibold text-lg bg-transparent"
              >
                Get Paid Shifts
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

        {/* Social Proof */}
        <div className="mt-16 lg:mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Card 1 */}
            <div className="border border-[#E5E7EB] rounded-xl w-full max-w-xs sm:w-72 p-6 flex flex-col justify-center items-center bg-gradient-to-r from-[#FAF6ED] to-[#F4ECDB] shadow-lg">
              <img src={star} alt="Star rating icon" className="w-9 h-9 pb-2" />
              <p className="font-medium text-2xl">4.9/5</p>
              <p className="font-medium text-xl text-gray-600">Rating</p>
            </div>
            {/* Card 2 */}
            <div className="border border-[#E5E7EB] rounded-xl w-full max-w-xs sm:w-72 p-6 flex flex-col justify-center items-center bg-gradient-to-r from-[#FAF6ED] to-[#F4ECDB] shadow-lg">
              <img
                src={user}
                alt="Happy clients icon"
                className="w-9 h-9 pb-2"
              />
              <p className="font-medium text-2xl">10k+</p>
              <p className="font-medium text-xl text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
