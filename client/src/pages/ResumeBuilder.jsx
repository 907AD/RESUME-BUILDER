// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { dummyResumeData } from "../assets/assets";

// import {
//   ArrowLeftIcon,
//   Briefcase,
//   ChevronLeft,
//   ChevronRight,
//   DownloadIcon,
//   EyeOffIcon,
//   FileText,
//   FolderIcon,
//   GraduationCap,
//   Share2Icon,
//   Sparkles,
//   User,
// } from "lucide-react";

// import PersonalInfoForm from "../components/PersonalInfoForm";
// import ResumePreview from "../components/ResumePreview";
// import TemplateSelector from "../components/TemplateSelector";
// import ColorPicker from "../components/ColorPicker";
// import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
// import ExperienceForm from "../components/ExperienceForm";
// import EducationForm from "../components/EducationForm";
// import ProjectForm from "../components/ProjectForm";
// import SkillsForm from "../components/SkillsForm";

// const ResumeBuilder = () => {
//   const { resumeId } = useParams();

//   const [resumeData, setResumeData] = useState({
//     _id: "",
//     title: "Untitled Resume",
//     personal_info: {},
//     professional_summary: "",
//     experience: [],
//     education: [],
//     project: [],
//     skills: [],
//     template: "classic",
//     accent_color: "#3B82F6",
//     public: false,
//   });

//   const [activeSectionIndex, setActiveSectionIndex] = useState(0);
//   const [removeBackground, setRemoveBackground] = useState(false);

//   const loadExistingResume = async () => {
//     const resume = dummyResumeData.find(
//       (resume) => String(resume._id) === String(resumeId)
//     );

//     if (resume) {
//       setResumeData(resume);
//       document.title = resume.title || "Resume Builder";
//     }
//   };

//   const sections = [
//     {
//       id: "personal",
//       name: "Personal Info",
//       icon: User,
//     },
//     {
//       id: "summary",
//       name: "Summary",
//       icon: FileText,
//     },
//     {
//       id: "experience",
//       name: "Experience",
//       icon: Briefcase,
//     },
//     {
//       id: "education",
//       name: "Education",
//       icon: GraduationCap,
//     },
//     {
//       id: "projects",
//       name: "Projects",
//       icon: FolderIcon,
//     },
//     {
//       id: "skills",
//       name: "Skills",
//       icon: Sparkles,
//     },
//   ];

//   const activeSection = sections[activeSectionIndex];

//   useEffect(() => {
//     loadExistingResume();
//   }, [resumeId]);

//   const changeResumeVisibility = async () => {
//     setResumeData({...resumeData, public: !resumeData.public})
//     const resumeUrl = frontendUrl + '/view/' + resumeId;

//     if(navigator.share) {
//       navigator.share({url: resumeUrl, text: "My Resume", })

//     } else {
//       alert('Share not supported on the browser');
//     }
//   }


//   const downloadResume = () => {
//     window.print();
//   }

//   const handleShare = () => {
//     const frontendUrl = window.location.href.split('/app/')[0];
//   }


//   return (
//     <div className="p-6">
//       {/* Back Button */}
//       <div>
//         <Link
//           to="/app"
//           className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
//         >
//           <ArrowLeftIcon className="size-4" />
//           Back to Dashboard
//         </Link>
//       </div>

//       {/* Resume Title */}
//       <div className="mt-4 mb-6">
//         <h1 className="text-2xl font-bold">
//           {resumeData.title || "Untitled Resume"}
//         </h1>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 pb-8">
//         <div className="grid lg:grid-cols-12 gap-8">


//           <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">


//               <hr className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />

//               <hr
//                 className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
//                 style={{
//                   width: `${
//                     (activeSectionIndex * 100) /
//                     (sections.length - 1)
//                   }%`,
//                 }}
//               />

//               {/* Section Navigation Header */}
//               <div className="flex justify-between items-center mb-6 border-b border-gray-200 py-1">

//                 {/* Template & Color */}
//                 <div className="flex justify-between items-center w-full py-1">
//                   <TemplateSelector
//                     selectedTemplate={resumeData.template}
//                     onChange={(template) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         template,
//                       }))
//                     }
//                   />

//                   <ColorPicker
//                     selectedColor={resumeData.accent_color}
//                     onChange={(color) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         accent_color: color,
//                       }))
//                     }
//                   />
//                 </div>

//                 {/* Previous / Next */}
//                 <div className="flex items-center gap-2">

//                   {activeSectionIndex !== 0 && (
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setActiveSectionIndex((prevIndex) =>
//                           Math.max(prevIndex - 1, 0)
//                         )
//                       }
//                       className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
//                     >
//                       <ChevronLeft className="size-4" />
//                       Previous
//                     </button>
//                   )}

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setActiveSectionIndex((prevIndex) =>
//                         Math.min(
//                           prevIndex + 1,
//                           sections.length - 1
//                         )
//                       )
//                     }
//                     className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all cursor-pointer ${
//                       activeSectionIndex === sections.length - 1
//                         ? "opacity-50"
//                         : ""
//                     }`}
//                     disabled={
//                       activeSectionIndex === sections.length - 1
//                     }
//                   >
//                     Next
//                     <ChevronRight className="size-4" />
//                   </button>
//                 </div>
//               </div>


//               <div className="space-y-6">

//                 {/* Personal Info */}
//                 {activeSection.id === "personal" && (
//                   <PersonalInfoForm
//                     data={resumeData.personal_info}
//                     onChange={(data) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         personal_info: data,
//                       }))
//                     }
//                     removeBackground={removeBackground}
//                     setRemoveBackground={setRemoveBackground}
//                   />
//                 )}

//                 {/* Summary */}
//                 {activeSection.id === "summary" && (
//                   <ProfessionalSummaryForm
//                     data={resumeData.professional_summary}
//                     onChange={(data) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         professional_summary: data,
//                       }))
//                     }
//                     setResumeData={setResumeData}
//                   />
//                 )}

//                 {/* Experience */}
//                 {activeSection.id === "experience" && (
//                   <ExperienceForm
//                     data={resumeData.experience}
//                     onChange={(data) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         experience: data,
//                       }))
//                     }
//                   />
//                 )}

//                 {/* Education */}
//                 {activeSection.id === "education" && (
//                   <EducationForm
//                     data={resumeData.education || []}
//                     onChange={(data) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         education: data,
//                       }))
//                     }
//                   />
//                 )}

//                 {/* Projects */}
//                 {activeSection.id === "projects" && (
//                   <ProjectForm
//                     data={resumeData.project || []}
//                     onChange={(data) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         project: data,
//                       }))
//                     }
//                   />
//                 )}


//                 {/* Skills */}
//                 {activeSection.id === "skills" && (
//                   <SkillsForm
//                     data={resumeData.skills || []}
//                     onChange={(data) =>
//                       setResumeData((prev) => ({
//                         ...prev,
//                         skills: data,
//                       }))
//                     }
//                   />
//                 )}

//               </div>

//               {/* Resume Analysis */}
//               <div className="mt-8">
//                 <h2 className="text-lg font-semibold mb-4">Resume Analysis</h2>

//                 {analysisLoading ? (
//                   <div>Loading analysis...</div>
//                 ) : analysis ? (
//                   <div className="p-4 rounded-lg border bg-gray-50">
//                     <h3 className="font-medium">AI Score: {analysis.score}</h3>

//                     <div className="mt-2">
//                       <strong>Strengths:</strong>
//                       <ul className="list-disc list-inside">
//                         {analysis.strengths.map((strength, index) => (
//                           <li key={index}>{strength}</li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div className="mt-2">
//                       <strong>Suggestions:</strong>
//                       <ul className="list-disc list-inside">
//                         {analysis.suggestions.map((suggestion, index) => (
//                           <li key={index}>{suggestion}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center text-gray-500">
//                     No analysis available yet.
//                   </div>
//                 )}

//                 <button
//                   onClick={handleAnalyzeResume}
//                   className="mt-4 w-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg px-4 py-2 transition-all hover:ring-2 ring-blue-300"
//                 >
//                   Analyze Resume
//                 </button>
//               </div>

//               {/* Save */}
//               <button className="bg-gradient-to-br fron-green-100 to-green-200 right-green-300 text-green-600 ring hover:ring-2 transition-all rounded-md px-6 py-2 mt-6 text-sm">
//                 Save Changes

//               </button>
//             </div>
//           </div>


//           <div className="lg:col-span-7 max-lg:mt-6">
//             <div className="relative w-full">
//               <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
//                  {resumeData.public && (
//                   <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gardient-to-br from-blue-10  to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
//                     <Share2Icon className="size-4"/> Share
//                   </button>
//                  )}
//                  <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-gardient-to-br from-blue-10  to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
//                     {resumeData.public ? <EyeIcon className="size - 4" /> : 
//                     <EyeOffIcon />
//                     }
//                     {resumeData.public ? 'public' : 'Private'}
//                  </button>

//                  <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors">
//                    <DownloadIcon className="size-4"/> Download
//                  </button>
//               </div>
//             </div>


//             <ResumePreview
//               data={resumeData}
//               template={resumeData.template}
//               accentColor={resumeData.accent_color}
//             />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "Untitled Resume",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const loadExistingResume = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`/api/resumes/get/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load resume");
      }

      const resume = result.resume || {};

      setResumeData({
        _id: resume._id || "",
        title: resume.title || "Untitled Resume",
        personal_info: resume.personal_info || {},
        professional_summary: resume.professional_summary || "",
        experience: resume.experience || [],
        education: resume.education || [],
        project: resume.project || [],
        skills: resume.skills || [],
        template: resume.template || "classic",
        accent_color: resume.accent_color || "#3B82F6",
        public: Boolean(resume.public),
      });

      document.title = resume.title || "Resume Builder";
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to load resume");
    }
  };

  const normalizeResumePayload = (data) => {
    const safePersonalInfo = {
      image: "",
      full_name: "",
      profession: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      ...(data?.personal_info && typeof data.personal_info === "object" ? data.personal_info : {}),
    };

    Object.keys(safePersonalInfo).forEach((key) => {
      const value = safePersonalInfo[key];
      if (value && typeof value === "object") {
        safePersonalInfo[key] = "";
      }
    });

    safePersonalInfo.image = typeof safePersonalInfo.image === "string" ? safePersonalInfo.image : "";

    return {
      ...data,
      _id: undefined,
      userId: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      personal_info: safePersonalInfo,
    };
  };

  const saveResume = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`/api/resumes/update/${resumeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(normalizeResumePayload(resumeData)),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save resume");
      }

      alert("Resume saved successfully");
    } catch (error) {
      alert(error.message || "Unable to save resume");
    }
  };

  const changeResumeVisibility = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const newPublicStatus = !resumeData.public;

    try {
      const response = await fetch(`/api/resumes/update/${resumeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(normalizeResumePayload({
          ...resumeData,
          public: newPublicStatus,
        })),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update visibility");
      }

      setResumeData((prev) => ({
        ...prev,
        public: newPublicStatus,
      }));

      if (newPublicStatus) {
        const frontendUrl = window.location.href.split("/app/")[0];
        const resumeUrl = `${frontendUrl}/view/${resumeId}`;

        if (navigator.share) {
          try {
            await navigator.share({
              url: resumeUrl,
              text: "My Resume",
            });
          } catch (error) {
            console.log("Share cancelled");
          }
        } else {
          await navigator.clipboard.writeText(resumeUrl);
          alert("Resume link copied to clipboard");
        }
      }
    } catch (error) {
      alert(error.message || "Unable to update resume visibility");
    }
  };

  const handleAnalyzeResume = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setAnalysisLoading(true);
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resumeData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to analyze resume');
      }

      setAnalysis(result.analysis || null);
    } catch (error) {
      alert(error.message || 'Unable to analyze resume');
    } finally {
      setAnalysisLoading(false);
    }
  };

  const sections = [
    {
      id: "personal",
      name: "Personal Info",
      icon: User,
    },
    {
      id: "summary",
      name: "Summary",
      icon: FileText,
    },
    {
      id: "experience",
      name: "Experience",
      icon: Briefcase,
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderIcon,
    },
    {
      id: "skills",
      name: "Skills",
      icon: Sparkles,
    },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  // Share Resume
  const handleShare = async () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume",
          url: resumeUrl,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(resumeUrl);
      alert("Resume link copied to clipboard");
    }
  };

  // Download / Print Resume
  const downloadResume = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <div>
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Resume Title */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold">
          {resumeData.title || "Untitled Resume"}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

              {/* Progress */}
              <hr className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />

              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${(activeSectionIndex * 100) /
                    (sections.length - 1)
                    }%`,
                }}
              />

              {/* Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 py-1">

                <div className="flex justify-between items-center w-full py-1">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template,
                      }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">

                  {activeSectionIndex !== 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(
                          prevIndex + 1,
                          sections.length - 1
                        )
                      )
                    }
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all cursor-pointer ${activeSectionIndex === sections.length - 1
                      ? "opacity-50"
                      : ""
                      }`}
                    disabled={
                      activeSectionIndex === sections.length - 1
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="space-y-6">

                {/* Personal */}
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {/* Summary */}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {/* Experience */}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {/* Education */}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {/* Projects */}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {/* Skills */}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}

              </div>

              {/* Resume Analysis */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Resume Analysis</h2>

                {analysisLoading ? (
                  <div>Loading analysis...</div>
                ) : analysis ? (
                  <div className="p-4 rounded-lg border bg-gray-50">
                    <h3 className="font-medium">AI Score: {analysis.overallScore ?? analysis.score ?? 'N/A'}</h3>

                    <div className="mt-2">
                      <strong>Strengths:</strong>
                      <ul className="list-disc list-inside">
                        {(analysis.strengths || []).map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <strong>Suggestions:</strong>
                      <ul className="list-disc list-inside">
                        {(analysis.suggestions || []).map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    No analysis available yet.
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAnalyzeResume}
                  className="mt-4 w-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg px-4 py-2 transition-all hover:ring-2 ring-blue-300"
                >
                  Analyze Resume
                </button>
              </div>

              {/* Save */}
              <button
                type="button"
                onClick={saveResume}
                className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 hover:ring-2 transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleAnalyzeResume}
                disabled={analysisLoading}
                className="ml-3 bg-gradient-to-br from-purple-100 to-purple-200 ring-purple-300 text-purple-600 hover:ring-2 transition-all rounded-md px-6 py-2 mt-6 text-sm disabled:opacity-50"
              >
                {analysisLoading ? 'Analyzing...' : 'AI Review'}
              </button>

              {analysis && (
                <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-semibold text-purple-900">Resume AI Review</h4>
                    <span className="rounded-full bg-purple-600 px-2 py-1 text-xs font-medium text-white">
                      {analysis.overallScore ?? analysis.score ?? 'N/A'}/10
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-purple-900">
                    <div>
                      <p className="font-medium">Fit for role</p>
                      <p className="text-purple-700">{analysis.fitForRole || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="font-medium">Strengths</p>
                      <ul className="list-disc pl-5 text-purple-700">
                        {(analysis.strengths || []).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium">Improvements</p>
                      <ul className="list-disc pl-5 text-purple-700">
                        {(analysis.improvements || []).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium">Suggestions</p>
                      <ul className="list-disc pl-5 text-purple-700">
                        {(analysis.suggestions || []).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">

              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">

                {/* Share Button */}
                {resumeData.public && (
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" />
                    Share
                  </button>
                )}

                {/* Public / Private */}
                <button
                  type="button"
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}

                  {resumeData.public ? "Public" : "Private"}
                </button>

                {/* Download */}
                <button
                  type="button"
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>

              </div>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;


