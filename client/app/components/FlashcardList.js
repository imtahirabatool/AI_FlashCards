// components/FlashcardList.js
"use-client";
import React from "react";
import Flashcard from "./Flashcard";

const FlashcardList = ({ flashcards }) => {
  return (
    <div className="flex flex-wrap">
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} flashcard={flashcard} />
      ))}
    </div>
  );
};

export default FlashcardList;
