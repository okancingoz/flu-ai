import OpenAI from "openai";

interface GenerateResponseResult {
  response: string;
  alternatives: string[];
}

export async function generateResponse(
  promptText: string,
  language: string = "en"
): Promise<GenerateResponseResult> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completionResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: promptText,
      },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });
  const response = completionResponse.choices[0].message?.content?.trim() ?? "";

  const alternativesPrompt = `Provide up to 5 natural and fluent alternative ways to say the following sentence in ${language}:\n"${promptText}"\nPlease list each alternative on a new line.`;

  const alternativesResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: alternativesPrompt,
      },
    ],
    max_tokens: 150,
    temperature: 0.8,
  });

  const alternativesText =
    alternativesResponse.choices[0].message?.content?.trim() ?? "";

  const alternatives = alternativesText
    .split(/\n/)
    .map((line) => line.replace(/^(\d+[\).\s]*)/, "").trim())
    .filter((line) => line.length > 0);

  return { response, alternatives };
}
