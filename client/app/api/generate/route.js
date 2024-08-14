import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

const systemPrompt = `
You are a flashcard creator. Your task is to generate flashcards based on the provided content. For each flashcard, you will receive a topic or set of facts and you need to create a question and an answer related to that topic. Each flashcard should have the following format:

1. **Question**: A clear, concise question related to the topic or facts provided.
2. **Answer**: A precise answer that provides the correct information for the question.

Ensure that the questions are designed to test knowledge or understanding of the topic, and the answers are accurate and informative. If the topic requires multiple flashcards to cover all important aspects, generate as many as needed to comprehensively cover the topic.

Here's an example of how to format the flashcards:

**Topic**: The Solar System

**Flashcard 1:**
- **Question**: What is the largest planet in our Solar System?
- **Answer**: Jupiter.

**Flashcard 2:**
- **Question**: Which planet is known as the Red Planet?
- **Answer**: Mars.

Please use this format to create flashcards for the given content.
Also return in the following JSON format
{
    "flashcards":[
    {
        "front":str,
        "back":str
    }
]}`;

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const data = await req.text();

  try {
    const completion = await genAI.chat.completion.create({
      messages: [
        { role: "system", content: systemPrompt }, // Corrected role name
        { role: "user", content: data },
      ],
      model: "gemini-pro",
      response_format: { type: "json_object" },
    });

    const flashCards = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(flashCards.flashcards); // Ensure this matches your response structure
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return NextResponse.error();
  }
}
