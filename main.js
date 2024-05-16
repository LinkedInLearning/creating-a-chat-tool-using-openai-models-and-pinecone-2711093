import { openai, pinecone, index } from "./config.js";
import "./style.css";

// DOM elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const chatReply = document.querySelector("#chat-reply");

// Submit form
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  main(input.value);
  input.value = "";
});

// Bring it all together
async function main(input) {
  chatReply.innerHTML = "Thinking...";
  const queryEmbedding = await generateEmbedding(input);
  const match = await queryData(queryEmbedding);
  const reply = await generateChatCompletion(match, input);
  chatReply.innerHTML = `<p>${reply}</p>`;
}

// Manage chat completions with OpenAI
const messages = [
  {
    role: "system",
    content: `You are a friendly assistant helping with inquiries about the Red30Tech Conf. Remember details provided by users and reference them when relevant. Answer using the provided context or refer back to relevant information from earlier in the conversation, including the user's name and any answers provided to previous questions. If unsure, respond with, "Sorry, I don't know the answer." Do not make up an answer.`,
  },
];

async function generateChatCompletion(text, query) {
  messages.push({
    role: "user",
    content: `Context: ${text} Question: ${query}`,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    frequency_penalty: 0.5,
    temperature: 0.5,
  });
  messages.push(response.choices[0].message);
  return response.choices[0].message.content;
}

// Generate embedding from query
async function generateEmbedding(input) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  });

  return embeddingResponse.data[0].embedding;
}

// Query Pinecone using embedding
async function queryData(queryVector) {
  const queryResponse = await index.query({
    vector: queryVector,
    topK: 4,
    includeValues: false,
    includeMetadata: true,
  });

  // Concatenate & return matching text chunks
  const matches = queryResponse.matches;
  const combinedMatches = matches
    .map(match => match.metadata.content)
    .join("\n");
  console.log(combinedMatches);
  return combinedMatches;
}
