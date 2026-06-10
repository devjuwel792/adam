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
        <div class="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg my-10">

          <h1 class="text-3xl font-bold mb-2">Privacy Policy for PrimePath</h1>
          <p class="text-sm text-gray-500 mb-6">Effective Date: June 10, 2026</p>

          <p class="mb-6">
            PrimePath (“we,” “us,” or “our”), powered by
            VeniX Lab Homecare Services LLC, respects and protects the privacy of its users.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Service.
          </p>

          <p class="mb-8">
            By accessing or using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>


          <h2 class="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><b>Identifiers & Contact Details:</b> Name, address, email address, and telephone number.</li>
            <li><b>Professional & Employment Information:</b> Healthcare license information, certifications, qualifications, background checks, tax info.</li>
            <li><b>Financial Information:</b> Banking and payment details.</li>
            <li><b>Device & Usage Data:</b> Device model, OS, and usage statistics.</li>
            <li><b>Location Data:</b> Precise or approximate location for assignment matching and security.</li>
            <li><b>User Content:</b> Uploaded documents, forms, and credentials.</li>
          </ul>

          <h2 class="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li>Account creation and credential verification</li>
            <li>Assignment matching and workforce management</li>
            <li>Payment processing via third-party vendors</li>
            <li>Security, fraud prevention, and compliance</li>
            <li>Customer support and communication</li>
            <li>Service improvement and analytics</li>
          </ul>

          <h2 class="text-2xl font-semibold mb-3">3. HIPAA and Healthcare Data Notice</h2>
          <p class="mb-4">
            The Service may involve handling of Protected Health Information (PHI) under HIPAA-compliant workflows.
          </p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li><b>Minimum Necessary Standard:</b> Only required data should be accessed.</li>
            <li><b>Security Safeguards:</b> Administrative, technical, and physical protections are applied.</li>
            <li><b>User Responsibility:</b> Users must report any suspected breach immediately.</li>
          </ul>

          <h2 class="text-2xl font-semibold mb-3">4. Data Sharing</h2>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li>Trusted service providers (payments, hosting, background checks)</li>
            <li>Legal and regulatory compliance requirements</li>
            <li>Protection of rights, safety, and security</li>
          </ul>


          <h2 class="text-2xl font-semibold mb-3">5. Data Retention and Deletion</h2>
          <p class="mb-4">
            We retain data only as long as necessary for legal, regulatory, and operational purposes.
          </p>
          <p class="mb-6">
            Users may request deletion of their personal data by contacting support@primepathapp.com.
          </p>


          <h2 class="text-2xl font-semibold mb-3">6. Your Privacy Rights</h2>
          <p class="mb-4 font-semibold">California Privacy Rights:</p>
          <ul class="list-disc pl-6 mb-6 space-y-2">
            <li>Right to access personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to request deletion (subject to exceptions)</li>
          </ul>


          <h2 class="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
          <p class="mb-6">
            This Service is not intended for individuals under 13 (or applicable legal age). We do not knowingly collect data from children.
          </p>


          <h2 class="text-2xl font-semibold mb-3">8. Changes to This Policy</h2>
          <p class="mb-6">
            We may update this Privacy Policy from time to time. Updates will be posted with a revised Effective Date.
          </p>


          <h2 class="text-2xl font-semibold mb-3">9. Contact Us</h2>
          <div class="bg-gray-100 p-4 rounded-md">
            <p><b>Email:</b> support@primepathapp.com</p>
            <p><b>Phone:</b> (805) 603-3161</p>
            <p><b>Entity:</b> VeniX Lab Homecare Services LLC</p>
          </div>
        </div>

      </div>
    </div>
  );
}
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
