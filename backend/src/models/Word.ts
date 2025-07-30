import mongoose, { Document, Schema } from "mongoose";
import { IWord } from "../interfaces/word.interface";

const definitionSchema = new Schema(
  {
    definition: { type: String, required: true },
    example: { type: String, default: null },
    synonyms: { type: [String], default: [] },
    antonyms: { type: [String], default: [] },
  },
  { _id: false }
);

const meaningSchema = new Schema(
  {
    partOfSpeech: { type: String, required: true },
    definitions: { type: [definitionSchema], required: true },
  },
  { _id: false }
);

const wordSchema = new Schema<IWord & Document>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: {
      type: String,
      required: [true, "Word is required"],
    },
    phonetic: {
      type: String,
      default: null,
    },
    audio: {
      type: String,
      default: null,
    },
    meanings: {
      type: [meaningSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Word = mongoose.model<IWord & Document>("Word", wordSchema);
