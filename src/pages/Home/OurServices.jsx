import cardIcon1 from "../../assets/images/services/card-icon1.png";
import cardIcon2 from "../../assets/images/services/card-icon2.png";
import card1 from "../../assets/images/services/card1.png";
import card2 from "../../assets/images/services/card2.png";
import card3 from "../../assets/images/services/card3.png";
import card4 from "../../assets/images/services/card4.png";
import card5 from "../../assets/images/services/card5.png";
import card6 from "../../assets/images/services/card6.png";

const services = [
  {
    title: "Complete Blood Count (CBC)",
    bg: "#FAF6ED",
    textColor: "#2C2C2C",
    icon: cardIcon1,
    cardImg: card1,
    learnColor: "#2c2c2c",
  },
  {
    title: (
      <>
        Mobile Blood <br /> Draws
      </>
    ),
    bg: "#C9A14A",
    textColor: "#2C2C2C",
    icon: cardIcon1,
    cardImg: card2,
    learnColor: "#2c2c2c",
  },
  {
    title: "Injection & Therapeutics",
    bg: "#2C2C2C",
    textColor: "#ffffff",
    icon: cardIcon2,
    cardImg: card3,
    learnColor: "#ffffff",
  },
  {
    title: (
      <>
        TRT <br /> Service
      </>
    ),
    bg: "#FAF6ED",
    textColor: "#2C2C2C",
    icon: cardIcon1,
    cardImg: card4,
    learnColor: "#2c2c2c",
  },
  {
    title: (
      <>
        Diabetes <br /> Panel
      </>
    ),
    bg: "#C9A14A",
    textColor: "#2C2C2C",
    icon: cardIcon1,
    cardImg: card5,
    learnColor: "#2c2c2c",
  },
  {
    title: (
      <>
        Mobile Blood <br /> Draws
      </>
    ),
    bg: "#2C2C2C",
    textColor: "#ffffff",
    icon: cardIcon2,
    cardImg: card6,
    learnColor: "#ffffff",
  },
];

export const OurServices = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Comprehensive blood testing services available at your home with
          professional care and accurate results.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row justify-between items-center border-x border-t border-b-8 border-[#2c2c2c] shadow-lg rounded-[45px] p-6 sm:p-8 md:p-10"
              style={{ background: service.bg }}
            >
              <div className="flex flex-col justify-between h-full w-full text-center sm:text-left">
                <p
                  className="font-medium text-2xl md:text-3xl mb-8 sm:mb-0"
                  style={{ color: service.textColor }}
                >
                  {service.title}
                </p>
                <div className="flex items-center gap-4 justify-center sm:justify-start mt-auto">
                  <img src={service.icon} alt="learn more icon" className="w-8 h-8" />
                  <p className="text-lg md:text-xl" style={{ color: service.learnColor }}>
                    Learn more
                  </p>
                </div>
              </div>
              <img src={service.cardImg} alt={`${service.title} illustration`} className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain mt-6 sm:mt-0 sm:ml-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
