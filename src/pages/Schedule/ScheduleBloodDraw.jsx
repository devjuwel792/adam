"use client";

import { useState } from "react";
import {
  useCreateServiceRequestMutation,
  useGetServicesQuery,
} from "@/store/services/user/userApi";
import { PersonalInformationSection } from "./PersonalInformationSection";
import { ServiceDetailsSection } from "./ServiceDetailsSection";
import { MedicalInformationSection } from "./MedicalInformationSection";
import { AdditionalOptionsSection } from "./AdditionalOptionsSection";
import { SidebarInfo } from "./SidebarInfo";
import { SecurePaymentModal } from "./SecurePaymentModal";

export default function BloodDrawBooking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    testPackage: "",
    scheduleDate: null,
    scheduleDate2: null,
    hospital: "",
    location: "",
    medications: "",
    prescription: "", // Assuming you'll add a way to upload this
    allergies: "",
    medicalConditions: [],
    specialRequests: "",
    emailNotifications: false,
    termsAccepted: false,
    consentAccepted: false,
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const [createServiceRequest, { isLoading: isSubmitting }] =
    useCreateServiceRequestMutation();

  const { data: services, isLoading: areServicesLoading } =
    useGetServicesQuery();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicalConditionChange = (condition, checked) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: checked
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter((c) => c !== condition),
    }));
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmitBooking = async () => {
    // Basic validation
    if (!formData.termsAccepted || !formData.consentAccepted) {
      alert("Please accept the terms and consent to continue.");
      return;
    }

    const apiBody = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      date_of_birth: formatDate(formData.dateOfBirth),
      gender: formData.gender,
      test_package: formData.testPackage,
      start_date: formatDate(formData.scheduleDate),
      start_date_start_time: "09:00", // Hardcoded as per UI
      start_date_end_time: "18:00", // Hardcoded as per UI (6:00 PM)
      end_date: formatDate(formData.scheduleDate2),
      end_date_start_time: "09:00", // Hardcoded as per UI
      end_date_end_time: "18:00", // Hardcoded as per UI (6:00 PM)
      location: formData.location,
      current_medication: formData.medications,
      prescription: formData.prescription || "cloudinary_file_url", // Placeholder
      known_allergies: formData.allergies,
      medical_conditions: formData.medicalConditions,
      special_request: formData.specialRequests,
      email_notification_enable: formData.emailNotifications,
      terms_and_condition_agreement: formData.termsAccepted,
      agreement: formData.consentAccepted,
    };

    try {
      const response = await createServiceRequest(apiBody).unwrap();
      setAppointmentId(response.appointment_id);
      setAppointmentDetails(response);
      setIsPaymentModalOpen(true);
    } catch (error) {
      console.error("Failed to create appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8 md:p-16 lg:p-20 xl:p-28">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2c2c2c] mb-2">
            Schedule Your Blood Draw
          </h1>
          <p className="text-[#4B5563] text-sm sm:text-base">
            Complete all sections below to book your appointment
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sections (kept as they are) */}
            <PersonalInformationSection
              formData={formData}
              onInputChange={handleInputChange}
            />

            <ServiceDetailsSection
              formData={formData}
              onInputChange={handleInputChange}
              services={services}
              isLoading={areServicesLoading}
            />

            <MedicalInformationSection
              formData={formData}
              onInputChange={handleInputChange}
              onMedicalConditionChange={handleMedicalConditionChange}
            />

            <AdditionalOptionsSection
              formData={formData}
              onInputChange={handleInputChange}
            />

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    handleInputChange("termsAccepted", e.target.checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-[#5B5B5B] leading-relaxed"
                >
                  I acknowledge that I have read and agree to the{" "}
                  <span className="text-[#C9A14A] underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#C9A14A] underline cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consentAccepted}
                  onChange={(e) =>
                    handleInputChange("consentAccepted", e.target.checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-[#5B5B5B] leading-relaxed"
                >
                  I consent to receive appointment confirmations and results via
                  my provided contact information
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <button
                onClick={handleSubmitBooking}
                className="w-full bg-[#C9A14A] hover:bg-[#C9A14A]/80 text-white py-3 font-semibold text-base rounded-md disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </button>
              <p className="text-center text-sm text-[#5B5B5B]">
                You will receive a confirmation email within 2 hours
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <SidebarInfo />
        </div>
      </div>

      {isPaymentModalOpen && (
        <SecurePaymentModal
          isOpen={isPaymentModalOpen}
          appointmentId={appointmentId}
          appointmentDetails={appointmentDetails}
          selectedServiceTitle={
            services?.find((s) => s.id === formData.testPackage)?.title || ""
          }
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  );
}
