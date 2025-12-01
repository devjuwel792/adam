"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import { useGetPrivacyPolicyQuery } from "../../store/services/settingApi";

const PrivacyPolicy = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: privacyData, error: privacyError, isLoading: privacyLoading } = useGetPrivacyPolicyQuery();
  const [content, setContent] = useState({
    intro: [
      "Welcome to [Your App Name]. Your privacy is important to us.",
      "This Privacy Policy explains how we collect, use, and protect your data when you use our AI voice cloning platform.",
    ],
    informationWeCollect: [
      "Personal Information: Name, email, and account details.",
      "Voice Data: Audio samples uploaded for AI voice cloning.",
      "Usage Data: Interactions with our platform, such as settings, preferences, and feedback.",
      "Payment Information: Processed securely through third-party payment providers.",
    ],
    howWeUseData: [
      "Provide and improve our AI voice cloning services.",
      "Personalize your AI-generated voice experience.",
      "Enhance AI accuracy based on user interactions.",
      "Ensure security and prevent fraudulent activities.",
      "Send updates, promotions, or important notifications (you can opt out anytime).",
    ],
    dataSharingAndSecurity: [
      "We do not sell your personal data to third parties.",
      "Voice data is processed securely and used solely for AI training within your account.",
      "We may share necessary data with service providers (e.g., payment processors) under strict confidentiality agreements.",
      "Data is protected with encryption and security measures to prevent unauthorized access.",
    ],
    userControlAndChoices: [
      "You can update or delete your account information from the My Profile section.",
      "You can request data deletion by contacting [Your Support Email].",
      "You can manage communication preferences (e.g., email notifications).",
    ],
    dataRetention: [
      "We retain user data only as long as necessary to provide our services.",
      "Upon account deletion, personal data is permanently removed, except as required by law.",
    ],
    childrensPrivacy: [
      "Our platform is not intended for users under the age of [age].",
      "We do not knowingly collect data from minors.",
    ],
    changesToPolicy:
      "We may update this Privacy Policy from time to time. Continued use of the platform after updates means you accept the changes.",
    contactUs:
      "For any questions or privacy concerns, contact us at [Your Support Email].",
  });

  // Update content when API data is loaded
  useEffect(() => {
    if (privacyData) {
      setContent({
        intro: privacyData.intro || content.intro,
        informationWeCollect: privacyData.informationWeCollect || content.informationWeCollect,
        howWeUseData: privacyData.howWeUseData || content.howWeUseData,
        dataSharingAndSecurity: privacyData.dataSharingAndSecurity || content.dataSharingAndSecurity,
        userControlAndChoices: privacyData.userControlAndChoices || content.userControlAndChoices,
        dataRetention: privacyData.dataRetention || content.dataRetention,
        childrensPrivacy: privacyData.childrensPrivacy || content.childrensPrivacy,
        changesToPolicy: privacyData.changesToPolicy || content.changesToPolicy,
        contactUs: privacyData.contactUs || content.contactUs,
      });
    }
  }, [privacyData]);

  const handleEdit = () => {
    if (isEditing) {
      console.log("Saving changes:", content);
    }
    setIsEditing(!isEditing);
  };

  const removePoint = (section, index) => {
    const updated = [...content[section]];
    updated.splice(index, 1);
    setContent({ ...content, [section]: updated });
  };

  const addPoint = (section) => {
    setContent({
      ...content,
      [section]: [...content[section], "New point"],
    });
  };

  // Reusable bullet list renderer
  const renderBulletSection = (title, sectionKey, addLabel) => (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{addLabel}</h3>
          {isEditing && (
            <button
              onClick={() => addPoint(sectionKey)}
              className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
            >
              + Add Point
            </button>
          )}
        </div>
        <ul className="space-y-2">
          {content[sectionKey].map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-2 mt-1">•</span>
              {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => {
                      const updated = [...content[sectionKey]];
                      updated[index] = e.target.value;
                      setContent({ ...content, [sectionKey]: updated });
                    }}
                    className="flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter point..."
                  />
                  {content[sectionKey].length > 1 && (
                    <button
                      onClick={() => removePoint(sectionKey, index)}
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
  );

  return (
    <div className="rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl underline underline-offset-4 font-semibold text-[#C9A14A]">
          Privacy Policy
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
        {/* Intro Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Introduction</h2>
          <div className="mt-3 space-y-2">
            {content.intro.map((line, index) =>
              isEditing ? (
                <input
                  key={index}
                  type="text"
                  value={line}
                  onChange={(e) => {
                    const updated = [...content.intro];
                    updated[index] = e.target.value;
                    setContent({ ...content, intro: updated });
                  }}
                  className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              ) : (
                <p key={index} className="text-gray-700 font-medium">
                  {line}
                </p>
              )
            )}
          </div>
        </div>

        {/* Sections 1-6 */}
        {renderBulletSection(
          "1. Information We Collect",
          "informationWeCollect",
          "We collect the following types of data:"
        )}
        {renderBulletSection(
          "2. How We Use Your Data",
          "howWeUseData",
          "We use your data to:"
        )}
        {renderBulletSection(
          "3. Data Sharing & Security",
          "dataSharingAndSecurity",
          "Security & Sharing:"
        )}
        {renderBulletSection(
          "4. User Control & Choices",
          "userControlAndChoices",
          "You can:"
        )}
        {renderBulletSection(
          "5. Data Retention",
          "dataRetention",
          "Retention Rules:"
        )}
        {renderBulletSection(
          "6. Children's Privacy",
          "childrensPrivacy",
          "Children's Privacy:"
        )}

        {/* Section 7 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            7. Changes to This Policy
          </h2>
          {isEditing ? (
            <RichTextEditor
              value={content.changesToPolicy}
              onChange={(value) =>
                setContent({ ...content, changesToPolicy: value })
              }
              placeholder="Enter policy changes information..."
            />
          ) : (
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.changesToPolicy }}
            />
          )}
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            8. Contact Us
          </h2>
          {isEditing ? (
            <RichTextEditor
              value={content.contactUs}
              onChange={(value) => setContent({ ...content, contactUs: value })}
              placeholder="Enter contact information..."
            />
          ) : (
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.contactUs }}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end p-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
