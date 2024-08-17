// components/FlashcardForm.js

"use-client";
import React, { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

const FlashcardForm = ({ onAddFlashcard }) => {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFlashcard = { topic, question, answer };

    try {
      // Save to Firebase
      const docRef = await addDoc(collection(db, "flashcards"), newFlashcard);
      onAddFlashcard({ id: docRef.id, ...newFlashcard });
      setTopic("");
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const handleGenerateFlashcard = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("/pages/api/generate", {
        prompt: `Topic: ${topic}`,
      });
      const flashcard = response.data.flashcards?.[0];
      setQuestion(flashcard?.front || "No question generated");
      setAnswer(flashcard?.back || "No answer generated");
    } catch (error) {
      console.error("Error generating flashcard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700"
        >
          Topic
        </label>
        <div className="flex">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            type="button"
            onClick={handleGenerateFlashcard}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {loading ? "Generating..." : "Generate Flashcard"}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="answer"
          className="block text-sm font-medium text-gray-700"
        >
          Answer
        </label>
        <input
          type="text"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Add Flashcard
      </button>
    </form>
  );
};

export default FlashcardForm;
