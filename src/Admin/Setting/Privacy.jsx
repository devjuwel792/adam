"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../store/services/settingApi";

const PrivacyPolicy = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    data,
    error: privacyError,
    isLoading: privacyLoading,
  } = useGetPrivacyPolicyQuery();

  const privacyData = data ? JSON.parse(data.content) : null;
  const [
    updatePrivacyPolicy,
    { isLoading: updateLoading, error: updateError },
  ] = useUpdatePrivacyPolicyMutation();
  const [content, setContent] = useState({
    intro: [],
    informationWeCollect: [],
    howWeUseData: [],
    dataSharingAndSecurity: [],
    userControlAndChoices: [],
    dataRetention: [],
    childrensPrivacy: [],
    changesToPolicy: "",
    contactUs: "",
  });

  // Update content when API data is loaded
  useEffect(() => {
    if (privacyData) {
      setContent({
        intro: privacyData.intro || content.intro,
        informationWeCollect:
          privacyData.informationWeCollect || content.informationWeCollect,
        howWeUseData: privacyData.howWeUseData || content.howWeUseData,
        dataSharingAndSecurity:
          privacyData.dataSharingAndSecurity || content.dataSharingAndSecurity,
        userControlAndChoices:
          privacyData.userControlAndChoices || content.userControlAndChoices,
        dataRetention: privacyData.dataRetention || content.dataRetention,
        childrensPrivacy:
          privacyData.childrensPrivacy || content.childrensPrivacy,
        changesToPolicy: privacyData.changesToPolicy || content.changesToPolicy,
        contactUs: privacyData.contactUs || content.contactUs,
      });
    }
  }, [privacyData]);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await updatePrivacyPolicy({
          content: JSON.stringify(content),
        }).unwrap();
        console.log("Changes saved successfully");
      } catch (err) {
        console.error("Failed to save changes:", err);
      }
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
