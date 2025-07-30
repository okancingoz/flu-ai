import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getWordDefinitionFromAPI } from "../services/dictionary.service";
import { AppError } from "../utils/AppError";

export const getWordMeaning = asyncHandler(
  async (req: Request, res: Response) => {
    const word = req.params.word;

    if (!word) throw new AppError("Word parameter is required", 400);

    const wordData = await getWordDefinitionFromAPI(word);

    res.status(200).json({
      success: true,
      data: wordData,
    });
  }
);
