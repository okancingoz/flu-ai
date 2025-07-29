import express from "express";
import {
  createPrompt,
  getUserPromptHistory,
} from "../controllers/prompt.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createPrompt);
router.get("/history", verifyToken, getUserPromptHistory);

export default router;
