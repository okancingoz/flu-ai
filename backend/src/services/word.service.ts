import { Types } from "mongoose";
import { IWord } from "../interfaces/word.interface";
import { Word } from "../models/Word";

interface SaveWordPayload
  extends Omit<IWord, "user" | "_id" | "createdAt" | "updatedAt"> {}

export const saveWordService = async (
  id: Types.ObjectId,
  wordData: SaveWordPayload
): Promise<IWord> => {
  const existing = await Word.findOne({ user: id, word: wordData.word });

  const word = existing || new Word({ user: id, ...wordData });
  return await word.save();
};
