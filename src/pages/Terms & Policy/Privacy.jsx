import hero from "../../assets/images/terms-hero.png";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={hero}
          alt="Medical equipment and healthcare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide text-center">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg my-10">

          <h1 className="text-3xl font-bold mb-2">Privacy Policy for PrimePath</h1>
          <p className="text-sm text-gray-500 mb-6">Effective Date: June 10, 2026</p>

          <p className="mb-6">
            PrimePath ("we," "us," or "our"), powered by VeniX Lab Homecare Services LLC, respects and
            protects the privacy of its users. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use the Service.
          </p>

          <p className="mb-8">
            By accessing or using the Service, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><b>Identifiers &amp; Contact Details:</b> Name, address, email address, and telephone number.</li>
            <li><b>Professional &amp; Employment Information:</b> Healthcare license information, certifications, qualifications, background checks, tax info.</li>
            <li><b>Financial Information:</b> Banking and payment details.</li>
            <li><b>Device &amp; Usage Data:</b> Device model, OS, and usage statistics.</li>
            <li><b>Location Data:</b> Precise or approximate location for assignment matching and security.</li>
            <li><b>User Content:</b> Uploaded documents, forms, and credentials.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Account creation and credential verification</li>
            <li>Assignment matching and workforce management</li>
            <li>Payment processing via third-party vendors</li>
            <li>Security, fraud prevention, and compliance</li>
            <li>Customer support and communication</li>
            <li>Service improvement and analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3">3. HIPAA and Healthcare Data Notice</h2>
          <p className="mb-4">
            The Service may involve handling of Protected Health Information (PHI) under HIPAA-compliant workflows.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><b>Minimum Necessary Standard:</b> Only required data should be accessed.</li>
            <li><b>Security Safeguards:</b> Administrative, technical, and physical protections are applied.</li>
            <li><b>User Responsibility:</b> Users must report any suspected breach immediately.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3">4. Data Sharing</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Trusted service providers (payments, hosting, background checks)</li>
            <li>Legal and regulatory compliance requirements</li>
            <li>Protection of rights, safety, and security</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3">5. Data Retention and Deletion</h2>
          <p className="mb-4">
            We retain data only as long as necessary for legal, regulatory, and operational purposes.
          </p>
          <p className="mb-6">
            Users may request deletion of their personal data by contacting support@primepathapp.com.
          </p>

          <h2 className="text-2xl font-semibold mb-3">6. Your Privacy Rights</h2>
          <p className="mb-4 font-semibold">California Privacy Rights:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Right to access personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to request deletion (subject to exceptions)</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
          <p className="mb-6">
            This Service is not intended for individuals under 13 (or applicable legal age). We do not
            knowingly collect data from children.
          </p>

          <h2 className="text-2xl font-semibold mb-3">8. Changes to This Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. Updates will be posted with a revised
            Effective Date.
          </p>

          <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><b>Email:</b> support@primepathapp.com</p>
            <p><b>Phone:</b> (805) 603-3161</p>
            <p><b>Entity:</b> VeniX Lab Homecare Services LLC</p>
          </div>

        </div>
      </div>
    </div>
  );
}
