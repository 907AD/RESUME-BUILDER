// import { Plus, Trash2 } from "lucide-react";
// import React from "react";

// const ProjectForm = ({ data, onChange }) => {
//   const addProject = () => {
//     const newProject = {
//       name: "",
//       type: "",
//       description: "",
//     };

//     onChange([...data, newProject]);
//   };

//   const removeProject = (index) => {
//     const updated = data.filter((_, i) => i !== index);
//     onChange(updated);
//   };

//   const updateProject = (index, field, value) => {
//     const updated = [...data];

//     updated[index] = {
//       ...updated[index],
//       [field]: value,
//     };

//     onChange(updated);
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//             Projects
//           </h3>

//           <p className="text-sm text-gray-500">
//             Add your Projects
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={addProject}
//           className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-300 transition-colors cursor-pointer"
//         >
//           <Plus className="size-4" />
//           Add Project
//         </button>
//       </div>

//       {/* Projects */}
//       <div className="space-y-4 mt-6">
//         {data.map((project, index) => (
//           <div
//             key={index}
//             className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm"
//           >
//             {/* Project Header */}
//             <div className="flex justify-between items-start">
//               <h4 className="font-medium text-gray-800">
//                 Project #{index + 1}
//               </h4>

//               <button
//                 type="button"
//                 onClick={() => removeProject(index)}
//                 className="text-red-500 hover:text-red-700 cursor-pointer"
//               >
//                 <Trash2 className="size-4" />
//               </button>
//             </div>

//             {/* Inputs */}
//             <div className="grid gap-3">
//               {/* Project Name */}
//               <input
//                 value={project.name || ""}
//                 onChange={(e) =>
//                   updateProject(index, "name", e.target.value)
//                 }
//                 type="text"
//                 placeholder="Project Name"
//                 className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
//               />

//               {/* Project Type */}
//               <input
//                 value={project.type || ""}
//                 onChange={(e) =>
//                   updateProject(index, "type", e.target.value)
//                 }
//                 type="text"
//                 placeholder="Project Type"
//                 className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
//               />

//               {/* Description */}
//               <textarea
//                 rows={4}
//                 value={project.description || ""}
//                 onChange={(e) =>
//                   updateProject(
//                     index,
//                     "description",
//                     e.target.value
//                   )
//                 }
//                 placeholder="Describe your Project..."
//                 className="px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none md:col-span-2 outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;


import { Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ProjectForm = ({ data = [], onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  const handleAiEnhance = async (index, project) => {
    try {
      setLoadingIndex(index);

      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: {
            professional_summary: project.description || '',
            personal_info: {
              full_name: '',
              profession: '',
              location: '',
            },
            project: [project],
            skills: [],
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'AI generation failed');
      }

      updateProject(index, 'description', result.summary || '');
    } catch (error) {
      alert(error.message || 'Unable to generate project description');
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">
            Add your Projects
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-300 transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Project Boxes */}
      <div className="space-y-4">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4"
          >
            {/* Project Header */}
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                Project #{index + 1}
              </h4>

              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Project Name */}
            <input
              type="text"
              value={project.name || ""}
              onChange={(e) =>
                updateProject(index, "name", e.target.value)
              }
              placeholder="Project Name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* Project Type */}
            <input
              type="text"
              value={project.type || ""}
              onChange={(e) =>
                updateProject(index, "type", e.target.value)
              }
              placeholder="Project Type"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Project Description</label>
                <button
                  type="button"
                  onClick={() => handleAiEnhance(index, project)}
                  disabled={loadingIndex === index}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  {loadingIndex === index ? 'Generating...' : 'Enhance with AI'}
                </button>
              </div>

              <textarea
                rows={4}
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe your project..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
