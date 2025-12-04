import hero from "../../assets/images/terms-hero.png"
import i from "../../assets/images/info.png"
import { useNavigate } from "react-router-dom";

export default function Terms() {
    const navigate = useNavigate();
    const handleNextButton = () => {
        navigate("/privacy")
    }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={hero}
          alt="Medical equipment and healthcare"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide text-center">
            Terms & Condition
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-white rounded-3xl shadow-md border border-[#A1A1A1]/14 p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 pb-6 border-b border-[#E5E7EB]">
            <h2 className="text-2xl font-semibold text-[#C9A14A]">
              Terms & Condition
            </h2>
            <div className="flex items-center text-[#6B7280] text-sm self-start md:self-center">
              Last updated: July 19, 2025
            </div>
          </div>

          {/* Terms of Service */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-[#0C1A2A] mb-4">
              1. Terms of Service
            </h3>
            <p className="text-[#0C1A2A] leading-relaxed mb-4">
              By using Phlebotomist services, you agree to provide accurate
              healthcare services in accordance with professional standards and
              applicable regulations. This agreement establishes the framework
              for our partnership.
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-[#0C1A2A] mb-3">Key Points:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0C1A2A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-[#0C1A2A]">
                    Professional liability coverage required
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0C1A2A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-[#0C1A2A]">
                    Compliance with HIPAA regulations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#0C1A2A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-[#0C1A2A]">
                    24-hour cancellation policy
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Payment Policies */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-[#0C1A2A] mb-4">
              2. Payment Policies
            </h3>
            <p className="text-[#0C1A2A] leading-relaxed mb-4">
              Payment terms are Net 15 days from service completion. Direct
              deposit is our preferred payment method, with payments processed
              bi-weekly.
            </p>

            <div className="bg-[#EFF6FF] border-l-4 border-[#C9C9C9] p-4 rounded-r-lg">
              <div className="flex gap-2 items-center">
                <img src={i} alt="Information icon" />
                <span className="text-blue-800 font-medium text-sm">
                  Average processing time: 2-3 business days
                </span>
              </div>
            </div>
          </section>

          {/* Legal Disclaimers */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-[#0C1A2A] mb-4">
              3. Legal Disclaimers
            </h3>
            <p className="text-[#0C1A2A] leading-relaxed">
              This agreement is governed by state healthcare regulations. Both
              parties acknowledge understanding of their rights and
              responsibilities under this partnership.
            </p>
          </section>

          {/* Next Button */}
          <div className="flex justify-end pt-6">
            <button onClick={handleNextButton} className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
