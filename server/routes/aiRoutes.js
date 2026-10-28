import express from "express";
import { enhanceProfessionalSummary, analyzeResumeData } from "../controllers/aiController.js";
import { removeBackgroundFromImage } from "../configs/imagekit.js";

const aiRouter = express.Router();

aiRouter.post("/summary", enhanceProfessionalSummary);
aiRouter.post("/analyze", analyzeResumeData);

aiRouter.post("/remove-background", async (req, res) => {
  try {
    const file = req.file || null;

    if (!file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const result = await removeBackgroundFromImage(file, file.originalname || "resume-image.png");
    return res.status(200).json({
      message: "Background removed successfully.",
      result,
      imageUrl: result?.url || result?.output_url || result?.image || null,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Background removal failed." });
  }
});

export default aiRouter;
