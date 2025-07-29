import asyncHandler from "express-async-handler";
import { Prompt } from "../models/Prompt";
import { generateResponse } from "../services/prompt.service";
import { AppError } from "../utils/AppError";

export const createPrompt = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { promptText, language = "en" } = req.body;

  if (!promptText || typeof promptText !== "string") {
    res.status(400);
    throw new AppError("Prompt is required and must be a string.", 400);
  }

  const { response, alternatives } = await generateResponse(
    promptText,
    language
  );

  const promptDoc = await Prompt.create({
    user: userId,
    promptText,
    response,
    alternatives,
  });

  res.status(201).json(promptDoc);
});
