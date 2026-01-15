"use client";

import { useState } from "react";

export default function PartnershipApplication() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    emailAddress: "",
    phoneNumber: "",
    serviceModel: "",
    patientVolume: "",
    additionalInfo: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gray-50 py-16 md:py-20 lg:py-24">
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
          Partnership Application
        </h2>
        <p className="text-lg sm:text-xl text-[#4B5563] max-w-2xl mx-auto">
          Take the first step towards expanding your healthcare services
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto">
        {/* Organization + Contact Person */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="organizationName"
              className="text-sm font-medium text-gray-700"
            >
              Organization Name*
            </label>
            <input
              id="organizationName"
              placeholder="Enter organization name"
              value={formData.organizationName}
              onChange={(e) =>
                setFormData({ ...formData, organizationName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contactPerson"
              className="text-sm font-medium text-gray-700"
            >
              Contact Person*
            </label>
            <input
              id="contactPerson"
              placeholder="Enter contact person name"
              value={formData.contactPerson}
              onChange={(e) =>
                setFormData({ ...formData, contactPerson: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="emailAddress"
              className="text-sm font-medium text-gray-700"
            >
              Email Address*
            </label>
            <input
              id="emailAddress"
              type="email"
              placeholder="Enter email address"
              value={formData.emailAddress}
              onChange={(e) =>
                setFormData({ ...formData, emailAddress: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number*
            </label>
            <input
              id="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Service Model */}
        <div className="space-y-2">
          <label
            htmlFor="serviceModel"
            className="text-sm font-medium text-gray-700"
          >
            Service Model Interest*
          </label>
          <select
            id="serviceModel"
            value={formData.serviceModel}
            onChange={(e) =>
              setFormData({ ...formData, serviceModel: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-white"
          >
            <option value="">Select preferred service model</option>
            <option value="telehealth">Telehealth Services</option>
            <option value="in-person">In-Person Care</option>
            <option value="hybrid">Hybrid Model</option>
            <option value="specialty">Specialty Care</option>
          </select>
        </div>

        {/* Patient Volume */}
        <div className="space-y-2">
          <label
            htmlFor="patientVolume"
            className="text-sm font-medium text-gray-700"
          >
            Current Patient Volume (monthly)*
          </label>
          <select
            id="patientVolume"
            value={formData.patientVolume}
            onChange={(e) =>
              setFormData({ ...formData, patientVolume: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-white"
          >
            <option value="">Select patient volume range</option>
            <option value="0-50">0-50 patients</option>
            <option value="51-100">51-100 patients</option>
            <option value="101-250">101-250 patients</option>
            <option value="251-500">251-500 patients</option>
            <option value="500+">500+ patients</option>
          </select>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <label
            htmlFor="additionalInfo"
            className="text-sm font-medium text-gray-700"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            placeholder="Tell us more about your organization and partnership goals..."
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
            className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="terms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeToTerms: e.target.checked })
            }
            className="h-4 w-4 text-[#C9A14A] border-gray-300 rounded focus:ring-yellow-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <span className="text-[#C9A14A] hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#C9A14A] hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#C9A14A] hover:bg-amber-600 text-white font-semibold text-lg py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!formData.agreeToTerms}
        >
          Submit Partnership Application
        </button>
      </form>
    </div>
  );
}
