import { openai, pinecone, index } from "../config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Generate an ID
let currentId = 16;
export function nextId() {
  return (currentId += 1).toString();
}

// Write vectors into Pinecone index
export async function upsertRecords(file) {
  const embeddingsData = await generateEmbeddings(file);

  await index.upsert(embeddingsData);
  console.log("Upsert Successful!");
}

// LangChain text splitter
export async function splitText(document) {
  const response = await fetch(document);
  const text = await response.text();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const output = await splitter.createDocuments([text]);
  return output;
}

// Generate embeddings
export async function generateEmbeddings(document) {
  const data = [];
  const text = await splitText(document);

  for (const textChunk of text) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: textChunk.pageContent,
    });
    data.push({
      id: nextId(),
      values: embeddingResponse.data[0].embedding,
      metadata: { content: textChunk.pageContent },
    });
  }
  console.log("Embeddings complete!");
  return data;
}
