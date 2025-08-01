import express from "express";
import { getWordMeaning } from "../controllers/dictionary.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:word", verifyToken, getWordMeaning);

export default router;
