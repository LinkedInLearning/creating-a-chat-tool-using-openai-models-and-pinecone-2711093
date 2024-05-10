import { openai } from "./config.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "./style.css";

// LangChain text splitter
async function splitText() {
  const response = await fetch("./documents/sessions.txt");
  const text = await response.text();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 125,
    chunkOverlap: 15,
  });

  const output = await splitter.createDocuments([text]);
  console.log(output);
}
splitText();
