import mongoose, { Schema } from "mongoose";
import { IPrompt } from "../interfaces/prompt.interface";

const promptSchema = new Schema<IPrompt & Document>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    promptText: {
      type: String,
      required: [true, "Prompt text is required"],
      trim: true,
    },
    response: {
      type: String,
      required: [true, "Response is required"],
      trim: true,
    },
    alternatives: {
      type: [String],
      default: [],
      required: true,
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      enum: ["en", "tr", "es", "fr", "de", "it", "pt"],
      default: "en",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Prompt = mongoose.model<IPrompt & Document>(
  "Prompt",
  promptSchema
);
