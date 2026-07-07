import { config } from "dotenv";
config();

import OpenAI from "openai";
import readline from "readline";
import fs from "fs";

// Load structured housing data (grounding source for the assistant)
const housingData = JSON.parse(fs.readFileSync("./housingData.json", "utf8"));

// Initialize OpenAI client (key loaded from .env)
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

// Setup CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Hi 👋 I'm the CommonKeys Housing Assistant!");
console.log("Ask me about affordable housing options, upcoming developments, or financial aid programs in the GTA.\n");

const askQuestion = () => {
  rl.question("You: ", async (input) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
            You are the CommonKeys Housing Assistant, helping low-income individuals
            and families in the Greater Toronto Area find affordable, accessible,
            and sustainable housing.

            Use only the following data to answer questions accurately:
            ${JSON.stringify(housingData, null, 2)}

            Your tone should be warm, clear, and supportive. Avoid jargon —
            explain programs in plain language. If asked something outside
            housing, affordability, or financial aid, politely redirect the
            user to those topics. Never invent listings, prices, or program
            details that are not in the data.
            `,
          },
          {
            role: "user",
            content: input,
          },
        ],
      });

      console.log("\n🏠 CommonKeys:", response.choices[0].message.content.trim(), "\n");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }

    askQuestion();
  });
};

askQuestion();
