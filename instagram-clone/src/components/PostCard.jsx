// src/components/PostCard.jsx
import React from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import CommentBox from "./CommentBox";

export default function PostCard({ post }) {
  function parseCaption(text) {
    return text.split(" ").map((word, i) => {
      if (word.startsWith("#")) {
        return (
          <a key={i} href={`/explore?tag=${word.slice(1)}`} className="hashtag">
            {word}{" "}
          </a>
        );
      } else if (word.startsWith("@")) {
        return (
          <a key={i} href={`/profile/${word.slice(1)}`} className="mention">
            {word}{" "}
          </a>
        );
      } else {
        return word + " ";
      }
    });
  }

  return (
    <div className="ig-post">
      <div className="ig-post-header">
        <img src="/avatar.png" className="ig-avatar" alt="avatar" />
        <strong>@{post.username}</strong>
      </div>
      <div className="ig-post-img-container">
        <img src={post.imageUrl} alt="Post" className="ig-post-img" />
      </div>
      <div className="ig-post-actions">
        <LikeButton postId={post.id} /> 🗨️ <BookmarkButton postId={post.id} />
      </div>
      <div className="ig-post-caption">
        <p><strong>@{post.username}</strong> {parseCaption(post.caption)}</p>
      </div>
      <CommentBox postId={post.id} />
    </div>
  );
}
