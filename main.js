import { openai, pinecone, index } from "./config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { nextId } from "./utils";
import "./style.css";

const txtFile = "./documents/sessions.txt";

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
      id: "0",
      values: embeddingResponse.data[0].embedding,
      content: textChunk.pageContent,
    });
  }
  console.log("Embeddings complete!");
  return data;
}
