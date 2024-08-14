"use client"; // Ensure this is at the top

import React, { useState } from "react";
import FlashcardList from "../components/FlashcardList";
import FlashcardForm from "../components/FlashcardForm";

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI-Generated Flashcards</h1>
      <FlashcardForm
        onAddFlashcard={(flashcard) =>
          setFlashcards([...flashcards, flashcard])
        }
      />
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default Dashboard;
