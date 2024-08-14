// components/Flashcard.js
"use-client";
import React from "react";

const Flashcard = ({ flashcard }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-2">
      <h2 className="text-lg font-semibold mb-2">{flashcard.question}</h2>
      <p className="text-gray-700">{flashcard.answer}</p>
    </div>
  );
};

export default Flashcard;
