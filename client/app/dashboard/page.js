"use client";
import React from "react";
import FlashcardForm from "../components/FlashcardForm";

const Dashboard = () => {
  return (
<<<<<<< HEAD
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Flashcards</h1>
      <FlashcardForm />
=======
    <div className="p-6 mt-16">
      <div
        className={`min-h-screen p-12 flex flex-col bg-gradient-to-r from-blue-500 to-purple-500 text-white`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">My Flashcards</h1>
        <FlashcardForm />
        <FlashcardList />
      </div>
>>>>>>> 1dd207a658322f9b695bf78f78f5efd4efee65e8
    </div>
  );
};

export default Dashboard;
