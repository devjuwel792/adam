import { Check } from "lucide-react";
import book from "../../assets/images/book.png";
import dr from "../../assets/images/dr-2.png";
import heart from "../../assets/images/heart.png";
import tic from "../../assets/images/tic.png";


const HealthcareProcess = () => {
  const steps = [
    {
      number: 1,
      icon: <img src={book} alt="Booking icon" />,
      title: "Book Your Service",
      description:
        "Schedule your appointment online or by phone at your preferred time and location.",
    },
    {
      number: 2,
      icon: <img src={dr} alt="Doctor icon" />,
      title: "Professional Arrives",
      description:
        "Our licensed healthcare professional arrives at your location with all necessary equipment.",
    },
    {
      number: 3,
      icon: <img src={heart} alt="Heart icon" />,
      title: "Receive Your Care",
      description:
        "Experience professional healthcare services in the comfort and privacy of your own space.",
    },
    {
      number: 4,
      icon: <img src={tic} alt="Checkmark icon" />,
      title: "Enjoy Easy Recovery",
      description:
        "Receive your results and follow-up care instructions, all while staying comfortable at home.",
    },
  ];

  const pricingPlans = [
    {
      type: "Individual Service",
      price: "$75",
      priceNote: "/service",
      features: [
        "Single service visit",
        "Professional healthcare provider",
        "All necessary equipment",
        "Service documentation",
      ],
      buttonText: "Select Service",
      buttonStyle: "bg-[#C9A14A] hover:bg-yellow-700 text-white",
    },
    {
      type: "Care Package",
      price: "$200",
      priceNote: "/package",
      isPopular: true,
      features: [
        "3 service visits",
        "Priority scheduling",
        "Comprehensive health report",
        "Follow-up consultation",
      ],
      buttonText: "Select Package",
      buttonStyle: "bg-[#C9A14A] hover:bg-yellow-700 text-white",
    },
    {
      type: "Custom Plan",
      price: "Custom",
      priceNote: "/quote",
      features: [
        "Tailored service plan",
        "Multiple visit options",
        "Dedicated care coordinator",
        "Enterprise solutions",
      ],
      buttonText: "Get Quote",
      buttonStyle: "bg-[#C9A14A] hover:bg-yellow-700 text-white",
    },
  ];

  return (
    <div className="bg-[#FAF6ED] min-h-screen">
      {/* How it Works Section */}
      <div className="py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-4">
              How it Works
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563]">
              Simple steps to receive professional healthcare at your
              convenience
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                {/* Step Number */}
                <div className="w-12 h-12 bg-[#C9A14A] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-[#EFE3C9] rounded-full flex items-center justify-center text-yellow-700 mx-auto mb-4">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#2c2c2c] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#4B5563] text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transparent Pricing Section */}
      <div className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563]">
              Clear, upfront pricing with no hidden fees
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-lg p-6 ${
                  plan.isPopular
                    ? "bg-[#C9A14A] text-white shadow-xl transform md:scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {/* Most Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-[#C9A14A] text-xs font-semibold px-3 py-1 rounded-full border border-[#C9A14A]">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Type */}
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    plan.isPopular ? "text-white" : "text-[#2c2c2c]"
                  }`}
                >
                  {plan.type}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className={`text-3xl sm:text-4xl font-bold ${
                      plan.isPopular ? "text-white" : "text-[#C9A14A]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-base ml-1 ${
                      plan.isPopular ? "text-white" : "text-[#6B7280]"
                    }`}
                  >
                    {plan.priceNote}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm"
                    >
                      <Check
                        className={`w-4 h-4 mr-3 flex-shrink-0 ${
                          plan.isPopular ? "text-white" : "text-[#10B981]"
                        }`}
                      />
                      <span
                        className={
                          plan.isPopular ? "text-white" : "text-[#2c2c2c]"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${
                    plan.isPopular
                      ? "bg-white text-[#C9A14A] hover:bg-gray-50"
                      : plan.buttonStyle
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareProcess;
