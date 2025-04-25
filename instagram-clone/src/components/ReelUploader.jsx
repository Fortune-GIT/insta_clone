// src/components/ReelUploader.jsx
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ReelUploader() {
  const [file, setFile] = useState(null);

  const uploadReel = async () => {
    if (!file) return;

    const videoRef = ref(storage, `reels/${file.name}-${Date.now()}`);
    await uploadBytes(videoRef, file);
    const url = await getDownloadURL(videoRef);

    await addDoc(collection(db, "reels"), {
      videoUrl: url,
      username: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
    });

    setFile(null);
  };

  return (
    <div>
      <h3>Upload a Reel</h3>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadReel}>Upload</button>
    </div>
  );
}
