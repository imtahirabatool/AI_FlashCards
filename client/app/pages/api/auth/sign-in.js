import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

// Helper function to upload avatar to Firebase Storage
async function uploadAvatar(userId, avatar) {
  try {
    const avatarRef = ref(storage, `avatars/${userId}`);
    const avatarBuffer = Buffer.from(avatar, "base64");
    await uploadBytes(avatarRef, avatarBuffer);
    return getDownloadURL(avatarRef);
  } catch (error) {
    console.error("Avatar upload error:", error);
    throw error;
  }
}

// Helper function to set the authentication cookie
function setAuthTokenCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    })
  );
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json"); // Ensure the response is JSON

  try {
    switch (req.method) {
      case "POST":
        return req.body.login
          ? await loginHandler(req, res)
          : await signUpHandler(req, res);
      case "DELETE":
        return await logoutHandler(req, res);
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Sign-up Route Handler
async function signUpHandler(req, res) {
  const { email, password, name, avatar } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(usersQuery);

    if (!querySnapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      hashedPassword
    );
    const user = userCredential.user;

    let avatarURL = null;
    if (avatar) {
      avatarURL = await uploadAvatar(user.uid, avatar);
    }

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      avatar: avatarURL,
    });

    const token = await user.getIdToken();
    setAuthTokenCookie(res, token);

    return res.status(200).json({
      message: "User signed up",
      user: { uid: user.uid, name, email, avatar: avatarURL },
    });
  } catch (error) {
    console.error("Sign-up Error:", error);
    return res
      .status(500)
      .json({ message: "Sign-up failed", error: error.message });
  }
}

// Login Route Handler
async function loginHandler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const token = await user.getIdToken();
    setAuthTokenCookie(res, token);

    return res
      .status(200)
      .json({ message: "User logged in", user: { uid: user.uid, email } });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(401)
      .json({ message: "Login failed", error: error.message });
  }
}

// Logout Route Handler
async function logoutHandler(req, res) {
  try {
    await signOut(auth);

    res.setHeader(
      "Set-Cookie",
      serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
      })
    );

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
}
