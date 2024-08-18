"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./Header"; // Adjust the path according to your folder structure

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
          </head>
          <body className={`${inter.className} bg-gray-200 text-gray-900`}>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
              <p>&copy; 2024 SmartFlash Vault. All rights reserved.</p>
            </footer>
          </body>
        </html>
      </ClerkProvider>
    </Provider>
  );
}
