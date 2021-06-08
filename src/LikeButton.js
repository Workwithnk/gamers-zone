import React, { useState } from "react";
import { ThumbUpAlt } from "@material-ui/icons";
import { db } from "./firebase";

const buttonStyle = {
  border: "#2f3640",
  fontSize: "20px",
  cursor: "pointer",
};

const likeContainer = {
  display: "flex",
  alignItems: "center",
  width: "40px",
  justifyContent: "center",
  marginLeft: "3px",
};
function LikeButton({ postId, commentId, commentLike }) {
  const [disable, setDisable] = useState(false);
  const handleLike = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .update({
        like: commentLike + 1,
      });
    setDisable(true);
  };
  return (
    <div style={likeContainer}>
      <ThumbUpAlt style={buttonStyle} disabled={disable} onClick={handleLike} />
      <span>{commentLike}</span>
    </div>
  );
}

export default LikeButton;
