"use client";

import React, { useState } from "react";
import FlashcardList from "../components/FlashcardList";
import FlashcardForm from "../components/FlashcardForm";

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);

  const handleAddFlashcard = (newFlashcard) => {
    setFlashcards([...flashcards, newFlashcard]);
  };

  const handleDeleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI-Generated Flashcards</h1>
      <FlashcardForm onAddFlashcard={handleAddFlashcard} />
      <FlashcardList flashcards={flashcards} onDeleteFlashcard={handleDeleteFlashcard} />
    </div>
  );
};

export default Dashboard;
