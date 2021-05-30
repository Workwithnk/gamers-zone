import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATu-VKxsF62q2fFsBaiAn0JXtYau6oigg",
  authDomain: "gamer-s-zone-dea0b.firebaseapp.com",
  projectId: "gamer-s-zone-dea0b",
  storageBucket: "gamer-s-zone-dea0b.appspot.com",
  messagingSenderId: "997862289742",
  appId: "1:997862289742:web:c69b916486e10c9ff86e1f",
  measurementId: "G-4Z6Y01CHKS",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
