import { Types } from "mongoose";

export interface IPrompt {
  _id: string;
  user: Types.ObjectId;
  promptText: string;
  response: string;
  alternatives: string[];
  language: "en" | "tr" | "es" | "fr" | "de" | "it" | "pt";
  createdAt: Date;
}
