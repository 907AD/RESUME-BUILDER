import { Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    const skill = newSkill.trim();

    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleAiEnhanceSkills = async () => {
    try {
      setLoading(true);

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
            experience: [],
            skills: data,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'AI skill generation failed');
      }

      const generatedSkills = Array.isArray(result.summary)
        ? result.summary
        : String(result.summary || '')
          .split(/[\n,]/)
          .map((item) => item.trim())
          .filter(Boolean);

      if (generatedSkills.length > 0) {
        onChange(generatedSkills);
      }
    } catch (error) {
      alert(error.message || 'Unable to generate skills');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Skills
          </h3>

          <p className="text-sm text-gray-500">
            Add your technical and soft skills
          </p>
        </div>

        <button
          type="button"
          onClick={handleAiEnhanceSkills}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="size-4" />
          {loading ? 'Generating...' : 'AI Skills'}
        </button>
      </div>

      {/* Add Skill */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g. JavaScript, Project Management)"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          type="button"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />

          <p>No skills added yet</p>

          <p className="text-sm">
            Add your technical and soft skills above
          </p>

          <div className="bg-blue-50 p-3 rounded-lg mt-3">
            <p className="text-sm text-blue-800">
              Add 8-12 relevant skills. Include both technical
              skills (programming languages, tools) and soft
              skills (leadership and communication).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
