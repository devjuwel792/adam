import hero from "../../assets/images/terms-hero.png";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      intro: "We collect the following types of data:",
      list: [
        "<strong>Personal Information:</strong> Name, email, and account details.",
        "<strong>Voice Data:</strong> Audio samples uploaded for AI voice cloning.",
        "<strong>Usage Data:</strong> Interactions with our platform, such as settings, preferences, and feedback.",
        "<strong>Payment Information:</strong> Processed securely through third-party payment providers.",
      ],
    },
    {
      title: "2. How We Use Your Data",
      intro: "We use your data to:",
      list: [
        "Provide and improve our AI voice cloning services.",
        "Personalize your AI-generated voice experience.",
        "Enhance AI accuracy based on user interactions.",
        "Ensure security and prevent fraudulent activities.",
        "Send updates, promotions, or important notifications (you can opt out anytime).",
      ],
    },
    {
      title: "3. Data Sharing & Security",
      list: [
        "We do not sell your personal data to third parties.",
        "Voice data is processed securely and used solely for AI training within your account.",
        "We may share necessary data with service providers (e.g., payment processors) under strict confidentiality agreements.",
        "Data is protected with encryption and security measures to prevent unauthorized access.",
      ],
    },
    {
      title: "4. User Control & Choices",
      list: [
        "You can update or delete your account information from the My Profile section.",
        "You can request data deletion by contacting [Your Support Email].",
        "You can manage communication preferences (e.g., email notifications).",
      ],
    },
    {
      title: "5. Data Retention",
      list: [
        "We retain user data only as long as necessary to provide our services.",
        "Upon account deletion, personal data is permanently removed, except as required by law.",
      ],
    },
    {
      title: "6. Children's Privacy",
      list: [
        "Our platform is not intended for users under the age of [age].",
        "We do not knowingly collect data from minors.",
      ],
    },
    {
      title: "7. Changes to This Policy",
      list: [
        "We may update this policy from time to time. Continued use of the platform after updates means you accept the changes.",
      ],
    },
    {
      title: "8. Contact Us",
      list: [
        "For any questions or privacy concerns, contact us at [Your Support Email].",
      ],
    },
  ];
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
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-white rounded-3xl shadow-md border border-[#A1A1A1]/14 p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 pb-6 border-b border-[#E5E7EB]">
            <h2 className="text-2xl font-semibold text-[#C9A14A]">
              Privacy Policy
            </h2>
            <div className="flex items-center text-gray-500 text-sm self-start md:self-center">
              Last updated: July 19, 2025
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <p className="text-gray-700 leading-relaxed">
              Welcome to [Your App Name]. Your privacy is important to us. This
              Privacy Policy explains how we collect, use, and protect your data
              when you use our AI voice cloning platform.
            </p>

            {/* Dynamically Generated Sections */}
            {sections.map((section, index) => (
              <section key={index}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                {section.intro && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {section.intro}
                  </p>
                )}
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {section.list.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
