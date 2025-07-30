import express from "express";
import { getWordMeaning } from "../controllers/dictionary.controller";

const router = express.Router();

router.get("/:word", getWordMeaning);

export default router;
