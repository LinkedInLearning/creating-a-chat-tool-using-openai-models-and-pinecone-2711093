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
  const data = [];
  const text = await splitText("./documents/sessions.txt");

  for (const textChunk of text) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: textChunk.pageContent,
    });
    data.push({
      content: textChunk.pageContent,
      values: embeddingResponse.data[0].embedding,
    });
  }

  console.log(data);
  console.log("Embeddings complete!");
}
generateEmbeddings();
