"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RxAvatar } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSignIn, useAuth } from "@clerk/nextjs";

export default function SignIn() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const { signIn } = useSignIn()
  const { isSignedIn, signOut } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    avatar: null,
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      handleFileInputChange(e);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Signed in successfully!");
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error signing in");
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSignedIn) {
      await signOut();
    }
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: `${window.location.origin}/dashboard`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (error) {
      console.error('Error signing in with Google:', error.response || error.message || error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <motion.div
        className="bg-white w-full p-8 rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Register as a new user
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <div className="mt-2 flex items-center space-x-4">
              {/* Avatar preview */}
              <span className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8 text-gray-400" />
                )}
              </span>
              {/* File input for avatar */}
              <label
                htmlFor="file-input"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Sign In
          </button>
          <div className="mt-4">
          <button
            type="button"
            className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-300 mt-4"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </button>
          </div>
          <div className="w-full flex items-center justify-center">
            <h4 className="inline-block">Already have an account?</h4>
            <a href="/login" className="text-blue-600 pl-2 inline-block">
              Login
            </a>
          </div>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
}