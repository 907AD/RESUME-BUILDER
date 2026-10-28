import mongoose from "mongoose";
import Resume from "../models/Resume.js";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title = "Untitled Resume", template, accent_color, public: isPublic } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
      template: template || "classic",
      accent_color: accent_color || "#3B82F6",
      public: !!isPublic,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const DeleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    if (!isValidObjectId(resumeId)) {
      return res.status(400).json({ message: "Invalid resume id" });
    }

    const deletedResume = await Resume.findOneAndDelete({ userId, _id: resumeId });

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
      resume: deletedResume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const GetResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    if (!isValidObjectId(resumeId)) {
      return res.status(400).json({ message: "Invalid resume id" });
    }

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPublicResumeId = async (req, res) => {
  try {
    const { resumeId } = req.params;

    if (!isValidObjectId(resumeId)) {
      return res.status(400).json({ message: "Invalid resume id" });
    }

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const UpdateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const resumeData = req.body;

    if (!isValidObjectId(resumeId)) {
      return res.status(400).json({ message: "Invalid resume id" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      { $set: resumeData },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};