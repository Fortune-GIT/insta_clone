// src/components/BookmarkButton.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

export default function BookmarkButton({ postId }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "bookmarks"),
      where("postId", "==", postId)
    );
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setBookmarked(true);
        setBookmarkId(snap.docs[0].id);
      } else {
        setBookmarked(false);
        setBookmarkId(null);
      }
    });
    return unsub;
  }, [postId]);

  const toggle = async () => {
    if (bookmarked && bookmarkId) {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "bookmarks", bookmarkId));
    } else {
      await addDoc(collection(db, "users", auth.currentUser.uid, "bookmarks"), {
        postId,
        createdAt: new Date()
      });
    }
  };

  return <span onClick={toggle}>{bookmarked ? "🔖" : "📌"}</span>;
}
