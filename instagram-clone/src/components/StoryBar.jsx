// src/components/StoryBar.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function StoryBar() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "stories"), (snap) => {
      setStories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  return (
    <div className="ig-stories-bar">
      {stories.map((story) => (
        <img
          key={story.id}
          src={story.imageUrl}
          alt="story"
          className="ig-story-avatar"
        />
      ))}
    </div>
  );
}
