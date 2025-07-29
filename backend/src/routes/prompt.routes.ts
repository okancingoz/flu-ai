import express from "express";
import { createPrompt } from "../controllers/prompt.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createPrompt);

export default router;
