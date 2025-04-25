// src/components/SearchBar.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const searchUsers = async () => {
    if (!term) return setResults([]);
    const q = query(collection(db, "users"), where("username", ">=", term));
    const snap = await getDocs(q);
    setResults(snap.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    const delay = setTimeout(() => searchUsers(), 300);
    return () => clearTimeout(delay);
  }, [term]);

  return (
    <div className="search-bar">
      <input
        placeholder="Search users..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <div className="search-results">
        {results.map((user) => (
          <Link key={user.uid} to={`/profile/${user.username}`}>
            @{user.username}
          </Link>
        ))}
      </div>
    </div>
  );
}
