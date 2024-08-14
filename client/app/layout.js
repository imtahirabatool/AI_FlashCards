"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "FlashCard & Stripe",
  description: "Flashcard and Stripe integration project",
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={`${inter.className} bg-gray-200 text-gray-900`}>
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
                      href="/sign-in"
                      className="text-white hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
                    >
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dashboard"
                      className="text-white hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
            <p>&copy; 2024 FlashCard & Stripe. All rights reserved.</p>
          </footer>
        </body>
      </html>
    </Provider>
  );
}
