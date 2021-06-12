import React, { useState } from "react";

import { db } from "./firebase";

const buttonStyle = {
  fontSize: "16px",
  cursor: "pointer",
  padding: "2px 7px",
  marginLeft: "2px",
  marginRight: "1px",
  borderRadius: "12px",
  outline: "none",
  backgroundColor: "#bdc3c7",
  border: "none",
};

const likeContainer = {
  display: "flex",
  alignItems: "center",
  width: "40px",
  justifyContent: "center",
  marginLeft: "3px",
};
function LikeButton({
  user,
  username,
  btnDisable,
  postId,
  commentId,
  commentLike,
  oldUserId,
}) {
  const currentId = user.uid;
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleLike = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .update({
        like: commentLike + 1,
        // disable: true,
      });
    setButtonDisable(true);
    // oldUserId.push(currentId);
  };
  console.log(currentId);
  // console.log(user.uid);
  // console.log(commentId);
  return (
    // <div style={likeContainer}>
    //   {oldUserId.map((oldId, index) => {
    //     return (
    //       <div key={index}>
    //         {oldId === currentId ? (
    //           <button
    //             variant="contained"
    //             color="primary"
    //             disabled={btnDisable}
    //             style={buttonStyle}
    //             onClick={handleLike}
    //           >
    //             +
    //           </button>
    //         ) : (
    //           <button
    //             variant="contained"
    //             color="primary"
    //             disabled={false}
    //             style={buttonStyle}
    //             onClick={handleLike}
    //           >
    //             +
    //           </button>
    //         )}
    //       </div>
    //     );
    //   })}
    //   <span>{commentLike}</span>
    // </div>
    <div style={likeContainer}>
      <button
        variant="contained"
        color="primary"
        disabled={buttonDisable}
        style={buttonStyle}
        onClick={handleLike}
      >
        +
      </button>
      <span>{commentLike}</span>
    </div>
  );
}

export default LikeButton;
