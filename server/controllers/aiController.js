import { generateResumeDescription, analyzeResume } from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { resumeData } = req.body || {};

    if (!resumeData) {
      return res.status(400).json({ message: "Resume data is required." });
    }

    const summary = await generateResumeDescription(resumeData);
    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to generate resume summary.",
    });
  }
};

export const enhanceSummary = enhanceProfessionalSummary;

export const analyzeResumeData = async (req, res) => {
  try {
    const { resumeData } = req.body || {};

    if (!resumeData) {
      return res.status(400).json({ message: "Resume data is required." });
    }

    const analysis = await analyzeResume(resumeData);
    return res.status(200).json({ analysis });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to analyze resume.",
    });
  }
};
