"use client";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ServiceDetailsSection({ formData, onInputChange, services, isLoading }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#C9A14A] text-white rounded-full flex items-center justify-center font-semibold">
          2
        </div>
        <h2 className="text-xl font-semibold text-[#2c2c2c]">Service Details</h2>
      </div>

      <div className="space-y-6">
        {/* Service Package */}
        <div>
          <label htmlFor="servicePackage" className="text-sm font-medium text-gray-700 mb-2 block">
            Service Package
          </label>
          <select
            id="servicePackage"
            value={formData.servicePackage}
            onChange={(e) => onInputChange("servicePackage", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={isLoading}
          >
            <option value="">
              {isLoading ? "Loading packages..." : "Select service package"}
            </option>
            {services?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — ${service.price}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appointment Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Appointment Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.appointmentDate ? new Date(formData.appointmentDate) : null}
                onChange={(date) => onInputChange("appointmentDate", date?.toISOString() || "")}
                placeholderText="Select date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Location Type */}
          <div>
            <label htmlFor="locationType" className="text-sm font-medium text-gray-700 mb-2 block">
              Location Type
            </label>
            <select
              id="locationType"
              value={formData.locationType}
              onChange={(e) => onInputChange("locationType", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="clinic">Clinic</option>
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="text-sm font-medium text-gray-700 mb-2 block">
              Start Time
            </label>
            <input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => onInputChange("startTime", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="text-sm font-medium text-gray-700 mb-2 block">
              End Time
            </label>
            <input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => onInputChange("endTime", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-2 block">
              Address
            </label>
            <input
              id="location"
              type="text"
              placeholder="Your street address"
              value={formData.location}
              onChange={(e) => onInputChange("location", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 placeholder:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
