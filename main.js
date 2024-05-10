import { openai } from "./config.js";
import "./style.css";

const sessions = [
  "Welcome ceremony and Keynote – We are All Makers",
  "AI and Education—Developing a Data Strategy",
  "3D Printing with Clay",
  "Art in the Age of Automation",
  "Virtual and Augmented Reality",
  "Diversity in the Maker Community",
  "Managing Virtual Teams",
  "AI and Education—Developing a Data Strategy",
  "This is your Brain on VR",
  "The Art of Sound",
];

async function main() {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: sessions,
    encoding_format: "float",
  });

  console.log(embeddingResponse.data);
}

main();
