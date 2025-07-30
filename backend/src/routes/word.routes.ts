import express from "express";
import { saveUserWord } from "../controllers/word.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/save", verifyToken, saveUserWord);

export default router;
