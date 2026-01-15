import info from "../../assets/images/info2.png"
import pricing from "../../assets/images/pricing.png"
import important from "../../assets/images/important.png"
import clock from "../../assets/images/grayClock.png"
import dr from "../../assets/images/grayDr.png"
import tube from "../../assets/images/grayTube.png"
import tic from "../../assets/images/greenTic.png"
import alert from "../../assets/images/alert.png"

export function SidebarInfo() {
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
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5B5B5B]">Basic Panel</span>
            <span className="font-medium text-sm text-[#2C2C2C]">$89</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5B5B5B]">Comprehensive Panel</span>
            <span className="font-medium text-sm text-[#2C2C2C]">$149</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5B5B5B]">Executive Panel</span>
            <span className="font-medium text-sm text-[#2C2C2C]">$249</span>
          </div>
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
