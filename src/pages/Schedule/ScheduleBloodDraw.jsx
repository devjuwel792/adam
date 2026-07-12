"use client";

import { useState } from "react";
import { useCreateAppointmentMutation, useGetServicePackagesQuery } from "../../store/services/appointmentApi";
import { AdditionalOptionsSection } from "./AdditionalOptionsSection";
import { MedicalInformationSection } from "./MedicalInformationSection";
import { PersonalInformationSection } from "./PersonalInformationSection";
import { ServiceDetailsSection } from "./ServiceDetailsSection";
import { SidebarInfo } from "./SidebarInfo";

export default function BloodDrawBooking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    servicePackage: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
    locationType: "home",
    location: "",
    medications: "",
    allergies: "",
    medicalConditions: [],
    specialRequests: "",
    emailNotifications: false,
    smsReminders: false,
    termsAccepted: false,
    consentAccepted: false,
  });

  const [createAppointment, { isLoading: isSubmitting }] = useCreateAppointmentMutation();
  const { data: services, isLoading: areServicesLoading } = useGetServicePackagesQuery();

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
    if (!formData.termsAccepted || !formData.consentAccepted) {
      alert("Please accept the terms and consent to continue.");
      return;
    }

    const apiBody = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
      dob: formatDate(formData.dateOfBirth),
      gender: formData.gender,
      service_package: formData.servicePackage ? Number(formData.servicePackage) : null,
      appointment_date: formatDate(formData.appointmentDate),
      start_time: formData.startTime,
      end_time: formData.endTime,
      location_type: formData.locationType,
      location: formData.location,
      current_medications: formData.medications,
      known_allergies: formData.allergies,
      medical_conditions: formData.medicalConditions.join(", "),
      special_requests: formData.specialRequests,
      email_result_notification: formData.emailNotifications,
      sms_appointment_reminders: formData.smsReminders,
    };

    try {
      const response = await createAppointment(apiBody).unwrap();
      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      }
    } catch (error) {
      console.error("Failed to create appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8 md:p-16 lg:p-20 xl:p-28">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2c2c2c] mb-2">
            Schedule Your Blood Draw
          </h1>
          <p className="text-[#4B5563] text-sm sm:text-base">
            Complete all sections below to book your appointment
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-[#5B5B5B] leading-relaxed">
                  I acknowledge that I have read and agree to the{" "}
                  <span className="text-[#C9A14A] underline cursor-pointer">Terms of Service</span>{" "}
                  and{" "}
                  <span className="text-[#C9A14A] underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consentAccepted}
                  onChange={(e) => handleInputChange("consentAccepted", e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-[#5B5B5B] leading-relaxed">
                  I consent to receive appointment confirmations and results via my provided contact information
                </label>
              </div>
            </div>

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

          <SidebarInfo />
        </div>
      </div>
    </div>
  );
}
