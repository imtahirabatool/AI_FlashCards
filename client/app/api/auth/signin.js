import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password, name, avatar } = req.body;

  try {
    // Check if user already exists
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(usersQuery);

    if (!querySnapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let avatarURL = null;

    // Upload avatar to Firebase Storage if it exists
    if (avatar) {
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      const avatarBuffer = Buffer.from(avatar, 'base64');
      await uploadBytes(avatarRef, avatarBuffer);
      avatarURL = await getDownloadURL(avatarRef);
    }

    // Store user data in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      avatar: avatarURL,
    });

    return res.status(200).json({ message: "User signed in", user });
  } catch (error) {
    return res.status(400).json({ message: "Sign-in failed", error });
  }
}