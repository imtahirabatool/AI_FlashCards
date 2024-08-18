// components/FlashcardList.js
"use-client";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@clerk/nextjs";

const FlashcardList = ({ onDeleteFlashcard }) => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "flashcards"), where("userId", "==", user.id));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userFlashcards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFlashcards(userFlashcards);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "flashcards", id));
      onDeleteFlashcard(id);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="flex flex-row">
      {flashcards.map((flashcard) => (
        <div
          key={flashcard.id}
          className="mb-4 p-6 m-5 border border-gray-400 bg-slate-100 rounded-md w-auto h-auto"
        >
          <h3 className="text-lg font-medium mb-5">{flashcard.question}</h3>
          <p className="text-gray-700 mb-2">{flashcard.answer}</p>
          <button
            onClick={() => handleDelete(flashcard.id)}
            className="bg-red-500 text-white p-2 px-4 rounded-md hover:bg-red-600 w-auto transition-colors duration-300 mt-2"
          >
            Delete Card
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;