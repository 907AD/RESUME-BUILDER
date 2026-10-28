import express from "express";
import protect from "../middlewares/authmiddleware.js";
import {
  createResume,
  UpdateResume,
  DeleteResume,
  GetResumeById,
  getPublicResumeId,
} from "../controllers/ResumeController.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update/:resumeId', protect, UpdateResume);
resumeRouter.delete('/delete/:resumeId', protect, DeleteResume);
resumeRouter.get('/get/:resumeId', protect, GetResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeId);

export default resumeRouter;
