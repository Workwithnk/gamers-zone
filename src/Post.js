import { Avatar, Button } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Post.css";

function Post({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post_image" src={imageUrl} alt="post Image" />

      <h4 className="post_text">
        <strong>{username} : </strong>
        {caption}
      </h4>
      <div className="post_comments_list">
        {comments.map(({ id, comment }) => {
          return (
            <p key={id}>
              <strong>{comment.username} : </strong>
              {comment.text}
            </p>
          );
        })}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            className="comment_input"
            type="text"
            placeholder="enter your suggetions.. "
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="comment_button"
            disabled={!comment}
            onClick={postComment}
          >
            Add
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
