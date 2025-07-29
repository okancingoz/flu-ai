import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Prompt } from "../models/Prompt";
import {
  generateResponseService,
  getUserPromptHistoryService,
} from "../services/prompt.service";
import { AppError } from "../utils/AppError";

export const createPrompt = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { promptText, language = "en" } = req.body;

    if (!promptText || typeof promptText !== "string") {
      res.status(400);
      throw new AppError("Prompt is required and must be a string.", 400);
    }

    const { response, alternatives } = await generateResponseService(
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
  }
);

export const getUserPromptHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.user._id.toString();
    const history = await getUserPromptHistoryService(id);
    res.status(200).json({ history });
  }
);
