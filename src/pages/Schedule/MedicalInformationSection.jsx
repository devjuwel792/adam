"use client";

import { Upload } from "lucide-react";

export function MedicalInformationSection({
  formData,
  onInputChange,
  onMedicalConditionChange,
}) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#C9A14A] text-white rounded-full flex items-center justify-center font-semibold">
          3
        </div>
        <h2 className="text-xl font-semibold text-[#2c2c2c]">
          Medical Information
        </h2>
      </div>

      <div className="space-y-6">
        {/* Medications & Prescription */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="medications"
              className="text-sm font-medium text-[#2c2c2c] mb-2 block"
            >
              Current Medications
            </label>
            <textarea
              id="medications"
              placeholder="List any current medications or supplements"
              value={formData.medications}
              onChange={(e) => onInputChange("medications", e.target.value)}
              className="w-full h-24 text-base resize-none border border-[#E5E7EB] rounded-md p-2 placeholder:text-[#ADAEBC] placeholder:text-base"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#2c2c2c] mb-2 block">
              Prescription
            </label>
            <div className="border border-[#E5E7EB] rounded-md h-24 p-6 text-center flex flex-col items-center justify-center">
              <button className="bg-[#C9A14A] text-white border border-[#C9A14A] rounded-lg px-4 py-1 flex items-center justify-center gap-1">
                <Upload className="h-3 w-3 text-white" />
                Upload
              </button>
              <p className="text-base text-[#ADAEBC] mt-2">PDF, JPG - Max 5MB</p>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label
            htmlFor="allergies"
            className="text-sm font-medium text-[#2c2c2c] mb-2 block"
          >
            Known Allergies
          </label>
          <textarea
            id="allergies"
            placeholder="List any known allergies"
            value={formData.allergies}
            onChange={(e) => onInputChange("allergies", e.target.value)}
            className="w-full h-20 resize-none border border-[#E5E7EB] rounded-md p-2 placeholder:text-[#ADAEBC] placeholder:text-base"
          />
        </div>

        {/* Medical Conditions */}
        <div>
          <label className="text-sm font-medium text-[#2c2c2c] mb-3 block">
            Medical Conditions
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="diabetes"
                checked={formData.medicalConditions.includes("diabetes")}
                onChange={(e) =>
                  onMedicalConditionChange("diabetes", e.target.checked)
                }
                className="h-4 w-4"
              />
              <label htmlFor="diabetes" className="text-sm text-[#2c2c2c]">
                Diabetes
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="high-blood-pressure"
                checked={formData.medicalConditions.includes(
                  "high-blood-pressure"
                )}
                onChange={(e) =>
                  onMedicalConditionChange(
                    "high-blood-pressure",
                    e.target.checked
                  )
                }
                className="h-4 w-4"
              />
              <label
                htmlFor="high-blood-pressure"
                className="text-sm text-[#2c2c2c]"
              >
                High Blood Pressure
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="heart-disease"
                checked={formData.medicalConditions.includes("heart-disease")}
                onChange={(e) =>
                  onMedicalConditionChange("heart-disease", e.target.checked)
                }
                className="h-4 w-4"
              />
              <label htmlFor="heart-disease" className="text-sm text-[#2c2c2c]">
                Heart Disease
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="thyroid-disorder"
                checked={formData.medicalConditions.includes(
                  "thyroid-disorder"
                )}
                onChange={(e) =>
                  onMedicalConditionChange("thyroid-disorder", e.target.checked)
                }
                className="h-4 w-4"
              />
              <label
                htmlFor="thyroid-disorder"
                className="text-sm text-[#2c2c2c]"
              >
                Thyroid Disorder
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
