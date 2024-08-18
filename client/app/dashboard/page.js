"use client";
import React from "react";
import FlashcardForm from "../components/FlashcardForm";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Flashcards</h1>
      <FlashcardForm />
    </div>
  );
};

export default Dashboard;
