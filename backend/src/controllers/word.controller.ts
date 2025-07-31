import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getWordDefinitionFromAPI } from "../services/dictionary.service";
import { saveWordService } from "../services/word.service";
import { AppError } from "../utils/AppError";

export const saveWord = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user?._id;
  if (!id) throw new AppError("Unauthorized", 401);

  const { word } = req.body;
  if (!word) throw new AppError("Word is required", 400);

  const wordData = await getWordDefinitionFromAPI(word);

  const savedWord = await saveWordService(id, wordData);

  res.status(201).json({
    success: true,
    data: savedWord,
  });
});
