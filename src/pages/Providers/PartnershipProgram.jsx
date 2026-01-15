import React from "react";
import {
  Check,
  User,
  DollarSign,
  Clock,
  Zap,
  Calendar,
  Handshake,
} from "lucide-react";

const PartnershipProgram = () => {
  const benefits = [
    {
      icon: <User className="w-6 h-6 text-[#FF6B35]" />,
      title: "Professionalism",
      description:
        "Maintain the highest standards of care with our certified healthcare professionals and quality assurance protocols.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#00A86B]" />,
      title: "Cost Savings",
      description:
        "Reduce overhead costs and optimize resource allocation while expanding your service reach to more patients.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#FF6B35]" />,
      title: "Flexibility",
      description:
        "Scale services up or down based on demand with flexible scheduling and staffing solutions.",
    },
  ];

  const serviceModels = [
    {
      title: "On-Demand",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      features: [
        "Immediate service availability",
        "Pay-per-service model",
        "24/7 support access",
      ],
      buttonText: "Learn More",
      buttonStyle: "bg-yellow-600 hover:bg-yellow-700 text-white",
      isPopular: false,
    },
    {
      title: "Scheduled Staffing",
      icon: <Calendar className="w-8 h-8 text-[#00A86B]" />,
      features: [
        "Predictable scheduling",
        "Dedicated staff assignments",
        "Volume discounts",
      ],
      buttonText: "Learn More",
      buttonStyle: "bg-[#00A86B] hover:bg-green-600 text-white",
      isPopular: true,
      popularText: "Most Popular",
    },
    {
      title: "Full Partnership",
      icon: <Handshake className="w-8 h-8 text-[#FF6B35]" />,
      features: [
        "Complete integration",
        "Revenue sharing model",
        "Custom solutions",
      ],
      buttonText: "Learn More",
      buttonStyle: "bg-[#FF6B35] hover:bg-red-600 text-white",
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partnership Program Benefits Section */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-4">
              Partnership Program Benefits
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563]">
              Join our network and unlock new opportunities for your healthcare
              practice
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#E5E7EB] rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2c2c2c] mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[#4B5563] text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Service Models Section */}
        <div>
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2c2c2c] mb-4">
              Partnership Service Models
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563]">
              Choose the model that best fits your organization's needs
            </p>
          </div>

          {/* Service Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceModels.map((model, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-lg shadow-sm p-6 flex flex-col ${
                  model.isPopular
                    ? "border-2 border-[#C9A14A] transform md:scale-105"
                    : "border border-gray-200"
                }`}
              >
                {/* Most Popular Badge */}
                {model.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#C9A14A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {model.popularText}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                    {model.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#2c2c2c] text-center mb-6">
                  {model.title}
                </h3>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {model.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#00A86B] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-auto ${model.buttonStyle}`}
                >
                  {model.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipProgram;
