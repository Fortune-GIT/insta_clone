// src/components/CreatePost.jsx
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const fileRef = ref(storage, `posts/${image.name}-${Date.now()}`);
    await uploadBytes(fileRef, image);
    const imageUrl = await getDownloadURL(fileRef);

    await addDoc(collection(db, "posts"), {
      userId: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      imageUrl,
      caption,
      createdAt: serverTimestamp(),
    });

    setCaption("");
    setImage(null);
  };

  return (
    <form className="create-post" onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What's on your mind?"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}
