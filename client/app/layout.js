"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ClerkProvider, useUser, UserButton } from "@clerk/nextjs"; 
import { useState } from "react";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "FlashCard & Stripe",
  description: "Flashcard and Stripe integration project",
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ClerkProvider>
        <html lang="en">
          <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <PlausibleProvider domain="https://ai-flash-cards.vercel.app/"/>
          </head>
          <body className={`${inter.className} bg-gray-200 text-gray-900`}>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
              <p>&copy; 2024 FlashCard & Stripe. All rights reserved.</p>
            </footer>
          </body>
        </html>
      </ClerkProvider>
    </Provider>
  );
}

function Header() {
  const { isSignedIn, user } = useUser(); 
  const [active, setActive] = useState(false);

  return (
    <header className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold hover:text-gray-100 transition-colors duration-300">
          FlashCard
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="text-white hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="text-white hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
              >
                My FlashCards
              </a>
            </li>
            {!isSignedIn ? (
              // Show Sign In button if user is not signed in
              <li>
                <a
                  href="/sign-in"
                  className="text-white hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
                >
                  Sign In
                </a>
              </li>
            ) : (
              // Show Avatar if user is signed in
              <li>
                <UserButton
                  userProfileMode="navigation" // Optional: Show a user menu with navigation links
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10", // Customize avatar size
                    },
                  }}
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
