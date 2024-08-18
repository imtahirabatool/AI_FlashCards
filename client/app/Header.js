"use client";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold hover:text-violet-200 transition-colors duration-300">
          SmartFlash Vault
        </h1>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`lg:flex lg:items-center lg:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
            <li>
              <a
                href="/"
                className="text-white hover:text-pink-300 transition-colors duration-300 transform hover:scale-105"
              >
                Home
              </a>
            </li>

            {!isSignedIn ? (
              <li>
                <a
                  href="/sign-in"
                  className="text-white hover:text-pink-300 transition-colors duration-300 transform hover:scale-105"
                >
                  Sign In
                </a>
              </li>
            ) : (
              <>
                <li>
                  <a
                    href="/dashboard"
                    className="text-white hover:text-pink-300 transition-colors duration-300 transform hover:scale-105"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <UserButton
                    userProfileMode="navigation"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
