import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowBigLeftIcon } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/resumes/public/${resumeId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Resume not found");
      }

      setResumeData(result.resume);
    } catch (error) {
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-4xl text-slate-400 font-medium">
          Resume not found
        </p>

        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
        >
          <ArrowBigLeftIcon className="mr-2 size-4" />
          Go to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  );
};

export default Preview;
