import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ReelUploader from "../components/ReelUploader";

export default function Reels() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "reels"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setReels(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  return (
    <div>
      <ReelUploader />
      <h2>Reels</h2>
      <div className="reels-grid">
        {reels.map((r) => (
          <video key={r.id} src={r.videoUrl} controls className="reel-video" />
        ))}
      </div>
    </div>
  );
}
