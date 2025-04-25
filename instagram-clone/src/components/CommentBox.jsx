// src/components/CommentBox.jsx
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";

export default function CommentBox({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", postId, "comments"), {
      text,
      parentId: replyTo || null,
      userId: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
    });
    setText("");
    setReplyTo(null);
  };

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const threaded = data.filter(c => !c.parentId).map(parent => ({
        ...parent,
        replies: data.filter(c => c.parentId === parent.id),
      }));
      setComments(threaded);
    });
    return () => unsub();
  }, [postId]);

  return (
    <div className="comments-section">
      <form onSubmit={handleSend}>
        {replyTo && <div>Replying to comment #{replyTo}</div>}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>@{c.username}</strong>: {c.text}
            <button onClick={() => setReplyTo(c.id)}>Reply</button>
            <ul className="nested-comments">
              {c.replies.map(r => (
                <li key={r.id}><strong>@{r.username}</strong>: {r.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
