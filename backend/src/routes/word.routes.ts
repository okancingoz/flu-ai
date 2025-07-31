import express from "express";
import { saveWord } from "../controllers/word.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/save", verifyToken, saveWord);

export default router;
