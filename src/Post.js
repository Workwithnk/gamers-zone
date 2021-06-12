import { Avatar, Button } from "@material-ui/core";
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import LikeButton from "./LikeButton";
import "./Post.css";

function Post({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  // const [userLike, setUserLike] = useState(0);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("like", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
              like: doc.data(),
            }))
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
      like: 0,
      disable: false,
      // oldUserId: [
      //   "c86o4VMp7ihZiDItU5lop7LKOEO2",
      //   "3y2mnb0vtwb6PKVP4gUdxq3iEsk2",
      //   "4d9OTFCXDdNmv8KyzmGjKkcf6B62",
      // ],
    });
    setComment("");
  };
  // console.log(user.uid);
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

      <div className="post_text">
        <p>
          <strong>{username} : </strong>
          {caption}
        </p>
      </div>
      {user && (
        <div className="post_comment_container">
          <div className="post_comments_list">
            {comments.map(({ id, comment }) => {
              return (
                <div className="post_comment" key={id}>
                  <div>
                    <p className="comment_text">
                      <strong>{comment.username} : </strong>
                    </p>
                    {comment.text}
                  </div>
                  <LikeButton
                    postId={postId}
                    commentId={id}
                    commentLike={comment.like}
                    user={user}
                    username={comment.username}
                    btnDisable={comment.disable}
                    oldUserId={comment.oldUserId}
                  />
                </div>
              );
            })}
          </div>

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
        </div>
      )}
    </div>
  );
}

export default Post;
