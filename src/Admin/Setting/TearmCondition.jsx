import { useState, useEffect } from "react";
import PrivacyPolicy from "./Privacy";
import RichTextEditor from "./RichTextEditor";
import { useGetTermsAndConditionsQuery } from "../../store/services/settingApi";


const TermsAndConditions = () => {
  const [currentView, setCurrentView] = useState("terms"); // 'terms' or 'privacy'
  const [isEditing, setIsEditing] = useState(false);
  const { data: termsData, error: termsError, isLoading: termsLoading } = useGetTermsAndConditionsQuery();
  const [content, setContent] = useState({
    termsOfService:
      "By using Phlebotomist services, you agree to provide accurate healthcare services in accordance with professional standards and applicable regulations. This agreement establishes the framework for our partnership.",
    keyPoints: [
      "Professional liability coverage required",
      "Compliance with HIPAA regulations",
      "24-hour cancellation policy",
    ],
    paymentPolicies:
      "Payment terms are Net 15 days from service completion. Direct deposit is our preferred payment method, with payments processed bi-weekly.",
    processingTime: "2-3 business days",
    legalDisclaimers:
      "This agreement is governed by state healthcare regulations. Both parties acknowledge understanding of their rights and responsibilities under this partnership.",
  });

  // Update content when API data is loaded
  useState(() => {
    if (termsData) {
      setContent({
        termsOfService: termsData.termsOfService || content.termsOfService,
        keyPoints: termsData.keyPoints || content.keyPoints,
        paymentPolicies: termsData.paymentPolicies || content.paymentPolicies,
        processingTime: termsData.processingTime || content.processingTime,
        legalDisclaimers: termsData.legalDisclaimers || content.legalDisclaimers,
      });
    }
  }, [termsData]);

  const handleEdit = () => {
    if (isEditing) {
      console.log("Saving changes:", content);
    }
    setIsEditing(!isEditing);
  };

  const handleNext = () => {
    console.log("Proceeding to next step...");
    setCurrentView("privacy");
  };

  const handleBackToTerms = () => {
    setCurrentView("terms");
  };

  const removeKeyPoint = (index) => {
    const newPoints = content.keyPoints.filter((_, i) => i !== index);
    setContent({ ...content, keyPoints: newPoints });
  };

  // Show Privacy Policy if currentView is 'privacy'
  if (currentView === "privacy") {
    return <PrivacyPolicy onBack={handleBackToTerms} />;
  }

  // Show Terms and Conditions (original component)
  return (
    <div className=" rounded-lg shadow-sm ">
      {/* Header */}
      <div className="flex items-center justify-between p-6 ">
        <h1 className="text-2xl underline underline-offset-4  font-semibold text-[#C9A14A]">
          Terms And Condition
        </h1>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium transition-colors"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Document Content */}
      <div className="p-6 space-y-6">
        {/* Terms of Service */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Terms of Service
          </h2>
          {isEditing ? (
            <RichTextEditor
              value={content.termsOfService}
              onChange={(value) =>
                setContent({ ...content, termsOfService: value })
              }
              placeholder="Enter terms of service..."
              className="mb-4"
            />
          ) : (
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.termsOfService }}
            />
          )}

          {/* Key Points */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Key Points:</h3>
              {isEditing && (
                <button
                  onClick={() =>
                    setContent({
                      ...content,
                      keyPoints: [...content.keyPoints, "New key point"],
                    })
                  }
                  className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
                >
                  + Add Point
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-2 mt-1">•</span>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...content.keyPoints];
                          newPoints[index] = e.target.value;
                          setContent({ ...content, keyPoints: newPoints });
                        }}
                        className="flex-1 p-2   rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter key point..."
                      />
                      {content.keyPoints.length > 1 && (
                        <button
                          onClick={() => removeKeyPoint(index)}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remove point"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-700">{point}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Policies */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Payment Policies
          </h2>
          {isEditing ? (
            <RichTextEditor
              value={content.paymentPolicies}
              onChange={(value) =>
                setContent({ ...content, paymentPolicies: value })
              }
              placeholder="Enter payment policies..."
              className="mb-4"
            />
          ) : (
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.paymentPolicies }}
            />
          )}

          {/* Processing Time Info Box */}
          <div className="mt-4 p-3 bg-gray-50  border-l-4 border-gray-400 rounded-r-md">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              <span className="text-gray-800 font-medium">
                Average processing time:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={content.processingTime}
                    onChange={(e) =>
                      setContent({ ...content, processingTime: e.target.value })
                    }
                    className="inline-block px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Processing time"
                  />
                ) : (
                  content.processingTime
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Legal Disclaimers
          </h2>
          {isEditing ? (
            <RichTextEditor
              value={content.legalDisclaimers}
              onChange={(value) =>
                setContent({ ...content, legalDisclaimers: value })
              }
              placeholder="Enter legal disclaimers..."
            />
          ) : (
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.legalDisclaimers }}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end p-6 ">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
