import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const qUser = query(collection(db, "users"), where("username", "==", username));
    const unsubUser = onSnapshot(qUser, (snap) => {
      const userData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
      setUser(userData);
    });

    const qPosts = query(collection(db, "posts"), where("username", "==", username));
    const unsubPosts = onSnapshot(qPosts, (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubUser();
      unsubPosts();
    };
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.avatar || "/avatar.png"} alt="avatar" className="profile-avatar" />
        <div>
          <h2>@{user.username}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="feed">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
