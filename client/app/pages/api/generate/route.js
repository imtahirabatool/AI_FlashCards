// //api/generate/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY is not set. Please add it to your environment variables.");
} else {
  console.log("GEMINI_API_KEY is set.");
}

const systemPrompt = `
You are a flashcard creator. Your task is to generate flashcards based on the provided content. For each flashcard, you will receive a topic or set of facts, and you need to create an answer related to that topic. Each flashcard should have the following format:

1. **Question**: A clear, concise question related to the topic or facts provided.
2. **Answer**: A precise answer that provides the correct information for the question.

Ensure that the questions and answers are designed to test knowledge or understanding of the topic, and are accurate and informative. If the topic requires multiple flashcards to cover all important aspects, generate as many as needed to comprehensively cover the topic.

Here's an example of how to format the flashcards:

**Topic**: The Solar System

**Flashcard 1:**
- **Question**: What is the largest planet in our Solar System?
- **Answer**: Jupiter.

**Flashcard 2:**
- **Question**: Which planet is known as the Red Planet?
- **Answer**: Mars.

Please use this format to create flashcards for the given content.
Return in the following JSON format:
{
    "flashcards":[
        {
            "front":str,
            "back":str
        }
    ]
}`;

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const data = await req.json();
    console.log("Received data:", data);

    if (!data.prompt) {
      throw new Error("No prompt provided");
    }

    console.log("Calling Gemini API with prompt:", data.prompt);

    let completion;
    try {
      completion = await model.generateContent([
        systemPrompt,
        `Generate flashcards for the topic: ${data.prompt}`
      ]);
      console.log("API call succeeded:", completion);
    } catch (apiError) {
      console.error("API call failed:", apiError);
      throw new Error("Failed to contact Gemini API: " + apiError.message);
    }

    console.log("Complete API response:", completion);

    const messageContent = completion.response.text();
    console.log("Message content:", messageContent);

    if (!messageContent) {
      throw new Error("Invalid response from Gemini API");
    }

    let flashCards;
    try {
      flashCards = JSON.parse(messageContent);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Failed to parse the response from Gemini API.");
    }

    if (!flashCards || !flashCards.flashcards) {
      throw new Error("Invalid response format from Gemini API");
    }

    return NextResponse.json({ flashcards: flashCards.flashcards });
  } catch (error) {
    console.error("Error generating flashcards:", error.message);
    return NextResponse.json({ error: error.message || "Failed to generate flashcards." }, { status: 500 });
  }
}