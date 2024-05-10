import { openai, pinecone, index } from "./config.js";
import "./style.css";

// DOM elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const chatReply = document.querySelector("#chat-reply");

// Submit form
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const queryEmbedding = await generateEmbedding(input.value);
  const reply = await queryData(queryEmbedding);
  input.value = "";
  chatReply.innerHTML = `<p>${reply}</p>`;
});

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
    topK: 3,
    includeValues: false,
    includeMetadata: true,
  });
  console.log(queryResponse.matches);
  return queryResponse.matches[0].metadata.content;
}
