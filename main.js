import { openai, pinecone, index } from "./config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { nextId } from "./utils";
import "./style.css";

const txtFile = "./documents/sessions.txt";

// Write vectors into Pinecone index
async function upsertRecords() {
  const embeddingsData = await generateEmbeddings(txtFile);

  await index.upsert(embeddingsData);
  console.log("Upsert Successful!");
}
// upsertRecords();
console.log(await index.describeIndexStats());

// LangChain text splitter
async function splitText(document) {
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
async function generateEmbeddings(doc) {
  const data = [];
  const text = await splitText(doc);

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
