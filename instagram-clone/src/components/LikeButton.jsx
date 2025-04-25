// src/components/LikeButton.jsx
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "likes"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setLiked(true);
        setLikeId(snapshot.docs[0].id);
      } else {
        setLiked(false);
        setLikeId(null);
      }
    });
    return unsub;
  }, [postId]);

  const toggleLike = async () => {
    if (liked && likeId) {
      await deleteDoc(doc(db, "posts", postId, "likes", likeId));
    } else {
      await addDoc(collection(db, "posts", postId, "likes"), {
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
    }
  };

  return <span onClick={toggleLike}>{liked ? "💔" : "❤️"}</span>;
}
