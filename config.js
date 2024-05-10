import OpenAI from "openai";

// OpenAI config
export const openai = new OpenAI({
  apiKey: "OPENAI_API_KEY",
  dangerouslyAllowBrowser: true,
});
