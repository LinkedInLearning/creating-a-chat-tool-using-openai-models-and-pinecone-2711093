import { openai, pinecone, index } from "./config.js";
import "./style.css";

// DOM elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const chatReply = document.querySelector("#chat-reply");

// Submit form
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  input.value = "";
});

// Bring it all together
async function main(input) {
  chatReply.innerHTML = "Thinking...";
  const queryEmbedding = await generateEmbedding(input);
  const match = await queryData(queryEmbedding);
  chatReply.innerHTML = `<p></p>`;
}

// Manage chat completions with OpenAI
async function generateChatCompletion(text, query) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "system", content: "You are a helpful assistant." }],
  });
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
    topK: 1,
    includeValues: false,
    includeMetadata: true,
  });
  console.log(queryResponse.matches);
  return queryResponse.matches[0].metadata.content;
}
