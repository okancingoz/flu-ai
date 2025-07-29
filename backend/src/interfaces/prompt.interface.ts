import { Types } from "mongoose";

export interface IPrompt {
  user: Types.ObjectId;
  promptText: string;
  response: string;
  alternatives: string[];
  language: "en" | "tr" | "es" | "fr" | "de" | "it" | "pt";
  createdAt: Date;
}
