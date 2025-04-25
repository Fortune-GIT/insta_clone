// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import GroupMessages from "./pages/GroupMessages";
import Notifications from "./pages/Notifications";
import Saved from "./pages/Saved";
import EditProfile from "./pages/EditProfile";
import Reels from "./pages/Reels";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/group" element={<GroupMessages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/reels" element={<Reels />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
