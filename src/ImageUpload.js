import React, { useState } from "react";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };
  return (
    <div className="ImageUpload">
      <progress className="ImageUpload_progress" value={progress} max="100" />
      <input
        className="ImageUpload_QueryInput"
        type="text"
        placeholder="Enter your query.. "
        value={caption}
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      />
      <input
        type="file"
        className="ImageUpload_fileInput"
        onChange={handleChange}
      />
      <Button
        disabled={!image}
        variant="contained"
        className="imageUpload_btn"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
