import { Types } from "mongoose";

export interface IDefinition {
  definition: string;
  example?: string | null;
  synonyms?: string[];
  antonyms?: string[];
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
}

export interface IPhonetic {
  text?: string;
  audio?: string;
}

export interface IWord {
  _id: string;
  user: Types.ObjectId;
  word: string;
  phonetic?: string | null;
  phonetics: IPhonetic[];
  origin: string | null;
  audio?: string | null;
  meanings: IMeaning[];
  createdAt?: Date;
  updatedAt?: Date;
}
