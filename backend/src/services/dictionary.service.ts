import { IMeaning, IWord } from "../interfaces/word.interface";
import { AppError } from "../utils/AppError";

export const getWordDefinitionFromAPI = async (
  word: string
): Promise<Omit<IWord, "user" | "_id" | "createdAt" | "updatedAt">> => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new AppError("Word not found in dictionary", 404);
    }
    throw new AppError("Failed to fetch word definition", 500);
  }

  const data = await response.json();
  const entry = data[0];

  const phonetic: string | null =
    entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || null;

  const audio: string | null =
    entry.phonetics?.find((p: any) => p.audio)?.audio || null;

  const phonetics: { text?: string; audio?: string }[] = entry.phonetics || [];

  const origin: string | null = entry.origin || null;

  const meanings: IMeaning[] =
    entry.meanings?.map((meaning: any) => ({
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions.map((def: any) => ({
        definition: def.definition,
        example: def.example || null,
        synonyms: def.synonyms || [],
        antonyms: def.antonyms || [],
      })),
    })) || [];

  return {
    word: entry.word,
    phonetic,
    audio,
    phonetics,
    origin,
    meanings,
  };
};
