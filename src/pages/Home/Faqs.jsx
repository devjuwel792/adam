import { useState } from "react";
import { Plus, X } from "lucide-react";
import faqImg from "../../assets/images/faq-img.png";

const faqs = [
  {
    question:
      "How do you ensure the professionals on your platform are qualified?",
    answer:
      "We have a strict vetting process. This includes verifying licenses with state boards, conducting thorough background checks, and confirming all required certifications (like CPR) are current and valid.",
  },
  {
    question: "What happens if a professional's license expires?",
    answer:
      "They must renew their license before continuing to provide services.",
  },
  {
    question: "How and when are the professionals paid?",
    answer: "Payments are processed weekly via secure payment channels.",
  },
  {
    question: "Are there any fees for the professionals?",
    answer:
      "No, professionals do not pay any fees to join or work on the platform.",
  },
  {
    question: "Are the professionals covered by insurance while on a shift?",
    answer:
      "Yes, we provide liability insurance for professionals during their shifts.",
  },
  {
    question: "Who is responsible for workers’ compensation insurance?",
    answer: "Workers’ compensation insurance is provided by our platform.",
  },
];

export default function Faqs() {
  const [active, setActive] = useState(null);

  const toggleFaq = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12 md:mb-16">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Illustration - order changed for mobile */}
          <div className="flex justify-center order-last md:order-first">
            <img src={faqImg} alt="FAQ illustration" className="w-full max-w-xs sm:max-w-sm md:max-w-md" />
          </div>

          {/* Right Accordion */}
          <div>
            <div className="border-t border-[#D7DEF0]"></div>
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#D7DEF0] py-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#2c2c2c]"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  {active === index ? (
                    <X className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                {active === index && (
                  <p className="mt-3 text-gray-700 text-base pr-6">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#FAF8F2] rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto flex flex-col justify-center items-center gap-5 mt-16 md:mt-24">
          <p className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#2c2c2c]">
            Unlock Your Productivity Potential
          </p>
          <p className="text-center text-gray-700">
            Are you a healthcare provider looking to ensure at-home lab services
            for your patients? Or a certified phlebotomist/nurse interested in
            finding work on your own schedule? Click below to access your account
            or download the VeniX Lab app
          </p>
          <button className="px-8 py-4 font-medium rounded-lg text-white hover:opacity-90 bg-gradient-to-r from-[#887113] to-[#C9A14A]">
            Download The App
          </button>
        </div>
      </div>
    </section>
  );
}
