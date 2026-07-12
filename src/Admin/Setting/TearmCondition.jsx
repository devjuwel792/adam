import { useState, useEffect } from "react";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../store/services/dashboardApi";

const TermsAndConditions = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  const { data, error, isLoading } = useGetTermsAndConditionsQuery();
  const [updateTerms, { isLoading: isSaving }] = useUpdateTermsAndConditionsMutation();

  useEffect(() => {
    if (data) {
      setForm({ title: data.title ?? "", description: data.description ?? "" });
    }
  }, [data]);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await updateTerms({ title: form.title, description: form.description }).unwrap();
      } catch (err) {
        console.error("Failed to save:", err);
      }
    }
    setIsEditing((prev) => !prev);
  };

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load terms.</div>;

  return (
    <div className="rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl underline underline-offset-4 font-semibold text-[#C9A14A]">
          Terms And Conditions
        </h1>
        <button
          onClick={handleEdit}
          disabled={isSaving}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium transition-colors disabled:opacity-60"
        >
          {isSaving ? "Saving..." : isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-2">Title</h2>
          {isEditing ? (
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ) : (
            <p className="text-lg font-semibold text-gray-900">{form.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-2">Description</h2>
          {isEditing ? (
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={16}
              className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-y"
            />
          ) : (
            <pre className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {form.description}
            </pre>
          )}
        </div>
      </div>


    </div>
  );
};

export default TermsAndConditions;
