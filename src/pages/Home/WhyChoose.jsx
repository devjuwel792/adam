import React from "react";
import box from "../../assets/images/box.png";
import dr from "../../assets/images/dr.png";
import home from "../../assets/images/home.png";
import safe from "../../assets/images/safe.png";
import clock from "../../assets/images/clock.png";

export const WhyChoose = () => {
  const features = [
    {
      icon: clock,
      title: "Fast Results",
      description: "Get your test results within 24-48 hours via secure digital delivery.",
    },
    {
      icon: home,
      title: "Home Convenience",
      description: "Professional blood tests in the comfort of your home. No travel, no waiting rooms.",
    },
    {
      icon: safe,
      title: "100% Safe & Secure",
      description: "HIPAA compliant with strict safety protocols and secure data handling.",
    },
    {
      icon: dr,
      title: "Certified Professionals",
      description: "Licensed phlebotomists and healthcare professionals ensure safe, accurate results.",
    },
  ];

  return (
    <section id="why-choose" className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose Primepath?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Experience the convenience of professional healthcare services
            delivered to your doorstep with uncompromising quality and
            reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <FeatureCard {...features[0]} />
            <FeatureCard {...features[1]} />
          </div>

          {/* Center Image - order-first on mobile/tablet, order-none on desktop */}
          <div className="order-first md:order-none lg:order-none flex justify-center items-center">
            <img src={box} alt="Primepath service box" className="w-64 h-64 sm:w-80 sm:h-80 object-contain" />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <FeatureCard {...features[2]} />
            <FeatureCard {...features[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 flex flex-col gap-3 items-center text-center">
    <img src={icon} alt={`${title} icon`} className="w-16 h-16" />
    <p className="font-semibold text-xl">{title}</p>
    <p className="text-base text-gray-600 max-w-xs">{description}</p>
  </div>
);
