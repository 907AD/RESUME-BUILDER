import { GraduationCap, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";

const EducationForm = ({ data = [], onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  const handleAiEnhance = async (index, education) => {
    try {
      setLoadingIndex(index);

      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: {
            professional_summary: '',
            personal_info: {
              full_name: '',
              profession: '',
              location: '',
            },
            education: [education],
            experience: [],
            skills: [],
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'AI generation failed');
      }

      const generatedText = result.summary || '';

      updateEducation(index, 'degree', education.degree || '');
      updateEducation(index, 'field', education.field || '');
      updateEducation(index, 'institution', generatedText || education.institution || '');
    } catch (error) {
      alert(error.message || 'Unable to generate education details');
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>

          <p className="text-sm text-gray-500">
            Add your Education details
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-300 transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* Education List */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No Education added yet.</p>

          <p className="text-sm">
            Click "Add Education" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm"
            >
              {/* Education Header */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAiEnhance(index, education)}
                  disabled={loadingIndex === index}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  {loadingIndex === index ? 'Generating...' : 'Enhance with AI'}
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Institution */}
                <input
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder="Institute Name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Degree */}
                <input
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Field */}
                <input
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  type="text"
                  placeholder="Field of Study"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* Graduation Date */}
                <input
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                  type="month"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* GPA */}
              <input
                value={education.gpa || ""}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                type="text"
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 w-full"
                placeholder="GPA (optional)"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
