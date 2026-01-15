import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function PersonalInformationSection({ formData, onInputChange }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#C9A14A] text-white rounded-full flex items-center justify-center font-semibold text-sm">
          1
        </div>
        <h2 className="text-xl font-semibold text-[#2c2c2c]">
          Personal Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dob"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Date of Birth
          </label>
          <div className="relative">
            <DatePicker
              id="dob"
              selected={
                formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
              }
              onChange={(date) =>
                onInputChange("dateOfBirth", date?.toISOString() || "")
              }
              placeholderText="mm/dd/yyyy"
              className="border rounded-md p-2 w-full"
            />
            <Calendar className="absolute right-48 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Gender
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) => onInputChange("gender", e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );
}
