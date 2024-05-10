import { openai } from "./config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "./style.css";

// LangChain text splitter
async function splitText(document) {
  const response = await fetch(document);
  const text = await response.text();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 125,
    chunkOverlap: 15,
  });

  const output = await splitter.createDocuments([text]);
  return output;
}

// Generate embeddings
async function generateEmbeddings() {
  console.log("Embeddings complete!");
}
