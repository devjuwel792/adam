import info from "../../assets/images/info2.png"
import pricing from "../../assets/images/pricing.png"
import important from "../../assets/images/important.png"
import clock from "../../assets/images/grayClock.png"
import dr from "../../assets/images/grayDr.png"
import tube from "../../assets/images/grayTube.png"
import tic from "../../assets/images/greenTic.png"
import alert from "../../assets/images/alert.png"

export function SidebarInfo({ services = [], selectedPackageId }) {
  const selected = services.find((s) => String(s.id) === String(selectedPackageId));
  return (
    <div className="space-y-6">
      {/* What to Expect */}
      <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <img src={info} alt="" />
          <h3 className="font-semibold text-lg text-[#2C2C2C]">What to Expect</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={clock} alt="" />
            <div>
              <h4 className="font-medium text-[#2C2C2C] text-sm">
                Quick Process
              </h4>
              <p className="text-xs text-[#5B5B5B]">
                Blood draw takes 5-10 minutes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img src={dr} alt="" />
            <div>
              <h4 className="font-medium text-[#2C2C2C] text-sm">
                Certified Phlebotomists
              </h4>
              <p className="text-xs text-[#5B5B5B]">
                Experienced and licensed professionals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img src={tube} alt="" />
            <div>
              <h4 className="font-medium text-[#2C2C2C] text-sm">
                Fast Results
              </h4>
              <p className="text-xs text-[#5B5B5B]">
                Results ready in 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Payment */}
      <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <img src={pricing} alt="" />
          <h3 className="font-semibold text-lg text-[#2C2C2C]">Pricing & Payment</h3>
        </div>
        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s.id}
              className={`flex justify-between items-center rounded-md px-2 py-1 transition-colors ${
                String(s.id) === String(selectedPackageId) ? "bg-[#FEF3C7]" : ""
              }`}
            >
              <span className="text-sm text-[#5B5B5B]">{s.name}</span>
              <span className="font-medium text-sm text-[#2C2C2C]">${s.price}</span>
            </div>
          ))}
          {selected && (
            <div className="pt-3 border-t border-[#C9A14A] mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#2C2C2C]">Selected Total</span>
                <span className="text-base font-bold text-[#C9A14A]">${selected.price}</span>
              </div>
            </div>
          )}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-[#5B5B5B]">
              • Payment due at time of service
              <br />• Insurance accepted (check coverage)
              <br />• HSA/FSA eligible
            </p>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-[#EFF6FF] border border-[#E5E7EB] shadow-sm rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <img src={important} alt="" />
          <h3 className="font-semibold text-lg text-[#2C2C2C]">Important Information</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={tic} alt="" />
            <span className="text-sm text-[#5B5B5B]">
              HIPAA compliant and secure
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={tic} alt="" />
            <span className="text-sm text-[#5B5B5B]">
              CLIA certified laboratory
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={tic} alt="" />
            <span className="text-sm text-[#5B5B5B]">
              No appointment required for walk-ins
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={tic} alt="" />
            <span className="text-sm text-[#5B5B5B]">
              Fasting may be required for some tests
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#FEFCE8] border border-[#FEF08A] rounded-lg">
          <div className="flex items-center gap-2">
            <img src={alert} alt="" />
            <p className="text-xs text-[#854D0E]">
              Please arrive 15 minutes early for your appointment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
