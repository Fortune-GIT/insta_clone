import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    const loadPosts = async () => {
      const snap = await getDocs(collection(db, "posts"));
      const all = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (tag) {
        setPosts(all.filter((p) => p.caption.includes(`#${tag}`)));
      } else {
        setPosts(all);
      }
    };
    loadPosts();
  }, [tag]);

  return (
    <div>
      <h2>Explore {tag && <span># {tag}</span>}</h2>
      <div className="feed">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
