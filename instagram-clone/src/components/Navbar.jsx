// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="ig-navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src="/instagram-logo.png" alt="Instagram" height="30" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">🏠</Link>
        <Link to="/explore">🔍</Link>
        <Link to="/reels">🎥</Link>
        <Link to="/messages">💬</Link>
        <Link to="/notifications">🔔</Link>
        <Link to={`/profile/${user?.displayName}`}>👤</Link>
        <Link to="/saved">📌</Link>
        <Link to="/edit">✏️</Link>
        <button onClick={logout}>🚪</button>
      </div>
      <SearchBar />
    </nav>
  );
}
