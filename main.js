import { openai } from "./config.js";
import "./style.css";

const sessions = [
  "AI and Education—Developing a Data Strategy",
  "3D Printing with Clay",
  "Art in the Age of Automation",
  "Virtual and Augmented Reality",
  "Diversity in the Maker Community",
];

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: sessions,
    encoding_format: "float",
  });

  console.log(embedding.data);
}

main();
