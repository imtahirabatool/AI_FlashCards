import { auth } from '@clerk/nextjs/api';
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(400).json({ message: "Login failed", error });
  }
}