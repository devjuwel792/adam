import founder from "../../assets/images/sanvi.png";

export default function MeetFounder() {
  return (
    <section className="bg-[#F9FAFB] py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-6">
              Meet Our Founder
            </h2>

            <div className="space-y-6 text-[#4B5563] text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              <p>
                Dr. Sarah Mitchell founded VeniX Lab with a simple yet powerful
                vision: to make quality healthcare testing accessible to
                everyone, regardless of their location or mobility constraints.
              </p>
              <p>
                With over a decade of experience in clinical laboratory science
                and a deep understanding of patient needs, Dr. Mitchell
                recognized the gap between traditional lab services and modern
                healthcare demands.
              </p>
              <p>
                Her commitment to innovation, patient care, and community health
                drives every aspect of VeniX Lab's operations, ensuring we
                deliver not just results, but peace of mind.
              </p>
            </div>
          </div>

          {/* Right side - Founder image (order changed for mobile) */}
          <div className="flex flex-col items-center justify-center gap-6 order-first lg:order-last">
            <img
              src={founder}
              alt="Dr. Sanvi Ara - Founder"
              className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-xl shadow-lg"
            />
            <div className="text-center">
              <p className="text-2xl font-semibold text-[#2c2c2c]">
                Dr. Sanvi Ara
              </p>
              <p className="text-base font-medium text-[#C9A14A]">
                Founder & Chief Medical Officer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
