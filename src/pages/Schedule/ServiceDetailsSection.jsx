"use client";
import { Calendar, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ServiceDetailsSection({ formData, onInputChange, services, isLoading }) {
  // Create a unique list of hospitals for the dropdown
  const hospitals = services
    ? [...new Set(services.map((s) => s.hospital_name))]
    : [];

  const handlePackageChange = (e) => {
    const selectedServiceId = e.target.value;
    onInputChange("testPackage", selectedServiceId);

    // Find the selected service to get its hospital name
    const selectedService = services?.find((s) => s.id === selectedServiceId);

    if (selectedService) {
      onInputChange("hospital", selectedService.hospital_name);
    } else {
      // Reset hospital if "Select test package" is chosen
      onInputChange("hospital", "");
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#C9A14A] text-white rounded-full flex items-center justify-center font-semibold">
          2
        </div>
        <h2 className="text-xl font-semibold text-[#2c2c2c]">
          Service Details
        </h2>
      </div>

      <div className="space-y-6">
        {/* Test Package */}
        <div>
          <label
            htmlFor="testPackage"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Test Package
          </label>
          <select
            id="testPackage"
            value={formData.testPackage}
            onChange={handlePackageChange}
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={isLoading}
          >
            <option value="">
              {isLoading ? "Loading packages..." : "Select test package"}
            </option>
            {services?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Schedule
            </label>
            <div className="space-y-3">
              {/* Schedule 1 */}
              <div className="flex items-center justify-between p-3 bg-[#F1F1F1] border border-[#E5E7EB] rounded-lg">
                <DatePicker
                  selected={
                    formData.scheduleDate
                      ? new Date(formData.scheduleDate)
                      : null
                  }
                  onChange={(date) =>
                    onInputChange("scheduleDate", date?.toISOString() || "")
                  }
                  customInput={
                    <div className="flex items-center gap-3 text-[#5B5B5B] font-semibold cursor-pointer">
                      <Calendar className="h-4 w-4" />
                      <span className="text-base">
                        {formData.scheduleDate
                          ? new Date(formData.scheduleDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              }
                            )
                          : "Select Date"}
                      </span>
                    </div>
                  }
                />

                <div className="flex items-center gap-2">
                  <div className="text-[#5B5B5B] font-semibold text-xs bg-white px-3 py-1 rounded-lg flex gap-1 items-center justify-center">
                    <span className="text-sm">09:00 AM</span>
                    <Clock className="h-4 w-4 text-[#5B5B5B]" />
                  </div>
                  <span className="text-sm text-[#5B5B5B]">to</span>
                  <div className="text-[#5B5B5B] font-semibold text-xs bg-white px-3 py-1 rounded-lg flex gap-1 items-center justify-center">
                    <span className="text-sm">06:00 PM</span>
                    <Clock className="h-4 w-4 text-[#5B5B5B]" />
                  </div>
                </div>
              </div>

              {/* Schedule 2 */}
              <div className="flex items-center justify-between p-3 bg-[#F1F1F1] border border-[#E5E7EB] rounded-lg">
                <DatePicker
                  selected={
                    formData.scheduleDate2
                      ? new Date(formData.scheduleDate2)
                      : null
                  }
                  onChange={(date) =>
                    onInputChange("scheduleDate2", date?.toISOString() || "")
                  }
                  customInput={
                    <div className="flex items-center gap-3 text-[#5B5B5B] font-semibold cursor-pointer">
                      <Calendar className="h-4 w-4" />
                      <span className="text-base">
                        {formData.scheduleDate2
                          ? new Date(formData.scheduleDate2).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              }
                            )
                          : "Select Date"}
                      </span>
                    </div>
                  }
                />

                <div className="flex items-center gap-2">
                  <div className="text-[#5B5B5B] font-semibold text-xs bg-white px-3 py-1 rounded-lg flex gap-1 items-center justify-center">
                    <span className="text-sm">09:00 AM</span>
                    <Clock className="h-4 w-4 text-[#5B5B5B]" />
                  </div>
                  <span className="text-sm text-[#5B5B5B]">to</span>
                  <div className="text-[#5B5B5B] font-semibold text-xs bg-white px-3 py-1 rounded-lg flex gap-1 items-center justify-center">
                    <span className="text-sm">06:00 PM</span>
                    <Clock className="h-4 w-4 text-[#5B5B5B]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital & Location */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="hospital"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Hospital
              </label>
              <input
                id="hospital"
                type="text"
                placeholder={isLoading ? "Loading..." : "Hospital will be selected after choosing test package"}
                value={formData.hospital}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed placeholder:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Locations
              </label>
              <input
                id="location"
                placeholder="Your Street address"
                value={formData.location}
                onChange={(e) => onInputChange("location", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 placeholder:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
