import { Button, makeStyles, Modal } from "@material-ui/core";
import { Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import "./App.css";
import { auth, db } from "./firebase";
import Footer from "./Footer";
import ImageUpload from "./ImageUpload";
import Post from "./Post";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [post, setPost] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscibe();
    };
  }, [user, username]);

  const SignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    setOpenModal(false);
  };

  const SignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="App" id="App">
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signUp">
            <h2 style={{ textAlign: "center", color: "#341f97" }}>
              Gamer's Zone
            </h2>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={SignUp}>
              SignUp
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signUp">
            <h2 style={{ textAlign: "center", color: "#341f97" }}>
              Gamer's Zone
            </h2>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={SignIn}>
              SignIn
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app_header">
        <h1>Gamer's Zone</h1>
        {user ? (
          <Button
            style={{
              marginRight: "5px",
              backgroundColor: "#e74c3c",
              color: "white",
              fontWeight: "bold",
            }}
            className="login_btn"
            variant="contained"
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        ) : (
          <div className="login_container">
            <Button
              style={{
                backgroundColor: "#2ecc71",
                color: "white",
                fontWeight: "bold",
              }}
              variant="contained"
              className="login_btn"
              onClick={() => setOpenSignIn(true)}
            >
              SignIn
            </Button>
            <Button
              className="login_btn"
              style={{
                margin: "5px",
                backgroundColor: "#2ecc71",
                color: "white",
                fontWeight: "bold",
              }}
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              SignUp
            </Button>
          </div>
        )}
      </div>
      <div className="main_container">
        <div className="image_upload">
          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <h3 className="altImage_Upload">
              do SignUp for accessing all features
            </h3>
          )}
        </div>

        <div className="app_post_container">
          {post.map(({ id, post }) => {
            return (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                imageUrl={post.imageUrl}
                caption={post.caption}
              />
            );
          })}
        </div>
        <div className="backToTop">
          <a href="#">
            <ExpandLessIcon className="backToTopIcon" />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
