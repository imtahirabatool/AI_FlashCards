"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  collection,
  doc,
  writeBatch,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@clerk/nextjs";
import "../globals.css";

const FlashcardForm = () => {
  const { user } = useUser();
  const [topic, setTopic] = useState("");
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserFlashcards();
    }
  }, [user]);

  const fetchUserFlashcards = async () => {
    try {
      const q = query(
        collection(db, "flashcards"),
        where("userId", "==", user.id)
      );
      const querySnapshot = await getDocs(q);
      const userFlashcards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGeneratedFlashcards(userFlashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleGenerateFlashcard = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("/pages/api/generate", {
        prompt: `Topic: ${topic}`,
      });
      const flashcards = response.data.flashcards || [];
      setGeneratedFlashcards(flashcards);

      setTopic("");
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlashcards = async () => {
    if (!user) {
      alert("You need to sign in to add flashcards.");
      return;
    }

    try {
      const batch = writeBatch(db);
      generatedFlashcards.forEach((flashcard) => {
        const newFlashcard = { ...flashcard, userId: user.id };
        const docRef = doc(collection(db, "flashcards"));
        batch.set(docRef, newFlashcard);
      });

      await batch.commit();
      alert("Flashcard added successfully!");
      fetchUserFlashcards();
    } catch (error) {
      console.error("Error adding flashcards:", error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await deleteDoc(doc(db, "flashcards", id));
      setGeneratedFlashcards((prevFlashcards) =>
        prevFlashcards.filter((flashcard) => flashcard.id !== id)
      );
      alert("Flashcard deleted successfully!");
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const handleDeleteAll = () => {
    setGeneratedFlashcards([]);
    alert("All Flashcards are going to delete!");
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="topic" className="block text-lg font-bold text-white">
          Topic
        </label>
        <div className="flex">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="mt-1 p-2 text-black border border-gray-300 rounded-md w-full"
          />
          <button
            type="button"
            onClick={handleGenerateFlashcard}
            className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>
        </div>
      </div>

      {generatedFlashcards.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedFlashcards.map((flashcard, index) => (
              <div key={index} className="flashcard-container w-64 h-48">
                <div className="flashcard">
                  <div className="side front p-4">
                    <h2 className="text-lg font-semibold mb-2 text-center">
                      {flashcard.front}
                    </h2>
                  </div>
                  <div className="side back p-4">
                    <p className="text-center">{flashcard.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAddFlashcards}
              className="bg-green-600 text-white p-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleDeleteAll}
              className="ml-2 bg-red-600 text-white p-2 px-3 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardForm;
