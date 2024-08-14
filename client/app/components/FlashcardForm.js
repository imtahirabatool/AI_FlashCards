// components/FlashcardForm.js
"use-client";
import React, { useState } from "react";

const FlashcardForm = ({ onAddFlashcard }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFlashcard({ question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
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
